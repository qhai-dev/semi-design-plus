import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./index";

function renderTooltip(props?: { content?: string }) {
  return render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>{props?.content ?? "Tip text"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
}

describe("Tooltip", () => {
  it("renders trigger with slots and no popup when closed", () => {
    renderTooltip();
    expect(screen.getByText("Hover me")).toHaveAttribute("data-slot", "tooltip-trigger");
    expect(screen.queryByText("Tip text")).not.toBeInTheDocument();
  });

  it("opens on hover with Semi tooltip styles", async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => {
      const popup = screen.getByText("Tip text");
      expect(popup).toHaveAttribute("data-slot", "tooltip-content");
      expect(popup).toHaveClass("bg-tooltip", "text-tooltip-foreground", "rounded-xl");
    });
    await user.unhover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.queryByText("Tip text")).not.toBeInTheDocument());
  });

  it("respects a custom side", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent side="right">Right tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Right tip")).toBeInTheDocument());
  });
});
