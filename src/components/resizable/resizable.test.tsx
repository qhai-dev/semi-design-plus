import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./index";

describe("Resizable", () => {
  it("renders the group, panels and handle structure", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const group = document.querySelector("[data-slot='resizable-panel-group']");
    expect(group).not.toBeNull();
    expect(group).toHaveClass("flex", "h-full", "w-full");
    expect(document.querySelectorAll("[data-slot='resizable-panel']")).toHaveLength(2);
    expect(screen.getByRole("separator")).toHaveAttribute("data-slot", "resizable-handle");
  });

  it("styles the handle with the Semi hover/drag/focus colors", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const handle = screen.getByRole("separator");
    expect(handle).toHaveClass(
      "bg-transparent",
      "hover:bg-primary-light",
      "data-[resize-handle-state=drag]:bg-primary-light-hover",
      "data-[resize-handle-active=keyboard]:bg-primary",
      "focus-visible:bg-primary",
    );
    // 2px wide handle between horizontal panels
    expect(handle).toHaveClass("data-[panel-group-direction=horizontal]:w-0.5");
  });

  it("renders a round grip dot when withHandle is set", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const grip = document.querySelector("[data-slot='resizable-handle-grip']");
    expect(grip).toHaveClass("rounded-full", "bg-border-strong", "size-2");
  });

  it("lays the vertical group out in a column with a row-resize handle", () => {
    render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>Top</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Bottom</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(document.querySelector("[data-slot='resizable-panel-group']")).toHaveClass(
      "data-[panel-group-direction=vertical]:flex-col",
    );
    expect(screen.getByRole("separator")).toHaveClass(
      "data-[panel-group-direction=vertical]:h-0.5",
      "data-[panel-group-direction=vertical]:cursor-row-resize",
    );
  });

  it("lets consumer className override built-ins", () => {
    render(
      <ResizablePanelGroup direction="horizontal" className="min-h-40">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle className="w-1" />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(document.querySelector("[data-slot='resizable-panel-group']")).toHaveClass("min-h-40");
    expect(screen.getByRole("separator")).toHaveClass("w-1");
  });
});
