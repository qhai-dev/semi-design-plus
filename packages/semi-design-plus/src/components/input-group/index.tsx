import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

import { Button } from "../button";
import { Input } from "../input";
import { TextArea } from "../textarea";

/**
 * shadcn InputGroup API with the Semi Design group spec
 * (semi-foundation/input/input.scss `.semi-input-group` + input wrapper):
 * - the container is one Semi input-wrapper box: fill-0 background deepening
 *   on hover (fill-1), 1px solid focus-border (focus-within) on focus, 3px
 *   radius, 32px height, transparent border, 100ms color transition
 * - joined children keep rounded ends only on the first/last (3px) and are
 *   separated by a 1px --semi-color-border divider (divide-x divide-border)
 * - addon/text: text-2 at weight 600 with 8px/12px padding
 * - disabled: bg-disabled-fill and the not-allowed cursor (no pointer-events)
 */

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="input-group"
            role="group"
            className={cn(
                "flex h-8 w-full min-w-0 items-center rounded-sm border border-transparent bg-muted text-sm divide-x divide-border outline-none transition-colors duration-100",
                "hover:bg-muted-hover",
                "focus-within:border-focus-border focus-within:bg-muted",
                "has-disabled:cursor-not-allowed has-disabled:bg-disabled-fill has-disabled:text-disabled-foreground",
                // block-level addons and textareas grow the box beyond 32px
                "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>textarea]:h-auto",
                className,
            )}
            {...props}
        />
    );
}

const inputGroupAddonVariants = cva(
    "flex items-center gap-2 self-stretch px-3 py-2 text-sm font-semibold text-text-2 select-none cursor-text [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            align: {
                "inline-start": "order-first",
                "inline-end": "order-last",
                "block-start": "order-first w-full self-auto justify-start border-b border-border",
                "block-end": "order-last w-full self-auto justify-start border-t border-border",
            },
        },
        defaultVariants: {
            align: "inline-start",
        },
    },
);

function InputGroupAddon({
    className,
    align = "inline-start",
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
    return (
        <div
            role="group"
            data-slot="input-group-addon"
            data-align={align}
            className={cn(inputGroupAddonVariants({ align }), className)}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest("button")) {
                    return;
                }
                e.currentTarget.parentElement?.querySelector("input")?.focus();
            }}
            {...props}
        />
    );
}

const inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
    variants: {
        size: {
            // Semi control heights: 24px inside the 32px group
            xs: "h-6 gap-1 rounded-sm px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
            sm: "",
            "icon-xs": "size-6 rounded-sm p-0",
            "icon-sm": "size-8 p-0",
        },
    },
    defaultVariants: {
        size: "xs",
    },
});

function InputGroupButton({
    className,
    type = "button",
    variant = "ghost",
    size = "xs",
    ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
    VariantProps<typeof inputGroupButtonVariants> & {
        type?: "button" | "submit" | "reset";
    }) {
    return (
        <Button
            type={type}
            data-size={size}
            variant={variant}
            className={cn(inputGroupButtonVariants({ size }), className)}
            {...props}
        />
    );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="input-group-text"
            className={cn(
                "flex items-center gap-2 text-sm font-semibold text-text-2 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    );
}

function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
    return (
        <Input
            data-slot="input-group-control"
            className={cn(
                "min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 shadow-none",
                // the group box owns the Semi focus border / fill background
                "focus:border-transparent focus:bg-transparent",
                "disabled:bg-transparent aria-invalid:bg-transparent",
                className,
            )}
            {...props}
        />
    );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<typeof TextArea>) {
    return (
        <TextArea
            data-slot="input-group-control"
            className={cn(
                "min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 py-2 shadow-none resize-none",
                "focus:border-transparent focus:bg-transparent",
                "disabled:bg-transparent aria-invalid:bg-transparent",
                className,
            )}
            {...props}
        />
    );
}

export {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupInput,
    InputGroupTextarea,
};
