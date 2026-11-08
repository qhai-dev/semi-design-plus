import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/**
 * shadcn RadioGroup API rendered with the Semi Design radio spec
 * (semi-foundation/radio/radio.scss + variables.scss):
 * - 16px circle, 1px border in --semi-color-text-3 when unchecked; hover
 *   deepens to fill-0 with a focus-border border, active uses fill-1
 * - checked: --semi-color-primary circle with an 8px white center dot
 *   (`size-2 rounded-full bg-white`)
 * - disabled: disabled-fill circle with --semi-color-border at 75% opacity,
 *   checked+disabled uses --semi-color-primary-disabled, label disabled-text
 * - label: 14px/20px text-0 with an 8px gap (Semi $spacing-tight)
 * - focus-visible: 2px outline in --semi-color-primary-light-active
 * - group: vertical 8px / horizontal 24px gaps between options
 */

function RadioDot({
  className,
  ...props
}: Omit<RadioPrimitive.Root.Props, "className"> & { className?: string }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-transparent text-primary-foreground outline-none transition-colors duration-100 select-none",
        // unchecked: transparent fill + 1px text-3 border; hover fill-0 +
        // focus-border border; active fill-1
        "border-text-3 hover:border-focus-border hover:bg-muted active:bg-muted-active",
        // checked: primary circle + white dot; hover/active deepen
        "data-checked:border-primary data-checked:bg-primary",
        "hover:data-checked:border-primary-hover hover:data-checked:bg-primary-hover",
        "active:data-checked:border-primary-active active:data-checked:bg-primary-active",
        // Semi `.semi-radio-disabled`: 75% opacity, disabled-fill + border
        "data-disabled:cursor-not-allowed data-disabled:border-border data-disabled:bg-disabled-fill data-disabled:opacity-75 data-disabled:hover:border-border data-disabled:hover:bg-disabled-fill",
        // disabled + checked: primary-disabled circle, white dot stays
        "data-disabled:data-checked:border-primary-disabled data-disabled:data-checked:bg-primary-disabled data-disabled:data-checked:hover:bg-primary-disabled",
        // Semi radio focus outline: 2px primary-light-active
        "focus-visible:outline-2 focus-visible:outline-primary-light-active",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center text-current"
      >
        <span
          data-slot="radio-group-dot"
          className="block size-2 rounded-full bg-white"
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export interface RadioProps
  extends Omit<RadioPrimitive.Root.Props, "className"> {
  /** Optional label rendered next to the dot (Semi `.semi-radio-addon`). */
  children?: ReactNode;
  className?: string;
}

export function Radio({ className, children, ...props }: RadioProps) {
  if (children === undefined || children === null) {
    return <RadioDot className={className} {...props} />;
  }
  return (
    // Semi `.semi-radio`: dot + addon row, 8px gap, 14px/20px text-0 label
    <label
      data-slot="radio-row"
      className={cn(
        "group inline-flex min-h-5 cursor-pointer items-center gap-2 text-sm leading-5 text-foreground select-none has-data-disabled:cursor-not-allowed",
        className,
      )}
    >
      <RadioDot {...props} />
      <span
        data-slot="radio-label"
        className="group-data-disabled:text-disabled-foreground"
      >
        {children}
      </span>
    </label>
  );
}

/** Backwards-compatible alias: the bare radio dot. */
export const RadioGroupItem = Radio;

export interface RadioGroupProps extends RadioGroupPrimitive.Props {
  /** Layout direction of the group. */
  orientation?: "vertical" | "horizontal";
}

export function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "flex-row items-center gap-6"
          : "flex-col gap-2",
        className,
      )}
      {...props}
    />
  );
}
