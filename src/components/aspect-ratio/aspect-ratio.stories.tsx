import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "./index";

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio {...args} className="rounded-xl border border-border bg-card">
      <div className="flex h-full items-center justify-center text-sm text-text-2">16:9</div>
    </AspectRatio>
  ),
};

export const Ratios: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div className="flex gap-4">
      <AspectRatio ratio={1} className="w-24 rounded-sm bg-muted">
        <div className="flex h-full items-center justify-center text-sm text-text-2">1:1</div>
      </AspectRatio>
      <AspectRatio ratio={4 / 3} className="w-24 rounded-sm bg-muted">
        <div className="flex h-full items-center justify-center text-sm text-text-2">4:3</div>
      </AspectRatio>
      <AspectRatio {...args} className="w-24 rounded-sm bg-muted">
        <div className="flex h-full items-center justify-center text-sm text-text-2">16:9</div>
      </AspectRatio>
    </div>
  ),
};
