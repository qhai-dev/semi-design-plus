import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea, ScrollBar } from "./index";

describe("ScrollArea", () => {
  it("renders root and viewport structure", () => {
    render(
      <ScrollArea className="h-32 w-48">
        <div>Long content</div>
      </ScrollArea>,
    );
    const root = document.querySelector("[data-slot='scroll-area']");
    expect(root).toHaveClass("relative");
    expect(document.querySelector("[data-slot='scroll-area-viewport']")).not.toBeNull();
  });

  it("renders a mounted vertical scrollbar with the Semi thumb styles", () => {
    render(
      <ScrollArea className="h-32 w-48">
        <div>Long content</div>
        <ScrollBar keepMounted />
      </ScrollArea>,
    );
    // keepMounted renders the scrollbar even when jsdom reports no overflow
    const scrollbar = document.querySelector("[data-slot='scroll-area-scrollbar']");
    expect(scrollbar).toHaveAttribute("data-orientation", "vertical");
    expect(scrollbar).toHaveClass("bg-transparent", "data-vertical:w-2");
    const thumb = document.querySelector("[data-slot='scroll-area-thumb']");
    expect(thumb).toHaveClass("rounded-xl", "bg-muted-active", "hover:bg-muted-hover");
  });

  it("renders the horizontal scrollbar 8px thin", () => {
    render(
      <ScrollArea className="h-32 w-48">
        <div>Wide content</div>
        <ScrollBar orientation="horizontal" keepMounted />
      </ScrollArea>,
    );
    const scrollbar = document.querySelector("[data-slot='scroll-area-scrollbar']");
    expect(scrollbar).toHaveAttribute("data-orientation", "horizontal");
    expect(scrollbar).toHaveClass("data-horizontal:h-2", "data-horizontal:flex-col");
  });

  it("lets consumer className override built-ins", () => {
    render(
      <ScrollArea className="h-64">
        <div>Content</div>
      </ScrollArea>,
    );
    expect(document.querySelector("[data-slot='scroll-area']")).toHaveClass("h-64");
  });
});
