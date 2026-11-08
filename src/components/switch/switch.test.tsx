import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import { Switch } from "./index";

describe("Switch", () => {
  it("renders a switch with the switch data-slot", () => {
    render(<Switch aria-label="airplane" />);
    const sw = screen.getByRole("switch", { name: "airplane" });
    expect(sw).toHaveAttribute("data-slot", "switch");
    expect(sw.querySelector("[data-slot='switch-thumb']")).not.toBeNull();
  });

  it("toggles on click and reports onCheckedChange", async () => {
    const user = userEvent.setup();
    const onCheckedChange = rstest.fn();
    render(<Switch aria-label="wifi" onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch", { name: "wifi" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    expect(sw).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(onCheckedChange.mock.calls[0][0]).toBe(true);
  });

  it("styles the checked track with primary blue, not success green", () => {
    render(<Switch defaultChecked aria-label="on" />);
    const sw = screen.getByRole("switch", { name: "on" });
    expect(sw).toHaveAttribute("data-checked");
    expect(sw).toHaveClass("data-checked:bg-primary");
    expect(sw).toHaveClass("hover:data-checked:bg-primary-hover");
    expect(sw).not.toHaveClass("bg-success");
    expect(sw.getAttribute("class")).not.toContain("bg-success");
  });

  it("styles the unchecked track with the Semi fill scale", () => {
    render(<Switch aria-label="off" />);
    const sw = screen.getByRole("switch", { name: "off" });
    expect(sw).toHaveClass(
      "data-unchecked:bg-muted",
      "data-[size=default]:h-6",
      "data-[size=default]:w-10",
      "rounded-full",
    );
    const thumb = sw.querySelector("[data-slot='switch-thumb']");
    expect(thumb).toHaveClass("bg-white", "rounded-full");
    expect(thumb).toHaveClass(
      "group-data-[size=default]/switch:data-unchecked:translate-x-[2px]",
      "group-data-[size=default]/switch:data-checked:translate-x-[18px]",
    );
    expect(thumb).toHaveClass(
      "shadow-[0_4px_6px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.3)]",
    );
  });

  it("ignores clicks when disabled and greys out", async () => {
    const user = userEvent.setup();
    const onCheckedChange = rstest.fn();
    render(
      <Switch disabled aria-label="locked" onCheckedChange={onCheckedChange} />,
    );
    const sw = screen.getByRole("switch", { name: "locked" });
    expect(sw).toHaveAttribute("aria-disabled", "true");
    expect(sw).toHaveAttribute("data-disabled");
    expect(sw).toHaveClass(
      "data-disabled:data-unchecked:bg-transparent",
      "data-disabled:cursor-not-allowed",
    );
    await user.click(sw);
    expect(sw).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("keeps the disabled checked track on primary-disabled", () => {
    render(<Switch disabled defaultChecked aria-label="locked on" />);
    const sw = screen.getByRole("switch", { name: "locked on" });
    expect(sw).toHaveClass("data-disabled:data-checked:bg-primary-disabled");
    const thumb = sw.querySelector("[data-slot='switch-thumb']");
    expect(thumb).toHaveClass("data-disabled:shadow-none");
  });

  it("supports the small Semi size (26x16, 12px knob)", () => {
    render(<Switch size="sm" aria-label="small" />);
    const sw = screen.getByRole("switch", { name: "small" });
    expect(sw).toHaveAttribute("data-size", "sm");
    expect(sw).toHaveClass("data-[size=sm]:h-4", "data-[size=sm]:w-[26px]");
    const thumb = sw.querySelector("[data-slot='switch-thumb']");
    expect(thumb).toHaveClass("group-data-[size=sm]/switch:size-3");
    expect(thumb).toHaveClass(
      "group-data-[size=sm]/switch:data-checked:translate-x-[11px]",
    );
  });

  it("stays off in controlled mode while reporting changes", async () => {
    const user = userEvent.setup();
    const onCheckedChange = rstest.fn();
    render(
      <Switch checked={false} aria-label="ctl" onCheckedChange={onCheckedChange} />,
    );
    const sw = screen.getByRole("switch", { name: "ctl" });
    await user.click(sw);
    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(onCheckedChange.mock.calls[0][0]).toBe(true);
    expect(sw).not.toBeChecked();
  });

  it("lets consumer className override built-in classes (tailwind-merge)", () => {
    render(<Switch className="w-14" aria-label="wide" />);
    const sw = screen.getByRole("switch", { name: "wide" });
    expect(sw).toHaveClass("w-14");
    expect(sw).not.toHaveClass("w-10");
  });
});
