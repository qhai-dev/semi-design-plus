import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./index";

function renderScroller(ui: React.ReactElement) {
  return render(<MessageScrollerProvider>{ui}</MessageScrollerProvider>);
}

describe("MessageScroller", () => {
  it("renders the scroller structure with data-slots", () => {
    renderScroller(
      <MessageScroller className="h-64">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            <MessageScrollerItem>Message</MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>,
    );
    const item = screen.getByText("Message");
    expect(item).toHaveAttribute("data-slot", "message-scroller-item");
    expect(item.closest("[data-slot='message-scroller-content']")).toBeInTheDocument();
    expect(item.closest("[data-slot='message-scroller-viewport']")).toBeInTheDocument();
    expect(item.closest("[data-slot='message-scroller']")).toBeInTheDocument();
  });

  it("styles the viewport as the scrolling surface", () => {
    renderScroller(
      <MessageScroller>
        <MessageScrollerViewport data-testid="viewport">
          <MessageScrollerContent>Hi</MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>,
    );
    expect(screen.getByTestId("viewport")).toHaveClass(
      "overflow-y-auto",
      "overscroll-contain",
      "scrollbar-thin",
    );
  });

  it("renders the scroll button as a Semi outline control", () => {
    renderScroller(
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent>Hi</MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-slot", "message-scroller-button");
    expect(button).toHaveAttribute("data-direction", "end");
    expect(button).toHaveClass("bg-background", "border-border", "hover:bg-muted");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Scroll to end")).toBeInTheDocument();
  });

  it("lets consumer className override built-ins", () => {
    renderScroller(
      <MessageScroller className="h-40">
        <MessageScrollerViewport>
          <MessageScrollerContent>Hi</MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>,
    );
    expect(screen.getByText("Hi").closest("[data-slot='message-scroller']")).toHaveClass("h-40");
  });
});
