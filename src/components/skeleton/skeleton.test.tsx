import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("renders with Semi fill-0 block styles", () => {
    render(<Skeleton className="h-8 w-48" data-testid="sk" />);
    const el = screen.getByTestId("sk");
    expect(el).toHaveAttribute("data-slot", "skeleton");
    expect(el).toHaveClass("bg-muted", "rounded-sm", "animate-pulse");
  });

  it("composes into an avatar + lines layout", () => {
    render(
      <div className="flex items-center gap-3" data-testid="composed">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>,
    );
    const composed = screen.getByTestId("composed");
    expect(composed.querySelectorAll("[data-slot='skeleton']").length).toBe(3);
  });
});
