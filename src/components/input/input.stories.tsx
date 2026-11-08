import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { within, expect, userEvent } from "storybook/test";
import { Input } from "./index";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Please enter" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input size="small" placeholder="Small 24" aria-label="Small 24" />
      <Input placeholder="Default 32" aria-label="Default 32" />
      <Input size="large" placeholder="Large 40" aria-label="Large 40" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input placeholder="Default" aria-label="Default" />
      <Input validateStatus="error" placeholder="Error" aria-label="Error" defaultValue="Invalid value" />
      <Input validateStatus="warning" placeholder="Warning" aria-label="Warning" />
      <Input placeholder="Disabled" aria-label="Disabled" disabled />
    </div>
  ),
};

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input prefix={<Search aria-hidden className="size-4" />} placeholder="Search" aria-label="Search" />
      <Input prefix="¥" suffix="RMB" defaultValue="1000" aria-label="Amount in RMB" />
    </div>
  ),
};

export const Clearable: Story = {
  args: { clearable: true, defaultValue: "Clear me", "aria-label": "Clearable input" },
};

export const Password: Story = {
  args: {
    type: "password",
    passwordToggle: true,
    defaultValue: "secret",
    "aria-label": "Password",
  },
};

export const InteractiveTyping: Story = {
  args: { placeholder: "Type and blur", "aria-label": "Type and blur" },
  play: async () => {
    const input = within(document.body).getByPlaceholderText("Type and blur");
    await userEvent.type(input, "semi design");
    await expect(input).toHaveValue("semi design");
  },
};
