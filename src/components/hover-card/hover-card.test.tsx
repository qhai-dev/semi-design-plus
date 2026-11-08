import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";

function renderHoverCard(content?: string) {
  return render(
    <HoverCard>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent>
        {content ?? (
          <div>
            <div className="font-semibold text-foreground">Semi Design</div>
            <div className="text-text-2">A design system.</div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>,
  );
}

describe("HoverCard", () => {
  it("renders trigger with slots and no popup when closed", () => {
    renderHoverCard();
    expect(screen.getByText("Hover me")).toHaveAttribute(
      "data-slot",
      "hover-card-trigger",
    );
    expect(screen.queryByText("Semi Design")).not.toBeInTheDocument();
  });

  it("opens on hover with the Semi popover styles", async () => {
    const user = userEvent.setup();
    renderHoverCard();
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => {
      const popup = screen.getByText("Semi Design");
      expect(popup.closest("[data-slot='hover-card-content']")).toHaveClass(
        "bg-popover",
        "border",
        "border-border",
        "rounded-xl",
        "shadow-elevated",
        "p-3",
        "w-80",
      );
    });
  });

  it("renders without an arrow like the Semi popover hover form", async () => {
    const user = userEvent.setup();
    renderHoverCard("Plain card");
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Plain card")).toBeInTheDocument());
    expect(
      document.querySelector(
        "[data-slot='hover-card-content'] [data-slot='hover-card-arrow']",
      ),
    ).toBeNull();
  });

  it("closes on unhover", async () => {
    const user = userEvent.setup();
    renderHoverCard();
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Semi Design")).toBeInTheDocument());
    await user.unhover(screen.getByText("Hover me"));
    await waitFor(() =>
      expect(screen.queryByText("Semi Design")).not.toBeInTheDocument(),
    );
  });

  it("supports a custom side", async () => {
    const user = userEvent.setup();
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent side="right">Right card</HoverCardContent>
      </HoverCard>,
    );
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Right card")).toBeInTheDocument());
  });
});
