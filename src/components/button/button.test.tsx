import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import { Button, buttonVariants } from "./index";

describe("Button", () => {
  it("renders a button with the button data-slot", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toHaveAttribute(
      "data-slot",
      "button",
    );
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = rstest.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onClick = rstest.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "Nope" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies the default solid primary styles", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-primary", "text-primary-foreground", "h-8");
  });

  it("applies variant styles", () => {
    render(
      <>
        <Button variant="outline">O</Button>
        <Button variant="secondary">S</Button>
        <Button variant="ghost">G</Button>
        <Button variant="destructive">D</Button>
        <Button variant="link">L</Button>
      </>,
    );
    expect(screen.getByText("O")).toHaveClass("border-border", "text-primary");
    expect(screen.getByText("S")).toHaveClass("bg-secondary");
    expect(screen.getByText("G")).toHaveClass("bg-transparent", "text-primary");
    expect(screen.getByText("D")).toHaveClass("bg-destructive");
    expect(screen.getByText("L")).toHaveClass("underline-offset-4");
  });

  it("applies Semi control heights per size", () => {
    render(
      <>
        <Button size="sm">S</Button>
        <Button size="lg">L</Button>
        <Button size="icon" aria-label="I" />
      </>,
    );
    expect(screen.getByText("S")).toHaveClass("h-6");
    expect(screen.getByText("L")).toHaveClass("h-10", "px-4");
    expect(screen.getByLabelText("I")).toHaveClass("size-8");
  });

  it("lets consumer className override built-in classes (tailwind-merge)", () => {
    render(<Button className="h-12">Tall</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("h-12");
    expect(btn).not.toHaveClass("h-8");
  });

  it("shows a spinner and disables interaction while loading", async () => {
    const user = userEvent.setup();
    const onClick = rstest.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const btn = screen.getByRole("button", { name: /save/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toHaveAttribute("data-loading", "");
    expect(btn.querySelector("svg.animate-spin")).not.toBeNull();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("exports variants for reuse (cva)", () => {
    expect(buttonVariants({ variant: "destructive" })).toContain("bg-destructive");
  });
});
