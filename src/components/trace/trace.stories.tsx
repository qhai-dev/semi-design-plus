import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "./index";

const meta = {
  title: "Components/Trace",
  component: Trace,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Trace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Trace>
      <TraceLine>
        <TraceTitle>Step one</TraceTitle>
        <TraceDescription>Something happened</TraceDescription>
      </TraceLine>
    </Trace>
  ),
};

export const Statuses: Story = {
  render: () => (
    <Trace>
      <TraceLine>
        <TraceIcon>
          <CircleCheck aria-hidden className="text-success" />
        </TraceIcon>
        <TraceTitle>Indexed documents</TraceTitle>
        <TraceDescription>1.2s</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <LoaderCircle aria-hidden className="animate-spin" />
        </TraceIcon>
        <TraceTitle>Generating answer</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceTitle>Waiting for tool call</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <TriangleAlert aria-hidden />
        </TraceIcon>
        <TraceTitle>Search failed</TraceTitle>
        <TraceDescription>timeout</TraceDescription>
      </TraceLine>
    </Trace>
  ),
};

export const Collapsible: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Trace>
        <TraceCollapsible open={open} onOpenChange={setOpen}>
          <TraceCollapsibleTrigger>Retrieved 4 chunks</TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            chunk-01 · score 0.92
            <br />
            chunk-02 · score 0.87
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    );
  },
};
