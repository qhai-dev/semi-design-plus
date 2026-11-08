import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, fn, userEvent } from "storybook/test";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "./index";

const meta = {
  title: "Components/NativeSelect",
  component: NativeSelect,
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeSelect aria-label="fruit" className="w-56">
      <NativeSelectOption value="">Pick a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <NativeSelect size="sm" aria-label="small" className="w-44">
        <NativeSelectOption value="">Small 24</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
      </NativeSelect>
      <NativeSelect aria-label="default" className="w-44">
        <NativeSelectOption value="">Default 32</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled aria-label="fruit" className="w-56">
      <NativeSelectOption value="">Pick a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
    </NativeSelect>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <NativeSelect aria-label="food" className="w-56">
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

export const InteractiveSelect: Story = {
  render: () => (
    <NativeSelect aria-label="fruit" className="w-56" onChange={fn()}>
      <NativeSelectOption value="">Pick a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  ),
  play: async () => {
    const select = within(document.body).getByRole("combobox", { name: "fruit" });
    await userEvent.selectOptions(select, "banana");
    await expect(select).toHaveValue("banana");
  },
};
