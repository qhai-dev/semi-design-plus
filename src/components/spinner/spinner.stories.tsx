import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./index";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" aria-label="small" />
      <Spinner aria-label="default" />
      <Spinner size="lg" aria-label="large" />
    </div>
  ),
};
