import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd, KbdGroup } from "./index";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Kbd>Esc</Kbd>,
};

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const InText: Story = {
  render: () => (
    <p className="flex items-center gap-2 text-sm">
      Press <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd> to send, <Kbd>Ctrl</Kbd>
      <Kbd>/</Kbd> for shortcuts.
    </p>
  ),
};
