import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./index";

const FRUITS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

function BasicSelect(props: Partial<React.ComponentProps<typeof Select>> = {}) {
  return (
    <Select items={FRUITS} {...props}>
      <SelectTrigger aria-label="fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders a combobox trigger with the select data-slot", () => {
    render(<BasicSelect />);
    const trigger = screen.getByRole("combobox", { name: "fruit" });
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    expect(trigger).toHaveAttribute("data-placeholder");
  });

  it("applies the Semi trigger styles (fill-0 box, 3px radius, 32px height)", () => {
    render(<BasicSelect />);
    const trigger = screen.getByRole("combobox", { name: "fruit" });
    expect(trigger).toHaveClass(
      "bg-muted",
      "hover:bg-muted-hover",
      "rounded-sm",
      "h-8",
      "px-3",
      "text-sm",
    );
  });

  it("opens the popup on click and closes after picking an item", async () => {
    const user = userEvent.setup();
    const onValueChange = rstest.fn();
    render(<BasicSelect onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox", { name: "fruit" }));
    const option = await screen.findByRole("option", { name: "Banana" });
    expect(option).toHaveAttribute("data-slot", "select-item");
    await user.click(option);
    expect(onValueChange).toHaveBeenCalledWith("banana", expect.anything());
    expect(screen.getByRole("combobox", { name: "fruit" })).toHaveTextContent(
      "Banana",
    );
  });

  it("marks the selected item with a primary Check and semibold weight", async () => {
    const user = userEvent.setup();
    render(<BasicSelect defaultValue="apple" />);
    await user.click(screen.getByRole("combobox", { name: "fruit" }));
    const selected = await screen.findByRole("option", { name: "Apple" });
    expect(selected).toHaveAttribute("aria-selected", "true");
    expect(selected).toHaveClass("aria-selected:font-semibold");
    const indicator = selected.querySelector(
      "[data-slot='select-item-indicator']",
    );
    expect(indicator).not.toBeNull();
    const check = indicator?.querySelector("svg.text-primary");
    expect(check).not.toBeNull();
    // unselected items render no Check
    const other = screen.getByRole("option", { name: "Banana" });
    expect(other).toHaveAttribute("aria-selected", "false");
    expect(
      other.querySelector("[data-slot='select-item-indicator']"),
    ).toBeNull();
  });

  it("selects with the keyboard (ArrowDown to move, Enter to confirm)", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    const trigger = screen.getByRole("combobox", { name: "fruit" });
    await user.click(trigger);
    await screen.findByRole("option", { name: "Apple" });
    await user.keyboard("{ArrowDown}{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(trigger).toHaveTextContent("Banana");
  });

  it("applies the Semi popup styles (6px radius, elevated shadow, 8px padding)", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole("combobox", { name: "fruit" }));
    await screen.findByRole("option", { name: "Apple" });
    const popup = document.querySelector<HTMLElement>(
      "[data-slot='select-content']",
    );
    expect(popup).not.toBeNull();
    expect(popup).toHaveClass(
      "rounded-xl",
      "bg-popover",
      "shadow-elevated",
      "py-2",
    );
  });

  it("highlights items on keyboard navigation with the fill-0 hover style", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole("combobox", { name: "fruit" }));
    const option = await screen.findByRole("option", { name: "Apple" });
    await user.keyboard("{ArrowDown}");
    await waitForHighlight(option);
    expect(option).toHaveClass("data-highlighted:bg-muted");
  });

  it("renders groups, labels and separators", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger aria-label="grouped">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="carrot">Carrot</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole("combobox", { name: "grouped" }));
    expect(await screen.findByText("Fruits")).toHaveAttribute(
      "data-slot",
      "select-label",
    );
    expect(screen.getByRole("separator")).toHaveAttribute(
      "data-slot",
      "select-separator",
    );
  });

  it("shows the small size (24px) via the size prop", () => {
    render(
      <Select>
        <SelectTrigger size="sm" aria-label="small">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole("combobox", { name: "small" })).toHaveClass("h-6");
  });

  it("lets consumer className override built-in classes (tailwind-merge)", () => {
    render(
      <Select>
        <SelectTrigger aria-label="wide" className="h-12 w-72">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "wide" });
    expect(trigger).toHaveClass("h-12", "w-72");
    expect(trigger).not.toHaveClass("h-8");
  });
});

async function waitForHighlight(option: HTMLElement) {
  await rstest.waitFor(() => {
    expect(option).toHaveAttribute("data-highlighted");
  });
}
