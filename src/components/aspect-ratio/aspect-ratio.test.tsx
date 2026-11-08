import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./index";

describe("AspectRatio", () => {
  it("renders a ratio container with the CSS variable", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>16:9</div>
      </AspectRatio>,
    );
    const el = screen.getByText("16:9").parentElement!;
    expect(el).toHaveAttribute("data-slot", "aspect-ratio");
    expect(el.getAttribute("style")).toContain("--ratio");
    expect(el).toHaveClass("relative", "aspect-(--ratio)");
  });

  it("renders children inside the container", () => {
    render(
      <AspectRatio ratio={1}>
        <img src="/a.png" alt="Square" />
      </AspectRatio>,
    );
    expect(screen.getByRole("img", { name: "Square" })).toBeInTheDocument();
  });

  it("lets consumer className override built-ins", () => {
    render(<AspectRatio ratio={4 / 3} className="rounded-xl border border-border" />);
    const el = document.querySelector("[data-slot='aspect-ratio']")!;
    expect(el).toHaveClass("rounded-xl", "border-border");
  });
});
