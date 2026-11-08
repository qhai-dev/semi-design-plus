import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
} from "./index";

const FRUITS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

function TriggerCombobox(props: Partial<React.ComponentProps<typeof Combobox>> = {}) {
  return (
    <Combobox items={FRUITS} {...props}>
      <ComboboxTrigger aria-label="fruit">Pick a fruit</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No results</ComboboxEmpty>
          <ComboboxItem value="apple">Apple</ComboboxItem>
          <ComboboxItem value="banana">Banana</ComboboxItem>
          <ComboboxItem value="cherry">Cherry</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

/**
 * Filterable combobox: the Base UI Combobox filters items through the
 * Collection API (function children), so the list maps over the filtered set.
 */
function InputCombobox(props: Partial<React.ComponentProps<typeof Combobox>> = {}) {
  return (
    <Combobox items={FRUITS} {...props}>
      <ComboboxInput placeholder="Search fruit" aria-label="fruit" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No results</ComboboxEmpty>
          <ComboboxCollection>
            {(item: { value: string; label: string }) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxCollection>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

describe("Combobox", () => {
  it("renders a trigger with the combobox data-slot and Semi trigger styles", () => {
    render(<TriggerCombobox />);
    const trigger = screen.getByRole("combobox", { name: "fruit" });
    expect(trigger).toHaveAttribute("data-slot", "combobox-trigger");
    expect(trigger).toHaveClass(
      "bg-muted",
      "hover:bg-muted-hover",
      "rounded-sm",
      "h-8",
      "px-3",
    );
    const chevron = trigger.querySelector("svg[aria-hidden='true']");
    expect(chevron).toHaveClass("size-3", "text-text-2");
  });

  it("opens the popup on click and applies the Semi popup styles", async () => {
    const user = userEvent.setup();
    render(<TriggerCombobox />);
    await user.click(screen.getByRole("combobox", { name: "fruit" }));
    const option = await screen.findByRole("option", { name: "Apple" });
    expect(option).toHaveAttribute("data-slot", "combobox-item");
    const popup = document.querySelector<HTMLElement>(
      "[data-slot='combobox-content']",
    );
    expect(popup).not.toBeNull();
    expect(popup).toHaveClass(
      "rounded-xl",
      "bg-popover",
      "shadow-elevated",
      "py-2",
    );
  });

  it("calls onValueChange when an item is picked and closes the popup", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TriggerCombobox onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox", { name: "fruit" }));
    await user.click(await screen.findByRole("option", { name: "Banana" }));
    expect(onValueChange).toHaveBeenCalledWith("banana", expect.anything());
  });

  it("marks the selected item with a primary Check and semibold weight", async () => {
    const user = userEvent.setup();
    render(<TriggerCombobox defaultValue="apple" />);
    await user.click(screen.getByRole("combobox", { name: "fruit" }));
    const selected = await screen.findByRole("option", { name: "Apple" });
    expect(selected).toHaveAttribute("aria-selected", "true");
    expect(selected).toHaveClass("aria-selected:font-semibold");
    const check = selected.querySelector(
      "[data-slot='combobox-item-indicator'] svg.text-primary",
    );
    expect(check).not.toBeNull();
    const other = screen.getByRole("option", { name: "Banana" });
    expect(
      other.querySelector("[data-slot='combobox-item-indicator']"),
    ).toBeNull();
  });

  it("selects with the keyboard (ArrowDown to move, Enter to confirm)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TriggerCombobox onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox", { name: "fruit" });
    await user.click(trigger);
    await screen.findByRole("option", { name: "Apple" });
    await user.keyboard("{ArrowDown}{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("banana", expect.anything());
  });

  it("filters the list while typing in the input", async () => {
    const user = userEvent.setup();
    render(<InputCombobox />);
    const input = screen.getByPlaceholderText("Search fruit");
    await user.click(input);
    await screen.findByRole("option", { name: "Apple" });
    await user.type(input, "an");
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Cherry" })).toBeNull();
    await user.clear(input);
    expect(
      await screen.findByRole("option", { name: "Cherry" }),
    ).toBeInTheDocument();
  });

  it("shows the empty state text when nothing matches", async () => {
    const user = userEvent.setup();
    render(<InputCombobox />);
    const input = screen.getByPlaceholderText("Search fruit");
    await user.click(input);
    await screen.findByRole("option", { name: "Apple" });
    await user.type(input, "zzz");
    const empty = await screen.findByText("No results");
    expect(empty).toHaveAttribute("data-slot", "combobox-empty");
    expect(empty).toHaveClass("px-3", "py-2", "text-sm", "text-text-2");
    // hidden (no extra gap) once results exist again
    await user.clear(input);
    await screen.findByRole("option", { name: "Apple" });
    expect(empty).toHaveClass("empty:hidden");
  });

  it("renders group labels and lets consumer className override built-ins", async () => {
    const user = userEvent.setup();
    render(
      <Combobox items={FRUITS}>
        <ComboboxTrigger aria-label="fruit" className="h-12 w-72">
          Pick a fruit
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Fruits</ComboboxLabel>
              <ComboboxItem value="apple">Apple</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );
    const trigger = screen.getByRole("combobox", { name: "fruit" });
    expect(trigger).toHaveClass("h-12", "w-72");
    expect(trigger).not.toHaveClass("h-8");
    await user.click(trigger);
    expect(await screen.findByText("Fruits")).toHaveAttribute(
      "data-slot",
      "combobox-label",
    );
  });
});
