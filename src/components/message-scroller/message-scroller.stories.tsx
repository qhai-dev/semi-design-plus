import type { StoryObj } from "@storybook/react-vite";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./index";

const meta = {
  title: "Components/MessageScroller",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-64">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            <MessageScrollerItem>Message</MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  ),
};

export const WithScrollButtons: Story = {
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-80">
        <MessageScrollerViewport>
          <MessageScrollerContent className="p-4">
            {Array.from({ length: 12 }, (_, i) => (
              <MessageScrollerItem key={i}>
                Message #{i + 1} — scroll to watch the start/end buttons fade in.
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="start" />
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
};
