import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Settings } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./index";

describe("Item", () => {
  it("renders the full item structure with Semi list styles", () => {
    render(
      <Item>
        <ItemMedia variant="icon">
          <Settings aria-hidden />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Account settings</ItemTitle>
          <ItemDescription>Manage your profile and preferences.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <button type="button">Edit</button>
        </ItemActions>
      </Item>,
    );
    const item = screen.getByText("Account settings").closest("[data-slot='item']");
    expect(item).toHaveAttribute("data-variant", "default");
    expect(item).toHaveClass("rounded-sm", "border-border", "bg-card", "hover:bg-muted");
    expect(item).toHaveClass("px-4", "py-3");
    expect(screen.getByText("Account settings")).toHaveClass(
      "text-sm",
      "leading-5",
      "font-semibold",
      "text-foreground",
    );
    expect(screen.getByText("Manage your profile and preferences.")).toHaveClass(
      "text-sm",
      "text-text-2",
    );
    expect(screen.getByText("Edit").closest("[data-slot='item-actions']")).not.toBeNull();
  });

  it("applies variant styles", () => {
    render(
      <>
        <Item variant="outline">Outline</Item>
        <Item variant="muted">Muted</Item>
      </>,
    );
    expect(screen.getByText("Outline")).toHaveClass("bg-transparent", "border-border");
    expect(screen.getByText("Muted")).toHaveClass("bg-muted", "hover:bg-muted-hover");
  });

  it("renders a group with a separator between items", () => {
    render(
      <ItemGroup>
        <Item>First</Item>
        <ItemSeparator />
        <Item>Second</Item>
      </ItemGroup>,
    );
    const group = screen.getByText("First").closest("[data-slot='item-group']");
    expect(group).not.toHaveAttribute("role");
    expect(group).toHaveClass("flex-col", "gap-2");
    const separator = document.querySelector("[data-slot='item-separator']");
    expect(separator).toHaveAttribute("role", "separator");
  });

  it("renders header and footer sections", () => {
    render(
      <Item>
        <ItemHeader>
          <ItemTitle>Header</ItemTitle>
        </ItemHeader>
        <ItemFooter>
          <span>Footer</span>
        </ItemFooter>
      </Item>,
    );
    expect(screen.getByText("Header").closest("[data-slot='item-header']")).toHaveClass(
      "justify-between",
    );
    expect(screen.getByText("Footer").closest("[data-slot='item-footer']")).toHaveClass(
      "justify-between",
    );
  });

  it("renders as a link via render prop with hover styles", () => {
    render(<Item render={<a href="#docs" />}>Docs</Item>);
    const link = screen.getByText("Docs").closest("a");
    expect(link).toHaveAttribute("href", "#docs");
    expect(link).toHaveAttribute("data-slot", "item");
    expect(link).toHaveClass("hover:bg-muted");
  });

  it("lets consumer className override built-ins", () => {
    render(<Item className="bg-primary-light rounded-xl">Override</Item>);
    const item = screen.getByText("Override");
    expect(item).toHaveClass("rounded-xl");
    expect(item).not.toHaveClass("rounded-sm");
  });
});
