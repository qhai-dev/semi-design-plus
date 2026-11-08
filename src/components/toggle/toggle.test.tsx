import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import { Toggle, toggleVariants } from "./index";

describe("Toggle", () => {
  it("renders a button with the toggle data-slot", () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "data-slot",
      "toggle",
    );
  });

  it("presses on click with aria-pressed and data-pressed, unpresses again", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="bold">B</Toggle>);
    const t = screen.getByRole("button", { name: "bold" });
    expect(t).toHaveAttribute("aria-pressed", "false");
    await user.click(t);
    expect(t).toHaveAttribute("aria-pressed", "true");
    expect(t).toHaveAttribute("data-pressed");
    await user.click(t);
    expect(t).toHaveAttribute("aria-pressed", "false");
    expect(t).not.toHaveAttribute("data-pressed");
  });

  it("reports onPressedChange", async () => {
    const user = userEvent.setup();
    const onPressedChange = rstest.fn();
    render(<Toggle aria-label="italic" onPressedChange={onPressedChange} />);
    await user.click(screen.getByRole("button", { name: "italic" }));
    expect(onPressedChange).toHaveBeenCalledOnce();
    expect(onPressedChange.mock.calls[0][0]).toBe(true);
  });

  it("renders the controlled pressed state", () => {
    render(<Toggle pressed aria-label="pinned" />);
    expect(screen.getByRole("button", { name: "pinned" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("applies the Semi borderless pressed styles in the default variant", () => {
    render(<Toggle aria-label="plain">P</Toggle>);
    const t = screen.getByRole("button", { name: "plain" });
    expect(t).toHaveClass("bg-transparent", "hover:bg-muted", "rounded-sm", "h-8");
    expect(t).toHaveClass("data-pressed:bg-muted-hover");
  });

  it("applies the outline variant with the primary-light pressed palette", () => {
    render(
      <Toggle variant="outline" aria-label="outlined">
        O
      </Toggle>,
    );
    const t = screen.getByRole("button", { name: "outlined" });
    expect(t).toHaveClass("border-border", "bg-transparent");
    expect(t).toHaveClass("data-pressed:bg-primary-light", "data-pressed:text-primary");
  });

  it("applies Semi control heights per size", () => {
    render(
      <>
        <Toggle size="sm" aria-label="s">
          S
        </Toggle>
        <Toggle size="lg" aria-label="l">
          L
        </Toggle>
      </>,
    );
    expect(screen.getByRole("button", { name: "s" })).toHaveClass("h-6");
    expect(screen.getByRole("button", { name: "l" })).toHaveClass("h-10", "px-4");
  });

  it("ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onPressedChange = rstest.fn();
    render(
      <Toggle disabled aria-label="nope" onPressedChange={onPressedChange}>
        N
      </Toggle>,
    );
    const t = screen.getByRole("button", { name: "nope" });
    expect(t).toBeDisabled();
    expect(t).toHaveClass("disabled:cursor-not-allowed");
    await user.click(t);
    expect(onPressedChange).not.toHaveBeenCalled();
    expect(t).toHaveAttribute("aria-pressed", "false");
  });

  it("exports variants for reuse (cva)", () => {
    expect(toggleVariants({ variant: "outline" })).toContain("border-border");
  });

  it("lets consumer className override built-in classes (tailwind-merge)", () => {
    render(
      <Toggle className="h-12" aria-label="tall">
        T
      </Toggle>,
    );
    const t = screen.getByRole("button", { name: "tall" });
    expect(t).toHaveClass("h-12");
    expect(t).not.toHaveClass("h-8");
  });
});
