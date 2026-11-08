import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

function renderTabs(variant?: "line" | "button" | "card") {
  return render(
    <Tabs defaultValue="a">
      <TabsList variant={variant}>
        <TabsTrigger value="a" variant={variant}>
          Tab A
        </TabsTrigger>
        <TabsTrigger value="b" variant={variant}>
          Tab B
        </TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("renders tabs with slots", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toHaveAttribute("data-slot", "tabs-list");
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "data-slot",
      "tabs-trigger",
    );
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });

  it("switches panels on click and via keyboard", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Content B")).toBeInTheDocument();
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
  });

  it("renders line variant with Semi underline styles", () => {
    renderTabs("line");
    const active = screen.getByRole("tab", { name: "Tab A" });
    expect(active).toHaveClass(
      "border-b-2",
      "data-active:border-b-primary",
      "data-active:text-foreground",
    );
    const inactive = screen.getByRole("tab", { name: "Tab B" });
    expect(inactive).toHaveClass("text-text-2", "hover:text-foreground");
    expect(screen.getByRole("tablist")).toHaveClass("border-b", "border-border", "gap-6");
  });

  it("renders button variant with primary-light selected background", () => {
    renderTabs("button");
    const active = screen.getByRole("tab", { name: "Tab A" });
    expect(active).toHaveClass(
      "h-8",
      "rounded-sm",
      "data-active:bg-primary-light",
      "data-active:text-primary",
    );
    const inactive = screen.getByRole("tab", { name: "Tab B" });
    expect(inactive).toHaveClass("hover:bg-muted");
  });

  it("renders card variant with border lift", () => {
    renderTabs("card");
    const active = screen.getByRole("tab", { name: "Tab A" });
    expect(active).toHaveClass(
      "data-active:border-border",
      "data-active:bg-card",
      "rounded-t-sm",
    );
  });

  it("marks the active tab with aria-selected", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});
