import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";
import { Input } from "../input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./index";

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: () => async (values: unknown) => {
    const schema = z.object({ email: z.string().email("Invalid email") });
    const result = schema.safeParse(values);
    if (result.success) return { values: result.data, errors: {} };
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      errors[issue.path.join(".")] = { type: issue.code, message: issue.message };
    }
    return { values: {}, errors };
  },
}));

interface DemoValues {
  email: string;
}

function DemoForm({
  onSubmit,
  defaultEmail = "",
}: {
  onSubmit: (values: DemoValues) => void;
  defaultEmail?: string;
}) {
  const form = useForm<DemoValues>({
    defaultValues: { email: defaultEmail },
    resolver: zodResolver(z.object({ email: z.string().email("Invalid email") })),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl render={<Input placeholder="you@example.com" {...field} />} />
              <FormDescription>We never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

describe("Form", () => {
  it("wires label, control and description ids together", () => {
    render(<DemoForm onSubmit={vi.fn()} />);
    const label = screen.getByText("Email");
    const control = screen.getByPlaceholderText("you@example.com");
    expect(label).toHaveAttribute("for", control.id);
    expect(control).toHaveAttribute("aria-describedby");
    expect(control.getAttribute("aria-describedby")).toContain("description");
  });

  it("marks the control invalid and shows the Semi danger message on bad input", async () => {
    const user = userEvent.setup();
    render(<DemoForm onSubmit={vi.fn()} />);
    const control = screen.getByPlaceholderText("you@example.com");
    await user.type(control, "not-an-email");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    const message = await screen.findByText("Invalid email");
    expect(message).toHaveAttribute("data-slot", "form-message");
    expect(message).toHaveClass("text-destructive");
    expect(control).toHaveAttribute("aria-invalid", "true");
  });

  it("submits valid values through the control", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<DemoForm onSubmit={onSubmit} />);
    const control = screen.getByPlaceholderText("you@example.com");
    await user.type(control, "user@example.com");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0][0]).toEqual({ email: "user@example.com" });
  });

  it("renders the description with Semi muted text and hides it while an error shows", async () => {
    const user = userEvent.setup();
    render(<DemoForm onSubmit={vi.fn()} />);
    const description = screen.getByText("We never share your email.");
    expect(description).toHaveClass("text-text-2");
    const control = screen.getByPlaceholderText("you@example.com");
    await user.type(control, "not-an-email");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await screen.findByText("Invalid email");
    expect(control.getAttribute("aria-describedby")).toContain("form-item-message");
  });
});
