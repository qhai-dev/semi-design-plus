import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./index";

const meta = {
  title: "Components/Bubble",
  component: Bubble,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BubbleGroup>
      <Bubble>
        <BubbleContent>Hello</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <BubbleGroup>
      <Bubble>
        <BubbleContent>User bubble on primary-light</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Assistant bubble on the bg-2 dialog surface</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Muted bubble on the fill-0 chat grey</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline bubble with a 1px border</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>Ghost bubble without surface or padding</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Destructive bubble</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const Conversation: Story = {
  render: () => (
    <BubbleGroup>
      <Bubble variant="secondary">
        <BubbleContent>How do I reset my password?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Go to Settings, then Security, and pick Reset password.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const WithReactions: Story = {
  render: () => (
    <Bubble>
      <BubbleContent>Answer you can react to</BubbleContent>
      <BubbleReactions>
        <button type="button" aria-label="Copy">
          <Copy aria-hidden className="size-3.5" />
        </button>
        <button type="button" aria-label="Retry">
          <RefreshCw aria-hidden className="size-3.5" />
        </button>
        <button type="button" aria-label="Like">
          <ThumbsUp aria-hidden className="size-3.5" />
        </button>
        <button type="button" aria-label="Dislike">
          <ThumbsDown aria-hidden className="size-3.5" />
        </button>
      </BubbleReactions>
    </Bubble>
  ),
};
