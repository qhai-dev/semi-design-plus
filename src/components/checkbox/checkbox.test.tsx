import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Checkbox, CheckboxGroup } from "./index";

describe("Checkbox", () => {
  it("renders a checkbox with the checkbox data-slot and unchecked styles", () => {
    render(<Checkbox aria-label="agree" />);
    const cb = screen.getByRole("checkbox", { name: "agree" });
    expect(cb).toHaveAttribute("data-slot", "checkbox");
    expect(cb).toHaveClass("size-4", "rounded-sm", "border-text-3", "bg-transparent");
  });

  it("toggles on click and reports onCheckedChange", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="agree" onCheckedChange={onCheckedChange} />);
    const cb = screen.getByRole("checkbox", { name: "agree" });
    expect(cb).not.toBeChecked();
    await user.click(cb);
    expect(cb).toBeChecked();
    expect(cb).toHaveAttribute("data-checked");
    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(onCheckedChange.mock.calls[0][0]).toBe(true);
  });

  it("applies the Semi checked palette (primary bg, primary border)", () => {
    render(<Checkbox defaultChecked aria-label="on" />);
    const cb = screen.getByRole("checkbox", { name: "on" });
    expect(cb).toHaveAttribute("data-checked");
    expect(cb).toHaveClass("data-checked:bg-primary", "data-checked:border-primary");
    expect(cb).toHaveClass("hover:data-checked:bg-primary-hover");
  });

  it("ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox disabled aria-label="locked" onCheckedChange={onCheckedChange} />,
    );
    const cb = screen.getByRole("checkbox", { name: "locked" });
    expect(cb).toHaveAttribute("aria-disabled", "true");
    expect(cb).toHaveAttribute("data-disabled");
    expect(cb).toHaveClass(
      "data-disabled:bg-disabled-fill",
      "data-disabled:cursor-not-allowed",
    );
    await user.click(cb);
    expect(cb).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("shows the mixed state with a minus glyph when indeterminate", () => {
    const { container } = render(<Checkbox indeterminate aria-label="part" />);
    const cb = screen.getByRole("checkbox", { name: "part" });
    expect(cb).toHaveAttribute("aria-checked", "mixed");
    expect(cb).toHaveAttribute("data-indeterminate");
    expect(cb).toHaveClass("data-indeterminate:bg-primary");
    expect(container.querySelector(".lucide-minus")).not.toBeNull();
    expect(container.querySelector(".lucide-check")).toHaveClass(
      "in-data-indeterminate:hidden",
    );
  });

  it("stays unchecked in controlled mode while reporting changes", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox checked={false} aria-label="ctl" onCheckedChange={onCheckedChange} />,
    );
    const cb = screen.getByRole("checkbox", { name: "ctl" });
    await user.click(cb);
    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(onCheckedChange.mock.calls[0][0]).toBe(true);
    expect(cb).not.toBeChecked();
  });

  it("renders the 14px/20px label with an 8px gap and toggles via the label", async () => {
    const user = userEvent.setup();
    render(<Checkbox>Email me updates</Checkbox>);
    const label = screen.getByText("Email me updates");
    expect(label).toHaveAttribute("data-slot", "checkbox-label");
    const row = label.parentElement;
    expect(row).toHaveAttribute("data-slot", "checkbox-row");
    expect(row).toHaveClass("gap-2", "text-sm", "leading-5");
    await user.click(label);
    expect(
      screen.getByRole("checkbox", { name: "Email me updates" }),
    ).toBeChecked();
  });

  it("greys the label when disabled", () => {
    render(<Checkbox disabled>Locked choice</Checkbox>);
    const label = screen.getByText("Locked choice");
    expect(label).toHaveClass("group-data-disabled:text-disabled-foreground");
  });

  it("supports the Semi group with vertical/horizontal gaps", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <CheckboxGroup defaultValue={["a"]} onValueChange={onValueChange}>
        <Checkbox value="a" aria-label="A" />
        <Checkbox value="b" aria-label="B" />
      </CheckboxGroup>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-slot", "checkbox-group");
    expect(group).toHaveClass("flex-col", "gap-3");
    expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "B" })).not.toBeChecked();

    rerender(
      <CheckboxGroup orientation="horizontal" defaultValue={["a"]}>
        <Checkbox value="a" aria-label="A" />
      </CheckboxGroup>,
    );
    expect(screen.getByRole("group")).toHaveClass("flex-row", "gap-4");
  });

  it("reports multi-value changes through CheckboxGroup", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup defaultValue={["a"]} onValueChange={onValueChange}>
        <Checkbox value="a" aria-label="A" />
        <Checkbox value="b" aria-label="B" />
      </CheckboxGroup>,
    );
    await user.click(screen.getByRole("checkbox", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(onValueChange.mock.calls[0][0]).toEqual(["a", "b"]);
  });

  it("lets consumer className override built-in classes (tailwind-merge)", () => {
    render(<Checkbox className="size-6" aria-label="big" />);
    const cb = screen.getByRole("checkbox", { name: "big" });
    expect(cb).toHaveClass("size-6");
    expect(cb).not.toHaveClass("size-4");
  });
});
