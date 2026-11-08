import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge, badgeVariants } from "./index";

describe("Badge", () => {
  it("renders with Semi tag styles", () => {
    render(<Badge>Semi</Badge>);
    const badge = screen.getByText("Semi");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveClass("h-6", "rounded-sm", "px-2", "bg-primary");
  });

  it("renders semantic solid variants", () => {
    render(
      <>
        <Badge variant="secondary">S</Badge>
        <Badge variant="destructive">D</Badge>
        <Badge variant="outline">O</Badge>
        <Badge variant="light">L</Badge>
      </>,
    );
    expect(screen.getByText("S")).toHaveClass("bg-secondary");
    expect(screen.getByText("D")).toHaveClass("bg-destructive");
    expect(screen.getByText("O")).toHaveClass("border-border", "bg-transparent");
    expect(screen.getByText("L")).toHaveClass("bg-muted", "text-foreground");
  });

  it("supports circle shape like Semi capsule tags", () => {
    render(<Badge shape="circle">capsule</Badge>);
    expect(screen.getByText("capsule")).toHaveClass("rounded-full");
  });

  it("lets consumer className override built-ins", () => {
    render(<Badge className="h-10">Tall</Badge>);
    const badge = screen.getByText("Tall");
    expect(badge).toHaveClass("h-10");
    expect(badge).not.toHaveClass("h-6");
  });

  it("exports variants via cva", () => {
    expect(badgeVariants({ variant: "destructive" })).toContain("bg-destructive");
  });
});
