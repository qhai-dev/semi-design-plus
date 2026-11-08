import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, ThumbsUp } from "lucide-react";
import { Bubble, BubbleContent } from "../bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "./index";

const meta = {
  title: "Components/Message",
  component: Message,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MessageGroup>
      <Message>
        <MessageContent>Hello world</MessageContent>
      </Message>
    </MessageGroup>
  ),
};

export const Conversation: Story = {
  render: () => (
    <MessageGroup>
      <Message>
        <MessageAvatar>
          <span aria-hidden className="text-xs font-semibold">
            AI
          </span>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Semi Assistant · 10:24</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Hi! I uploaded the report you asked for.</BubbleContent>
          </Bubble>
          <MessageFooter>
            <button type="button" className="inline-flex items-center gap-1" aria-label="Copy">
              <Copy aria-hidden className="size-3" />
            </button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <span aria-hidden className="text-xs font-semibold">
            ME
          </span>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>You · 10:25</MessageHeader>
          <Bubble>
            <BubbleContent>Thanks! Anything else in it?</BubbleContent>
          </Bubble>
          <MessageFooter>
            <button type="button" className="inline-flex items-center gap-1" aria-label="Like">
              <ThumbsUp aria-hidden className="size-3" />
            </button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};
