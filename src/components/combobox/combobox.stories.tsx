import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent, waitFor } from "storybook/test";
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
  useComboboxAnchor,
} from "./index";

const meta = {
  title: "Components/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const FRUITS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian" },
];

/** Filterable combobox: the list maps over Base UI's filtered items. */
export const Default: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxInput placeholder="Search a fruit…" aria-label="fruit" className="w-64" showClear />
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
  ),
};

export const TriggerOnly: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxTrigger className="w-64" aria-label="fruit">
        Pick a fruit
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No results</ComboboxEmpty>
          <ComboboxItem value="apple">Apple</ComboboxItem>
          <ComboboxItem value="banana">Banana</ComboboxItem>
          <ComboboxItem value="cherry">Cherry</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Groups: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxTrigger className="w-64" aria-label="fruit">
        Pick a fruit
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Common</ComboboxLabel>
            <ComboboxItem value="apple">Apple</ComboboxItem>
            <ComboboxItem value="banana">Banana</ComboboxItem>
          </ComboboxGroup>
          <ComboboxGroup>
            <ComboboxLabel>Exotic</ComboboxLabel>
            <ComboboxItem value="durian">Durian</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Combobox items={FRUITS} disabled>
      <ComboboxInput placeholder="Disabled" aria-label="fruit" className="w-64" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No results</ComboboxEmpty>
          <ComboboxItem value="apple">Apple</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const FilterableInput: Story = {
  render: () => {
    const anchor = useComboboxAnchor();
    return (
      <Combobox items={FRUITS}>
        <div ref={anchor} />
        <ComboboxInput placeholder="Type to filter…" aria-label="fruit" className="w-64" showClear />
        <ComboboxContent anchor={anchor}>
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
  },
};

export const InteractiveFilter: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxInput placeholder="Search a fruit…" aria-label="fruit" className="w-64" showClear />
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
  ),
  play: async () => {
    const input = within(document.body).getByPlaceholderText("Search a fruit…");
    await userEvent.click(input);
    await waitFor(() =>
      expect(within(document.body).getAllByRole("option").length).toBeGreaterThan(0),
    );
    await userEvent.type(input, "an");
    await waitFor(() => {
      const options = within(document.body).queryAllByRole("option");
      expect(options.length).toBe(2);
      expect(options[0]).toHaveTextContent("Banana");
    });
    // no-match query reveals the empty state
    await userEvent.type(input, "zz");
    await expect(within(document.body).getByText("No results")).toBeVisible();
    await userEvent.clear(input);
    await userEvent.click(await within(document.body).findByRole("option", { name: "Cherry" }));
    await waitFor(() => expect(input).toHaveValue("cherry"));
  },
};
