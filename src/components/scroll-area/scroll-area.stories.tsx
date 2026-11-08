import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./index";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-80 rounded-xl border border-border bg-card">
      <div className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <div key={item} className="px-4 py-2 text-sm hover:bg-muted">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80">
      <div className="flex w-max gap-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-sm text-text-2"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
