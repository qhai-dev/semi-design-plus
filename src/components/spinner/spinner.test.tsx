import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./index";

describe("Spinner", () => {
  it("renders with status role and Semi primary color", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status", { name: "Loading" });
    expect(spinner).toHaveAttribute("data-slot", "spinner");
    expect(spinner).toHaveClass("animate-spin", "text-primary");
  });

  it("supports Semi sizes (14 / 20 / 32px)", () => {
    render(
      <>
        <Spinner size="sm" aria-label="s" />
        <Spinner size="lg" aria-label="l" />
      </>,
    );
    expect(screen.getByLabelText("s")).toHaveClass("size-3.5");
    expect(screen.getByLabelText("l")).toHaveClass("size-8");
  });

  it("lets consumer className override built-ins", () => {
    render(<Spinner className="text-destructive" />);
    expect(screen.getByRole("status")).toHaveClass("text-destructive");
    expect(screen.getByRole("status")).not.toHaveClass("text-primary");
  });
});
