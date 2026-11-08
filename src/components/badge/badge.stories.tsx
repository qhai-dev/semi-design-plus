import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./index";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Danger</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="light">Light</Badge>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge shape="square">Square</Badge>
      <Badge shape="circle">Capsule</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Badge>
      <span aria-hidden className="size-1.5 rounded-full bg-white" />
      Running
    </Badge>
  ),
};
