import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import { Radio, RadioGroup, RadioGroupItem } from "./index";

describe("RadioGroup", () => {
  it("renders a radiogroup with item data-slots", () => {
    render(
      <RadioGroup defaultValue="a" aria-label="plan">
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup", { name: "plan" })).toHaveAttribute(
      "data-slot",
      "radio-group",
    );
    expect(screen.getByRole("radio", { name: "A" })).toHaveAttribute(
      "data-slot",
      "radio-group-item",
    );
  });

  it("selects one option and deselects the other", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>,
    );
    const a = screen.getByRole("radio", { name: "A" });
    const b = screen.getByRole("radio", { name: "B" });
    expect(a).toBeChecked();
    await user.click(b);
    expect(b).toBeChecked();
    expect(a).not.toBeChecked();
  });

  it("moves the selection with arrow keys (Base UI roving focus)", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
        <Radio value="c" aria-label="C" />
      </RadioGroup>,
    );
    await user.tab();
    expect(screen.getByRole("radio", { name: "A" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "A" })).not.toBeChecked();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "C" })).toBeChecked();
  });

  it("applies the Semi checked palette (primary bg, white dot)", () => {
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" />
      </RadioGroup>,
    );
    const a = screen.getByRole("radio", { name: "A" });
    expect(a).toHaveAttribute("data-checked");
    expect(a).toHaveClass("data-checked:bg-primary", "data-checked:border-primary");
    expect(a).toHaveClass("rounded-full", "size-4");
    expect(a.querySelector("[data-slot='radio-group-dot']")).toHaveClass(
      "size-2",
      "rounded-full",
      "bg-white",
    );
  });

  it("keeps unchecked options on the text-3 border", () => {
    render(
      <RadioGroup>
        <Radio value="a" aria-label="A" />
      </RadioGroup>,
    );
    const a = screen.getByRole("radio", { name: "A" });
    expect(a).toHaveClass("border-text-3", "bg-transparent");
    expect(a).not.toHaveAttribute("data-checked");
  });

  it("ignores clicks on disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = rstest.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" disabled />
      </RadioGroup>,
    );
    const b = screen.getByRole("radio", { name: "B" });
    expect(b).toHaveAttribute("aria-disabled", "true");
    expect(b).toHaveAttribute("data-disabled");
    expect(b).toHaveClass("data-disabled:bg-disabled-fill", "data-disabled:opacity-75");
    await user.click(b);
    expect(b).not.toBeChecked();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("stays on the controlled value while reporting changes", async () => {
    const user = userEvent.setup();
    const onValueChange = rstest.fn();
    render(
      <RadioGroup value="a" onValueChange={onValueChange}>
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(onValueChange.mock.calls[0][0]).toBe("b");
    expect(screen.getByRole("radio", { name: "A" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "B" })).not.toBeChecked();
  });

  it("lays out horizontally with the 24px gap", () => {
    render(
      <RadioGroup orientation="horizontal" aria-label="h">
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup", { name: "h" })).toHaveClass(
      "flex-row",
      "gap-6",
    );
  });

  it("renders the 14px label with an 8px gap and selects via the label", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <Radio value="a">Daily</Radio>
      </RadioGroup>,
    );
    const label = screen.getByText("Daily");
    expect(label).toHaveAttribute("data-slot", "radio-label");
    expect(label.parentElement).toHaveAttribute("data-slot", "radio-row");
    expect(label.parentElement).toHaveClass("gap-2", "text-sm", "leading-5");
    await user.click(label);
    expect(screen.getByRole("radio", { name: "Daily" })).toBeChecked();
  });

  it("exposes the bare RadioGroupItem alias with tailwind-merge override", () => {
    render(<RadioGroupItem value="big" className="size-6" aria-label="big" />);
    const item = screen.getByRole("radio", { name: "big" });
    expect(item).toHaveClass("size-6");
    expect(item).not.toHaveClass("size-4");
  });
});
