import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const meta = {
  title: "Components/Form",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  email: z.string().email("Invalid email"),
  nickname: z.string().min(2, "At least 2 characters"),
});

type SchemaValues = z.infer<typeof schema>;

function DemoForm({ onSubmit }: { onSubmit: (values: SchemaValues) => void }) {
  const form = useForm<SchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", nickname: "" },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-80 flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Nickname</FormLabel>
              <FormControl render={<Input placeholder="Semi" {...field} />} />
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
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

export const Default: Story = {
  render: () => <DemoForm onSubmit={fn()} />,
};

export const InteractiveSubmit: Story = {
  render: () => <DemoForm onSubmit={fn()} />,
  play: async () => {
    const scope = within(document.body);
    await userEvent.type(scope.getByLabelText(/nickname/i), "Semi");
    await userEvent.type(scope.getByLabelText(/email/i), "user@example.com");
    await userEvent.click(scope.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(scope.queryByText(/invalid|at least/i)).not.toBeInTheDocument();
    });
  },
};

export const ValidationErrors: Story = {
  render: () => <DemoForm onSubmit={fn()} />,
  play: async () => {
    const scope = within(document.body);
    await userEvent.type(scope.getByLabelText(/email/i), "not-an-email");
    await userEvent.click(scope.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(scope.getByText("Invalid email")).toBeInTheDocument();
    });
    // Semi error styles: aria-invalid drives the danger fill on the input
    await expect(scope.getByLabelText(/email/i)).toHaveAttribute("aria-invalid", "true");
  },
};
