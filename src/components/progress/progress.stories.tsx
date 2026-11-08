import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./index";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60, "aria-label": "progress" },
  render: () => <Progress value={60} aria-label="progress" />,
};

export const Values: Story = {
  args: { value: 20, "aria-label": "20" },
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={20} aria-label="20" />
      <Progress value={50} aria-label="50" />
      <Progress value={80} aria-label="80" />
    </div>
  ),
};
