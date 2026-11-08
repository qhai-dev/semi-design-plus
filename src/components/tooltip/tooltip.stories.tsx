import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./index";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: { layout: "centered" },
    decorators: [
        (Story) => (
            <TooltipProvider>
                <div className="flex min-h-40 items-center justify-center">
                    <Story />
                </div>
            </TooltipProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
    ),
};

export const Sides: Story = {
    render: () => (
        <div className="grid grid-cols-2 gap-x-24 gap-y-10">
            {(
                [
                    ["top", "Top tooltip"],
                    ["bottom", "Bottom tooltip"],
                    ["left", "Left tooltip"],
                    ["right", "Right tooltip"],
                ] as const
            ).map(([side, label]) => (
                <Tooltip key={side}>
                    <TooltipTrigger>
                        <Button variant="outline">{side}</Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>{label}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    ),
};

export const LongContent: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger>
                <Button variant="outline">Long content</Button>
            </TooltipTrigger>
            <TooltipContent>
                This tooltip wraps after two hundred and forty pixels, matching
                the Semi Design default max width.
            </TooltipContent>
        </Tooltip>
    ),
};
