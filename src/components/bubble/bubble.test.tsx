import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./index";

describe("Bubble", () => {
  it("renders the group/bubble/content structure with data-slots", () => {
    render(
      <BubbleGroup>
        <Bubble>
          <BubbleContent>Hello</BubbleContent>
        </Bubble>
      </BubbleGroup>,
    );
    const content = screen.getByText("Hello");
    expect(content).toHaveAttribute("data-slot", "bubble-content");
    expect(content.parentElement).toHaveAttribute("data-slot", "bubble");
    expect(content.closest("[data-slot='bubble-group']")).toBeInTheDocument();
  });

  it("renders Semi chat bubble surfaces per variant", () => {
    render(
      <>
        <Bubble>
          <BubbleContent>Hi from user</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>Hi from assistant</BubbleContent>
        </Bubble>
        <Bubble variant="destructive">
          <BubbleContent>Failed</BubbleContent>
        </Bubble>
      </>,
    );
    const userBubble = screen.getByText("Hi from user").parentElement!;
    expect(userBubble).toHaveClass("*:data-[slot=bubble-content]:bg-primary-light");
    expect(userBubble).toHaveClass("*:data-[slot=bubble-content]:text-foreground");
    const aiBubble = screen.getByText("Hi from assistant").parentElement!;
    expect(aiBubble).toHaveClass("*:data-[slot=bubble-content]:bg-dialog");
    const errorBubble = screen.getByText("Failed").parentElement!;
    expect(errorBubble).toHaveClass("*:data-[slot=bubble-content]:bg-destructive-light");
    expect(errorBubble).toHaveClass("*:data-[slot=bubble-content]:text-destructive");
  });

  it("styles content with the Semi chat spec (12px radius, 14px/20px body)", () => {
    render(<BubbleContent>Hello</BubbleContent>);
    const content = screen.getByText("Hello");
    expect(content).toHaveClass("rounded-3xl", "text-sm", "leading-5", "px-3", "py-2");
  });

  it("exposes variant/align as data attributes and end alignment", () => {
    render(
      <Bubble variant="secondary" align="end">
        <BubbleContent>On the right</BubbleContent>
      </Bubble>,
    );
    const bubble = screen.getByText("On the right").parentElement!;
    expect(bubble).toHaveAttribute("data-slot", "bubble");
    expect(bubble).toHaveAttribute("data-variant", "secondary");
    expect(bubble).toHaveAttribute("data-align", "end");
    expect(bubble).toHaveClass("data-[align=end]:self-end");
  });

  it("renders the floating reactions bar as a popover surface", () => {
    render(<BubbleReactions data-testid="reactions">👍</BubbleReactions>);
    const reactions = screen.getByTestId("reactions");
    expect(reactions).toHaveAttribute("data-slot", "bubble-reactions");
    expect(reactions).toHaveClass("bg-popover", "shadow-elevated", "rounded-full");
  });

  it("lets consumer className override built-ins", () => {
    render(<BubbleContent className="rounded-xl">Override</BubbleContent>);
    const content = screen.getByText("Override");
    expect(content).toHaveClass("rounded-xl");
    expect(content).not.toHaveClass("rounded-3xl");
  });
});
