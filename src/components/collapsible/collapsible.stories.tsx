import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./index";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-96">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm text-foreground hover:bg-muted">
        Show details
        <ChevronDown aria-hidden className="size-4 text-text-2" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-2 pb-2 text-sm text-text-1">
          Any content can live inside the collapsible panel.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
