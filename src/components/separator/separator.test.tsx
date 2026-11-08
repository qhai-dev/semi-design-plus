import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./index";

describe("Separator", () => {
  it("renders a horizontal 1px line", () => {
    render(<Separator />);
    const el = screen.getByRole("separator");
    expect(el).toHaveAttribute("data-slot", "separator");
    expect(el).toHaveClass("bg-border", "data-horizontal:h-px");
  });

  it("renders a vertical line", () => {
    render(<Separator orientation="vertical" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveClass("data-vertical:w-px");
  });

  it("renders dashed lines", () => {
    render(<Separator dashed />);
    const el = screen.getByRole("separator");
    expect(el).toHaveAttribute("data-dashed");
    expect(el).toHaveClass("data-horizontal:border-t");
  });

  it("renders content between two lines", () => {
    render(<Separator>OR</Separator>);
    const el = screen.getByRole("separator");
    expect(el).toHaveTextContent("OR");
    expect(screen.getByText("OR")).toHaveClass("px-2");
  });

  it("lets consumer className override built-ins", () => {
    render(<Separator className="my-8" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveClass("my-8");
    expect(el).not.toHaveClass("my-1");
  });
});
