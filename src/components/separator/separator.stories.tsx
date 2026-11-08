import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./index";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm">Above the line</p>
      <Separator />
      <p className="text-sm">Below the line</p>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="w-80">
      <Separator>Section</Separator>
      <Separator dashed>Dashed</Separator>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};
