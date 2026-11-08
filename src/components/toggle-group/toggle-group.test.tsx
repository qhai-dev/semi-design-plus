import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { ToggleGroup, ToggleGroupItem } from "./index";

describe("ToggleGroup", () => {
  it("renders a group with item data-slots", () => {
    render(
      <ToggleGroup aria-label="align">
        <ToggleGroupItem value="left">L</ToggleGroupItem>
        <ToggleGroupItem value="right">R</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group", { name: "align" })).toHaveAttribute(
      "data-slot",
      "toggle-group",
    );
    expect(screen.getByRole("button", { name: "L" })).toHaveAttribute(
      "data-slot",
      "toggle-group-item",
    );
  });

  it("keeps a single pressed item by default", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup defaultValue={["a"]}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    const a = screen.getByRole("button", { name: "A" });
    const b = screen.getByRole("button", { name: "B" });
    expect(a).toHaveAttribute("aria-pressed", "true");
    await user.click(b);
    expect(b).toHaveAttribute("aria-pressed", "true");
    expect(b).toHaveAttribute("data-pressed");
    expect(a).toHaveAttribute("aria-pressed", "false");
  });

  it("allows multiple pressed items with the multiple prop", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup multiple>
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "B" }));
    await user.click(screen.getByRole("button", { name: "I" }));
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "I" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("reports the array value through onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ToggleGroup multiple onValueChange={onValueChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "A" }));
    await user.click(screen.getByRole("button", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(onValueChange.mock.calls[0][0]).toEqual(["a"]);
    expect(onValueChange.mock.calls[1][0]).toEqual(["a", "b"]);
  });

  it("applies the outline variant with the primary-light pressed palette", () => {
    render(
      <ToggleGroup variant="outline" defaultValue={["a"]}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    const item = screen.getByRole("button", { name: "A" });
    expect(item).toHaveAttribute("data-variant", "outline");
    expect(item).toHaveClass("border-border", "bg-transparent");
    expect(item).toHaveClass("data-pressed:bg-primary-light", "data-pressed:text-primary");
  });

  it("applies the Semi borderless pressed palette in the default variant", () => {
    render(
      <ToggleGroup defaultValue={["a"]}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    const item = screen.getByRole("button", { name: "A" });
    expect(item).toHaveClass("bg-transparent", "data-pressed:bg-muted-hover");
  });

  it("applies Semi control heights per size", () => {
    render(
      <ToggleGroup size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button", { name: "A" })).toHaveClass("h-6");
  });

  it("spaces items with the Semi gap scale and can join them", () => {
    const { rerender } = render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveClass("gap-(--gap)");
    expect(group.style.getPropertyValue("--gap")).toBe("0.5rem");

    rerender(
      <ToggleGroup spacing={0}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group").style.getPropertyValue("--gap")).toBe(
      "0rem",
    );
    const first = screen.getByRole("button", { name: "A" });
    expect(first).toHaveClass("rounded-none", "first:rounded-l-sm");
    expect(screen.getByRole("button", { name: "B" })).toHaveClass(
      "last:rounded-r-sm",
    );
  });

  it("stacks items vertically with the vertical orientation", () => {
    render(
      <ToggleGroup orientation="vertical">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group")).toHaveClass("flex-col");
  });

  it("ignores clicks on a disabled item", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ToggleGroup onValueChange={onValueChange}>
        <ToggleGroupItem value="a" disabled>
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button", { name: "A" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "A" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
