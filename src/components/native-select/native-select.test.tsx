import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "./index";

describe("NativeSelect", () => {
  it("renders a select with the native-select data-slot and an overlaid chevron", () => {
    render(
      <NativeSelect aria-label="fruit">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox", { name: "fruit" });
    expect(select).toHaveAttribute("data-slot", "native-select");
    expect(select.parentElement).toHaveAttribute(
      "data-slot",
      "native-select-wrapper",
    );
    const icon = select.parentElement?.querySelector(
      "[data-slot='native-select-icon']",
    );
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("supports choosing an option and fires onChange", async () => {
    const user = userEvent.setup();
    const onChange = rstest.fn();
    render(
      <NativeSelect aria-label="fruit" onChange={onChange}>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox", { name: "fruit" });
    await user.selectOptions(select, "banana");
    expect(select).toHaveValue("banana");
    expect(onChange).toHaveBeenCalled();
  });

  it("applies the Semi trigger styles (fill-0 box, 3px radius, 32px height)", () => {
    render(
      <NativeSelect aria-label="styled">
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>,
    );
    expect(screen.getByRole("combobox", { name: "styled" })).toHaveClass(
      "bg-muted",
      "hover:bg-muted-hover",
      "focus:border-focus-border",
      "rounded-sm",
      "h-8",
      "px-3",
      "pr-8",
    );
  });

  it("shows the small size (24px) via the size prop", () => {
    render(
      <NativeSelect size="sm" aria-label="small">
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>,
    );
    expect(screen.getByRole("combobox", { name: "small" })).toHaveClass("h-6");
  });

  it("keeps the not-allowed cursor when disabled", () => {
    render(
      <NativeSelect disabled aria-label="off">
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox", { name: "off" });
    expect(select).toBeDisabled();
    expect(select).toHaveClass(
      "disabled:cursor-not-allowed",
      "disabled:bg-disabled-fill",
    );
  });

  it("renders optgroups and lets consumer className override built-ins", () => {
    render(
      <NativeSelect aria-label="grouped" className="h-12 w-64">
        <NativeSelectOptGroup label="Fruits">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox", { name: "grouped" });
    // consumer className lands on the wrapper (existing structure)
    expect(select.parentElement).toHaveClass("h-12", "w-64");
    expect(select).toHaveClass("h-8");
    expect(
      screen.getByRole("group", { name: "Fruits" }),
    ).toHaveAttribute("data-slot", "native-select-optgroup");
  });
});
