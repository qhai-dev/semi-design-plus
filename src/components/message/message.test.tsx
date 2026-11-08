import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "./index";

describe("Message", () => {
  it("renders the group/message/content structure with data-slots", () => {
    render(
      <MessageGroup>
        <Message>
          <MessageContent>Hello world</MessageContent>
        </Message>
      </MessageGroup>,
    );
    const content = screen.getByText("Hello world");
    expect(content).toHaveAttribute("data-slot", "message-content");
    expect(content.parentElement).toHaveAttribute("data-slot", "message");
    expect(content.closest("[data-slot='message-group']")).toBeInTheDocument();
  });

  it("uses the faintest Semi text token for header/footer meta", () => {
    render(
      <Message>
        <MessageHeader>Bot · 10:24</MessageHeader>
        <MessageContent>Hi</MessageContent>
        <MessageFooter>Read</MessageFooter>
      </Message>,
    );
    expect(screen.getByText("Bot · 10:24")).toHaveClass("text-xs", "text-text-3");
    expect(screen.getByText("Read")).toHaveClass("text-xs", "text-text-3");
  });

  it("renders a circular avatar slot on the fill surface", () => {
    render(
      <Message>
        <MessageAvatar>
          <span>A</span>
        </MessageAvatar>
        <MessageContent>Hi</MessageContent>
      </Message>,
    );
    const avatar = screen.getByText("A").closest("[data-slot='message-avatar']")!;
    expect(avatar).toHaveClass("rounded-full", "bg-muted", "shrink-0");
  });

  it("reverses the avatar/content layout for end-aligned messages", () => {
    render(
      <Message align="end">
        <MessageContent>From me</MessageContent>
      </Message>,
    );
    const message = screen.getByText("From me").parentElement!;
    expect(message).toHaveAttribute("data-align", "end");
    expect(message).toHaveClass("data-[align=end]:flex-row-reverse");
  });

  it("lets consumer className override built-ins", () => {
    render(<Message className="gap-4">Override</Message>);
    expect(screen.getByText("Override")).toHaveClass("gap-4");
  });
});
