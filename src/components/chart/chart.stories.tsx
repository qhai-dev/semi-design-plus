import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  CHART_COLORS,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./index";

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyData = [
  { month: "Jan", visits: 1860, orders: 800 },
  { month: "Feb", visits: 2050, orders: 960 },
  { month: "Mar", visits: 3390, orders: 1400 },
  { month: "Apr", visits: 2780, orders: 1200 },
  { month: "May", visits: 1890, orders: 980 },
  { month: "Jun", visits: 2390, orders: 1080 },
];

const chartConfig = {
  visits: { label: "Visits", color: CHART_COLORS[0] },
  orders: { label: "Orders", color: CHART_COLORS[2] },
} satisfies ChartConfig;

export const Default: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="h-64 w-[480px]">
      <LineChart data={monthlyData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="visits"
          type="monotone"
          stroke={CHART_COLORS[0]}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="orders"
          type="monotone"
          stroke={CHART_COLORS[2]}
          strokeWidth={2}
          dot={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  ),
  play: async () => {
    // The container renders the recharts surface with the Semi data palette
    expect(within(document.body).getByText("Jan")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='chart']")).not.toBeNull();
    expect(document.querySelector(".recharts-surface")).not.toBeNull();
    const lines = document.querySelectorAll(".recharts-line-curve");
    expect(lines.length).toBe(2);
    expect(lines[0]).toHaveAttribute("stroke", CHART_COLORS[0]);
  },
};

export const BarChartDemo: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="h-64 w-[480px]">
      <BarChart data={monthlyData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="visits" fill={CHART_COLORS[4]} radius={3} />
      </BarChart>
    </ChartContainer>
  ),
};

export const StackedBars: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="h-64 w-[480px]">
      <BarChart data={monthlyData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="visits" stackId="a" fill={CHART_COLORS[0]} />
        <Bar dataKey="orders" stackId="a" fill={CHART_COLORS[5]} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};

export const ContainerOnly: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="h-40 w-64">
      <div className="flex h-full items-center justify-center text-sm text-text-2">
        ChartContainer is a pure wrapper — pass any recharts chart as the child.
      </div>
    </ChartContainer>
  ),
};
