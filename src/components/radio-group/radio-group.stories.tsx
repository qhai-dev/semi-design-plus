import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, fn, userEvent } from "storybook/test";
import { Radio, RadioGroup } from "./index";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioGroup defaultValue="x" aria-label="enabled states">
        <Radio value="x">Checked</Radio>
        <Radio value="y">Unchecked</Radio>
      </RadioGroup>
      <RadioGroup defaultValue="x" aria-label="disabled states">
        <Radio value="x" disabled>
          Disabled checked
        </Radio>
        <Radio value="y" disabled>
          Disabled
        </Radio>
      </RadioGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" defaultValue="monthly">
      <Radio value="daily">Daily</Radio>
      <Radio value="weekly">Weekly</Radio>
      <Radio value="monthly">Monthly</Radio>
    </RadioGroup>
  ),
};

export const InteractiveKeyboard: Story = {
  args: { defaultValue: "a" },
  render: (args) => (
    <RadioGroup {...args} aria-label="keyboard">
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  ),
  play: async () => {
    const second = within(document.body).getByRole("radio", { name: "Option B" });
    await userEvent.click(second);
    await expect(second).toBeChecked();
    await userEvent.keyboard("{ArrowUp}");
    const first = within(document.body).getByRole("radio", { name: "Option A" });
    await expect(first).toBeChecked();
    await expect(second).not.toBeChecked();
  },
};

export const WithCallback: Story = {
  args: { defaultValue: "a", onValueChange: fn() },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
    </RadioGroup>
  ),
  play: async ({ args }) => {
    await userEvent.click(within(document.body).getByRole("radio", { name: "Option B" }));
    await expect(args.onValueChange).toHaveBeenCalledOnce();
  },
};
