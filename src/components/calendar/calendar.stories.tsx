import type { Meta, StoryObj } from "@storybook/react-vite";
import { zhCN } from "react-day-picker/locale";
import { within, expect, userEvent } from "storybook/test";
import { Calendar } from "./index";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} selected={new Date(2026, 9, 15)} />
  ),
};

export const ZhCN: Story = {
  name: "ZhCN",
  render: () => (
    <Calendar mode="single" locale={zhCN} weekStartsOn={0} defaultMonth={new Date(2026, 9, 1)} />
  ),
};

export const MultipleMonths: Story = {
  render: () => (
    <Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} numberOfMonths={2} />
  ),
};

export const RangeSelection: Story = {
  render: () => (
    <Calendar
      mode="range"
      defaultMonth={new Date(2026, 9, 1)}
      selected={{ from: new Date(2026, 9, 14), to: new Date(2026, 9, 18) }}
    />
  ),
};

export const DisabledDays: Story = {
  render: () => (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 9, 1)}
      disabled={[{ before: new Date(2026, 9, 20) }]}
    />
  ),
};

export const MonthYearDropdowns: Story = {
  render: () => (
    <Calendar mode="single" captionLayout="dropdown" defaultMonth={new Date(2026, 9, 1)} />
  ),
};

export const InteractiveSelect: Story = {
  render: () => <Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} />,
  play: async () => {
    const grid = within(document.body).getByRole("grid");
    const target = grid.querySelector<HTMLButtonElement>("td[data-day='2026-10-15'] > button");
    await userEvent.click(target!);
    expect(target).toHaveAttribute("data-selected-single", "true");
    expect(target).toHaveClass("bg-primary", "text-primary-foreground");
  },
};
