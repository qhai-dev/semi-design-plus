import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CircleCheck } from "lucide-react";
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

describe("Trace", () => {
  it("renders the line/title/description structure with data-slots", () => {
    render(
      <Trace>
        <TraceLine>
          <TraceTitle>Step one</TraceTitle>
          <TraceDescription>2s</TraceDescription>
        </TraceLine>
      </Trace>,
    );
    const title = screen.getByText("Step one");
    expect(title).toHaveAttribute("data-slot", "trace-title");
    expect(title.closest("[data-slot='trace-line']")).toHaveAttribute("data-slot", "trace-line");
    expect(title.closest("[data-slot='trace']")).toBeInTheDocument();
    expect(screen.getByText("2s")).toHaveAttribute("data-slot", "trace-description");
  });

  it("styles lines with Semi muted text and destructive error status", () => {
    render(
      <Trace>
        <TraceLine>Running step</TraceLine>
        <TraceLine status="error">Failed step</TraceLine>
        <TraceLine status="pending">Queued step</TraceLine>
      </Trace>,
    );
    expect(screen.getByText("Running step")).toHaveClass("text-muted-foreground");
    expect(screen.getByText("Failed step")).toHaveClass(
      "data-[status=error]:text-destructive",
    );
    expect(screen.getByText("Queued step").closest("[data-slot='trace-line']")).toHaveClass(
      "data-[status=pending]:opacity-60",
    );
  });

  it("keeps descriptions on the faintest Semi text token", () => {
    render(
      <Trace>
        <TraceLine>
          <TraceTitle>Step</TraceTitle>
          <TraceDescription>0.4s</TraceDescription>
        </TraceLine>
      </Trace>,
    );
    expect(screen.getByText("0.4s")).toHaveClass("text-text-3", "tabular-nums");
  });

  it("renders the collapsible with a chevron trigger and indented content", () => {
    function OpenTraceCollapsible() {
      const [open, setOpen] = React.useState(true);
      return (
        <Trace>
          <TraceCollapsible open={open} onOpenChange={setOpen}>
            <TraceCollapsibleTrigger>Details</TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <TraceIcon>
                <CircleCheck aria-hidden />
              </TraceIcon>
              Inner detail
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      );
    }
    render(<OpenTraceCollapsible />);
    const trigger = screen.getByText("Details");
    expect(trigger).toHaveAttribute("data-slot", "trace-collapsible-trigger");
    expect(trigger).toHaveClass("text-muted-foreground", "hover:text-foreground");
    expect(trigger.querySelector("svg")).toBeInTheDocument();
    expect(
      screen
        .getByText("Inner detail")
        .closest("[data-slot='trace-collapsible-content-inner']"),
    ).toHaveClass("text-muted-foreground", "border-l");
  });

  it("lets consumer className override built-ins", () => {
    render(<Trace className="gap-4">Override</Trace>);
    expect(screen.getByText("Override")).toHaveClass("gap-4");
  });
});
