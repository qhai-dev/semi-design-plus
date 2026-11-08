import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./index";

function renderOtp(props: Record<string, unknown> = {}, slotCount = 4) {
  const { container } = render(
    <InputOTP maxLength={slotCount} {...props}>
      <InputOTPGroup>
        {Array.from({ length: slotCount }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>,
  );
  const input = container.querySelector(
    "input[data-input-otp]",
  ) as HTMLInputElement;
  const slots = container.querySelectorAll("[data-slot='input-otp-slot']");
  return { container, input, slots };
}

describe("InputOtp", () => {
  it("renders one square cell per slot with the pincode data-slots", () => {
    const { slots, input } = renderOtp({}, 6);
    expect(slots).toHaveLength(6);
    expect(input).toHaveAttribute("data-input-otp");
    expect(input.closest("[data-slot='input-otp']")).not.toBeNull();
    expect(
      input.closest("[data-slot='input-otp']")?.querySelector(
        "[data-slot='input-otp-group']",
      ),
    ).not.toBeNull();
  });

  it("applies the Semi pincode cell styles (32px square, 3px radius, fill-0 bg, focus border on active)", () => {
    const { slots } = renderOtp({}, 2);
    const first = slots[0];
    expect(first).toHaveClass("h-8", "w-8", "rounded-sm", "bg-muted");
    expect(first).toHaveClass("data-[active=true]:border-focus-border");
  });

  it("supports the small size (24px cells, 6px gaps)", () => {
    const { slots, container } = renderOtp({ size: "sm" }, 2);
    expect(slots[0]).toHaveClass("h-6", "w-6");
    expect(slots[0]).not.toHaveClass("h-8");
    const group = container.querySelector(
      "[data-slot='input-otp-group']",
    ) as HTMLElement;
    expect(group).toHaveClass("gap-1.5");
  });

  it("moves the value and active cell forward while typing", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    const { input, slots } = renderOtp({ onComplete }, 4);
    await user.type(input, "12");
    expect(input).toHaveValue("12");
    expect(slots[0]).toHaveTextContent("1");
    expect(slots[1]).toHaveTextContent("2");
    // the caret sits after the second digit: the third cell is the active one
    // (input-otp syncs the selection in a debounced effect)
    await waitFor(() =>
      expect(slots[2]).toHaveAttribute("data-active", "true"),
    );
    expect(slots[0]).toHaveAttribute("data-active", "false");
    await user.type(input, "34");
    expect(input).toHaveValue("1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("renders the separator with a border-token divider icon", () => {
    render(
      <InputOTP maxLength={5}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
        </InputOTPGroup>
      </InputOTP>,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("data-slot", "input-otp-separator");
    expect(separator.querySelector("svg")).not.toBeNull();
    expect(separator.querySelector("svg")).toHaveClass("text-border");
  });

  it("disables the input and switches cells to the disabled fill", () => {
    const { input, slots } = renderOtp({ disabled: true }, 2);
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:cursor-not-allowed");
    const box = input.closest("[data-slot='input-otp']") as HTMLElement;
    expect(box).toHaveAttribute("data-disabled", "");
    expect(slots[0]).toHaveClass("group-data-[disabled]/otp:bg-disabled-fill");
  });
});
