import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./index";

describe("Collapsible", () => {
  it("renders with slots", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute(
      "data-slot",
      "collapsible-trigger",
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("expands on click with the Semi collapse animation class", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>More</CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>,
    );
    await user.click(screen.getByRole("button", { name: "More" }));
    const panel = await screen.findByText("Details");
    expect(panel.closest("[data-slot='collapsible-content']")).toHaveClass(
      "data-open:animate-accordion-down",
    );
  });

  it("collapses again on second click", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Less</CollapsibleTrigger>
        <CollapsibleContent>Body</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByText("Body")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Less" }));
    await new Promise((r) => setTimeout(r, 250));
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });
});
