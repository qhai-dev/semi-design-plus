"use client";

import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { LoaderCircle } from "lucide-react";

/**
 * 按钮组件：用于触发一个即时操作。
 *
 * API 沿用 shadcn/ui 的 `variant` × `size` 组合，视觉规格对齐 Semi Design：
 * - 基础：32px 高、3px 圆角、14px/20px semibold、100ms 颜色过渡
 * - solid 类变体的 hover/active 使用 Semi primary-hover/active token
 * - focus-visible：2px 实线 outline（语义色 light-active）
 * - disabled：保留 `not-allowed` 光标（不用 pointer-events-none）
 */
export const buttonVariants = cva(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-sm leading-5 font-semibold whitespace-nowrap outline-none select-none transition-colors duration-100 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-light-active [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                // Semi <Button theme="solid" type="primary">
                default:
                    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active disabled:bg-disabled disabled:text-disabled-foreground disabled:hover:bg-disabled",
                // Semi outline style: transparent + 1px border, primary text, fill on hover
                outline:
                    "border border-border bg-transparent text-primary hover:bg-muted active:bg-muted-hover disabled:border-border disabled:bg-transparent disabled:text-disabled-foreground aria-expanded:bg-muted",
                // Semi <Button theme="solid" type="tertiary"> (grey solid)
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active disabled:bg-disabled disabled:text-disabled-foreground disabled:hover:bg-disabled aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
                // Semi <Button theme="borderless" type="primary">
                ghost: "bg-transparent text-primary hover:bg-muted active:bg-muted-hover disabled:bg-transparent disabled:text-disabled-foreground aria-expanded:bg-muted aria-expanded:text-primary",
                // Semi <Button theme="solid" type="danger">
                destructive:
                    "bg-destructive text-white hover:bg-destructive-hover active:bg-destructive-active focus-visible:outline-destructive-light-active disabled:bg-disabled disabled:text-disabled-foreground disabled:hover:bg-disabled",
                link: "bg-transparent text-primary underline-offset-4 hover:text-primary-hover hover:underline active:text-primary-active disabled:text-disabled-foreground",
            },
            size: {
                // Semi control heights: 32 / 24 / 40px
                default: "h-8 gap-2 px-3",
                xs: "h-6 gap-1 px-2 text-sm [&_svg:not([class*='size-'])]:size-3",
                sm: "h-6 gap-1 px-3 text-sm [&_svg:not([class*='size-'])]:size-3",
                lg: "h-10 gap-2 px-4",
                icon: "size-8",
                "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
                "icon-lg": "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
    /** Shows a spinner, disables interaction (Semi `loading`). */
    loading?: boolean;
}

export function Button({
    className,
    variant = "default",
    size = "default",
    loading = false,
    disabled,
    children,
    ...props
}: ButtonProps) {
    return (
        <ButtonPrimitive
            data-slot="button"
            data-loading={loading ? "" : undefined}
            aria-busy={loading || undefined}
            disabled={disabled || loading ? true : undefined}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {loading ? (
                <>
                    <LoaderCircle aria-hidden className="animate-spin" />
                    {children as ReactNode}
                </>
            ) : (
                children
            )}
        </ButtonPrimitive>
    );
}

Button.displayName = "Button";
