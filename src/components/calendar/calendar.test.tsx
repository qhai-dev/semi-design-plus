import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Calendar } from "./index";

function isoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function queryDayButton(container: HTMLElement, date: Date) {
  return container.querySelector<HTMLButtonElement>(`td[data-day='${isoDate(date)}'] > button`);
}

describe("Calendar", () => {
  it("renders the current month grid with 7 weekday columns", () => {
    const { container } = render(<Calendar />);
    expect(container.querySelector("[data-slot='calendar']")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(container.querySelectorAll("th")).toHaveLength(7);
    // at least 4 weeks of day cells are rendered for the month
    expect(container.querySelectorAll("td[data-day]").length).toBeGreaterThanOrEqual(28);
  });

  it("selects a day on click and reports it via onSelect", async () => {
    const user = userEvent.setup();
    const onDayClick = vi.fn();
    const onSelect = vi.fn();
    const shared = {
      mode: "single" as const,
      defaultMonth: new Date(2026, 9, 1),
      onDayClick,
      onSelect,
    };
    const { container, rerender } = render(<Calendar {...shared} />);
    const target = queryDayButton(container, new Date(2026, 9, 15))!;
    expect(target).not.toBeNull();
    await user.click(target);
    expect(onDayClick).toHaveBeenCalledOnce();
    expect(onSelect.mock.calls[0][0]).toEqual(new Date(2026, 9, 15));
    // v9 treats an onSelect handler as controlled selection: feed the date back
    rerender(<Calendar {...shared} selected={new Date(2026, 9, 15)} />);
    expect(target.closest("td")).toHaveAttribute("data-selected", "true");
    expect(target).toHaveAttribute("data-selected-single", "true");
    expect(target).toHaveClass("bg-primary", "text-primary-foreground", "hover:bg-primary");
  });

  it("styles the selected day solid primary and today with primary semibold text", () => {
    const { container } = render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 9, 1)}
        selected={new Date(2026, 9, 15)}
      />,
    );
    const selected = queryDayButton(container, new Date(2026, 9, 15))!;
    expect(selected).toHaveAttribute("data-selected-single", "true");
    expect(selected).toHaveClass("bg-primary", "text-primary-foreground");

    const todayButton = queryDayButton(container, new Date());
    expect(todayButton).not.toBeNull();
    expect(todayButton).toHaveClass("font-semibold", "text-primary");
  });

  it("renders range middle days on the primary-light background", () => {
    const { container } = render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 9, 1)}
        selected={{ from: new Date(2026, 9, 14), to: new Date(2026, 9, 18) }}
      />,
    );
    const start = queryDayButton(container, new Date(2026, 9, 14))!;
    const middle = queryDayButton(container, new Date(2026, 9, 16))!;
    const end = queryDayButton(container, new Date(2026, 9, 18))!;
    expect(start).toHaveClass("bg-primary", "text-primary-foreground");
    expect(end).toHaveClass("bg-primary", "text-primary-foreground");
    expect(middle).toHaveAttribute("data-range-middle", "true");
    expect(middle).toHaveClass("bg-transparent");
    expect(middle.closest("td")).toHaveClass("bg-primary-light");
  });

  it("hides the navigation header with hideNavigation", () => {
    render(<Calendar hideNavigation defaultMonth={new Date(2026, 9, 1)} />);
    expect(screen.queryByRole("button", { name: /previous month/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /next month/i })).not.toBeInTheDocument();
  });

  it("renders Semi nav buttons (32px square, fill-0 hover) and lets consumers override", () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 9, 1)} className="p-6" />);
    const previous = screen.getByRole("button", { name: /previous month/i });
    expect(previous).toHaveClass("size-8", "rounded-sm", "hover:bg-muted", "text-text-2");
    const root = container.querySelector("[data-slot='calendar']");
    expect(root).toHaveClass("p-6", "bg-popover", "rounded-xl", "shadow-elevated");
    expect(root).not.toHaveClass("p-3");
  });
});
