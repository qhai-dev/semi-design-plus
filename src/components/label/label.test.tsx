import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Label } from "./index";

describe("Label", () => {
  it("associates with the control via htmlFor (click focuses the input)", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="username">Username</Label>
        <input id="username" />
      </>,
    );
    const label = screen.getByText("Username");
    expect(label).toHaveAttribute("for", "username");
    expect(label).toHaveAttribute("data-slot", "label");
    await user.click(label);
    expect(screen.getByLabelText("Username")).toHaveFocus();
  });

  it("renders the required red star before the text", () => {
    render(<Label htmlFor="a" required>
      Name
    </Label>);
    const mark = screen.getByText("*");
    expect(mark).toHaveAttribute("data-slot", "label-required");
    expect(mark).toHaveClass("text-destructive", "mr-1");
  });

  it("renders the optional grey hint after the text", () => {
    render(<Label htmlFor="b" optional>Email</Label>);
    const hint = screen.getByText("(optional)");
    expect(hint).toHaveAttribute("data-slot", "label-optional");
    expect(hint).toHaveClass("text-tertiary", "ml-1");
  });

  it("applies the Semi form-label typography (14px/20px, weight 600, text-0)", () => {
    render(<Label htmlFor="c">Title</Label>);
    expect(screen.getByText("Title")).toHaveClass(
      "text-sm",
      "leading-5",
      "font-semibold",
      "text-foreground",
    );
  });

  it("renders the disabled color without pointer-events-none", () => {
    render(<Label htmlFor="d" disabled>Frozen</Label>);
    const label = screen.getByText("Frozen");
    expect(label).toHaveAttribute("data-disabled", "");
    expect(label).toHaveClass("text-disabled-foreground", "cursor-not-allowed");
    expect(label).not.toHaveClass("pointer-events-none");
  });

  it("lets consumer className override built-ins (tailwind-merge)", () => {
    render(
      <Label htmlFor="e" className="font-normal">
        Custom
      </Label>,
    );
    const label = screen.getByText("Custom");
    expect(label).toHaveClass("font-normal");
    expect(label).not.toHaveClass("font-semibold");
  });
});
