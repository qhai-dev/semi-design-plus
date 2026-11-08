import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd, KbdGroup } from "./index";

describe("Kbd", () => {
  it("renders a key with the Semi chip styles", () => {
    render(<Kbd>Esc</Kbd>);
    const kbd = screen.getByText("Esc");
    expect(kbd).toHaveAttribute("data-slot", "kbd");
    expect(kbd).toHaveClass(
      "bg-muted",
      "border-border",
      "rounded-sm",
      "h-6",
      "min-w-6",
      "px-1.5",
      "font-mono",
      "text-xs",
      "text-foreground",
    );
  });

  it("renders a key combination as nested kbd elements", () => {
    render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    const group = screen.getByText("Ctrl").closest("kbd[data-slot='kbd-group']");
    expect(group).not.toBeNull();
    expect(group?.querySelectorAll("kbd[data-slot='kbd']")).toHaveLength(2);
  });

  it("lets consumer className override built-ins", () => {
    render(<Kbd className="h-8 bg-primary-light">Tab</Kbd>);
    const kbd = screen.getByText("Tab");
    expect(kbd).toHaveClass("h-8", "bg-primary-light");
    expect(kbd).not.toHaveClass("h-6");
  });
});
