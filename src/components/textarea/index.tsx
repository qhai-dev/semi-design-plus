"use client";

import { startTransition, useMemo, useOptimistic } from "react";
import { cva } from "class-variance-authority";
import { cn } from "cn";

import type { ChangeEvent } from "react";
import type { VariantProps } from "class-variance-authority";

export const textarea = cva(
    "relative pb-6 pt-2 resize-y field-sizing-content block w-full min-h-16 rounded-sm border border-transparent bg-muted px-3 text-sm leading-5 text-foreground outline-none cursor-text transition-colors duration-100 placeholder:text-text-2 hover:bg-muted-hover focus:border-focus-border focus:bg-muted disabled:cursor-not-allowed disabled:bg-disabled-fill disabled:text-disabled-foreground disabled:placeholder:text-disabled-foreground",
    {
        variants: {
            // size: {
            //     default: "text-sm",
            //     sm: "text-sm",
            //     lg: "text-base",
            // },
            validateStatus: {
                default: "",
                // Semi `.semi-input-textarea-wrapper-error`: danger-light bg/border,
                // solid danger border while focused
                error: "border-destructive-light bg-destructive-light hover:bg-destructive-light-hover focus:border-destructive focus:bg-destructive-light active:bg-destructive-light-active",
                // Semi `.semi-input-textarea-wrapper-warning`
                warning:
                    "border-warning-light bg-warning-light hover:bg-warning-light-hover focus:border-warning focus:bg-warning-light active:bg-warning-light-active",
            },
        },
        defaultVariants: {
            // size: "default",
            // validateStatus: "default",
        },
    },
);

export interface TextareaProps
    extends React.ComponentProps<"textarea">, VariantProps<typeof textarea> {
    // showClear?: boolean;
    value?: string;
    action?: (value: string, e: ChangeEvent<HTMLTextAreaElement>) => void | Promise<void>;
}

function characterCount(str: string): number {
    if (str === "") {
        return 0;
    }

    if (typeof Intl.Segmenter === "function") {
        const characterSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
        return [...characterSegmenter.segment(str)].map((s) => s.segment).length;
    }
    return [...str].length;
}

// TODO 待实现 maxCount 和 showClear 逻辑

/**
 * @example
 * ```
 * <TextArea value={description} onChange={setDescription} />
 * ```
 */
export function TextArea({
    className,
    maxLength,
    value,
    onChange,
    action,
    ...props
}: TextareaProps) {
    const [optimisticValue, setOptimisticValue] = useOptimistic(value);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        if (maxLength != null) {
            // TODO 无障碍设计
            characterCount(newValue);
        }

        onChange?.(e);
        if (action && !e.defaultPrevented) {
            startTransition(async () => {
                setOptimisticValue(newValue);
                await action(newValue, e);
            });
        }
    };

    const valueLength = useMemo(() => {
        if (maxLength != null && optimisticValue != null) {
            return characterCount(optimisticValue);
        }
        return 0;
    }, [maxLength, optimisticValue]);

    return (
        <div className="relative">
            <textarea
                value={optimisticValue}
                onChange={handleChange}
                data-slot="textarea"
                className={cn(textarea(), className)}
                {...props}
            />
            {maxLength != null && (
                <div className="absolute right-0 bottom-0 min-h-6 flex items-center justify-center text-right text-xs flex-col px-3 pointer-events-none">
                    {valueLength}/{maxLength}
                </div>
            )}
        </div>
    );
}

TextArea.displayName = "TextArea";
