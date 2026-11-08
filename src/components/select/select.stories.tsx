import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent, waitFor } from "storybook/test";
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

const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes = [
  { value: "small", label: "Small 24" },
  { value: "default", label: "Default 32" },
  { value: "large", label: "Large 40" },
];

export const Default: Story = {
  render: () => (
    <Select
      items={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
      ]}
    >
      <SelectTrigger className="w-56" aria-label="fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithValue: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger className="w-56" aria-label="fruit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Select items={sizes}>
        <SelectTrigger size="sm" className="w-44" aria-label="size sm">
          <SelectValue placeholder="Small 24" />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={sizes}>
        <SelectTrigger className="w-44" aria-label="size default">
          <SelectValue placeholder="Default 32" />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56" aria-label="fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-invalid className="w-56" aria-label="fruit">
        <SelectValue placeholder="Required field" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Groups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56" aria-label="food">
        <SelectValue placeholder="Pick a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const InteractiveKeyboard: Story = {
  render: () => (
    <Select
      items={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
      ]}
    >
      <SelectTrigger className="w-56" aria-label="fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async () => {
    const trigger = within(document.body).getByRole("combobox", { name: "fruit" });
    await userEvent.click(trigger);
    const banana = await waitFor(() =>
      within(document.body).getByRole("option", { name: "Banana" }),
    );
    await expect(banana).toHaveAttribute("data-slot", "select-item");
    await userEvent.click(banana);
    await waitFor(() => expect(trigger).toHaveTextContent("Banana"));
    // selected item shows the Semi check mark on reopen
    await userEvent.click(trigger);
    const selected = await waitFor(() =>
      within(document.body).getByRole("option", { name: /Banana/ }),
    );
    await expect(selected).toHaveAttribute("aria-selected", "true");
  },
};
