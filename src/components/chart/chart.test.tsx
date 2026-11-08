import { render, screen } from "@testing-library/react";
import { vi, afterEach, describe, expect, it } from "vitest";

import { CHART_COLORS, ChartContainer, ChartTooltipContent } from "./index";

const tooltipPayload = [
    {
        name: "visits",
        dataKey: "visits",
        value: 1200,
        color: "var(--semi-color-data-0)",
        payload: { fill: "var(--semi-color-data-0)" },
    },
] as unknown as React.ComponentProps<typeof ChartTooltipContent>["payload"];

// jsdom reports a 0x0 box, which makes recharts ResponsiveContainer unmount its
// children; pretend the container has a real size for chart-content tests.
function mockChartSize(width = 480, height = 240) {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        width,
        height,
        top: 0,
        left: 0,
        right: width,
        bottom: height,
        x: 0,
        y: 0,
        toJSON: () => ({}),
    } as DOMRect);
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe("Chart", () => {
    it("renders a pure container around the recharts ResponsiveContainer", () => {
        mockChartSize();
        render(
            <ChartContainer
                config={{ visits: { label: "Visits", color: CHART_COLORS[0] } }}
                className="h-40 w-64"
            >
                <div data-testid="chart-child">chart child</div>
            </ChartContainer>,
        );
        const container = screen
            .getByTestId("chart-child")
            .closest("[data-slot='chart']");
        expect(container).toHaveClass("h-40", "w-64");
        expect(
            document.querySelector(".recharts-responsive-container"),
        ).not.toBeNull();
        // ChartContainer is a pure wrapper: it never renders chart content itself
        expect(document.querySelector(".recharts-surface")).toBeNull();
    });

    it("injects the config colors as --color-* CSS variables", () => {
        render(
            <ChartContainer
                config={{
                    visits: {
                        label: "Visits",
                        color: "var(--semi-color-data-3)",
                    },
                }}
            >
                <div>chart child</div>
            </ChartContainer>,
        );
        const container = document.querySelector<HTMLElement>(
            "[data-slot='chart']",
        );
        expect(container?.getAttribute("data-chart")).toMatch(/^chart-/);
        const style = container?.querySelector("style");
        expect(style?.textContent).toContain(
            "--color-visits: var(--semi-color-data-3)",
        );
    });

    it("exposes the Semi vchart data palette (20 colors)", () => {
        expect(CHART_COLORS).toHaveLength(20);
        expect(CHART_COLORS[0]).toBe("var(--semi-color-data-0)");
        expect(CHART_COLORS[19]).toBe("var(--semi-color-data-19)");
    });

    it("styles the tooltip as a Semi popover surface (6px radius, elevated shadow, 12px padding)", () => {
        mockChartSize();
        render(
            <ChartContainer
                config={{ visits: { label: "Visits", color: CHART_COLORS[0] } }}
            >
                <ChartTooltipContent
                    active
                    label="October"
                    payload={tooltipPayload}
                />
            </ChartContainer>,
        );
        expect(screen.getByText("Visits")).toBeInTheDocument();
        expect(screen.getByText("1,200")).toBeInTheDocument();
        const tooltip = screen
            .getByText("Visits")
            .closest("[data-slot='chart-tooltip-content']");
        expect(tooltip).not.toBeNull();
        expect(tooltip).toHaveClass(
            "rounded-xl",
            "border",
            "border-border",
            "bg-popover",
            "p-3",
            "text-sm",
            "shadow-elevated",
        );
    });

    it("throws when the tooltip content is used outside ChartContainer", () => {
        expect(() =>
            render(<ChartTooltipContent active payload={tooltipPayload} />),
        ).toThrow("useChart must be used within a <ChartContainer />");
    });
});
