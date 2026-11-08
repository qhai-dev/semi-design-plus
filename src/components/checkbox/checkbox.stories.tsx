import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, fn, userEvent } from "storybook/test";
import { Checkbox, CheckboxGroup } from "./index";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Checkbox" },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled defaultChecked>
        Disabled checked
      </Checkbox>
      <Checkbox disabled indeterminate>
        Disabled indeterminate
      </Checkbox>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["apple"]}>
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="banana">Banana</Checkbox>
      <Checkbox value="cherry" disabled>
        Cherry (disabled)
      </Checkbox>
    </CheckboxGroup>
  ),
};

export const HorizontalGroup: Story = {
  render: () => (
    <CheckboxGroup orientation="horizontal" defaultValue={["wifi"]}>
      <Checkbox value="wifi">Wi-Fi</Checkbox>
      <Checkbox value="bt">Bluetooth</Checkbox>
      <Checkbox value="nfc">NFC</Checkbox>
    </CheckboxGroup>
  ),
};

export const InteractiveToggle: Story = {
  args: { children: "Click me", onCheckedChange: fn() },
  play: async ({ args }) => {
    const box = within(document.body).getByRole("checkbox", { name: "Click me" });
    await userEvent.click(box);
    await expect(args.onCheckedChange).toHaveBeenCalledOnce();
    await expect(box).toBeChecked();
    await userEvent.click(box);
    await expect(box).not.toBeChecked();
  },
};
