import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { Check, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/**
 * shadcn Checkbox API rendered with the Semi Design checkbox spec
 * (semi-foundation/checkbox/checkbox.scss + variables.scss):
 * - 16x16 box, 3px radius (--semi-border-radius-extra-small); unchecked keeps a
 *   transparent fill with a 1px border in --semi-color-text-3, hover deepens to
 *   fill-0 with a focus-border border, active uses fill-1
 * - checked: --semi-color-primary background/border with a white check icon
 *   (lucide Check, 14px); indeterminate renders a horizontal line (lucide Minus)
 * - disabled: disabled-fill box with --semi-color-border, checked+disabled keeps
 *   --semi-color-primary-disabled at 75% opacity, label uses disabled-text
 * - label: 14px/20px text-0 with an 8px gap (Semi $spacing-tight)
 * - focus-visible: 2px outline in --semi-color-primary-light-active
 */

function CheckboxBox({
  className,
  ...props
}: Omit<CheckboxPrimitive.Root.Props, "className"> & { className?: string }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border bg-transparent text-primary-foreground outline-none transition-colors duration-100 select-none",
        // unchecked: transparent fill + 1px text-3 border; hover fill-0 +
        // focus-border border; active fill-1
        "border-text-3 hover:border-focus-border hover:bg-muted active:bg-muted-active",
        // checked: primary bg/border, white icon; hover/active deepen
        "data-checked:border-primary data-checked:bg-primary",
        "hover:data-checked:border-primary-hover hover:data-checked:bg-primary-hover",
        "active:data-checked:border-primary-active active:data-checked:bg-primary-active",
        // indeterminate: same palette as checked with the Minus glyph
        "data-indeterminate:border-primary data-indeterminate:bg-primary",
        "hover:data-indeterminate:border-primary-hover hover:data-indeterminate:bg-primary-hover",
        "active:data-indeterminate:border-primary-active active:data-indeterminate:bg-primary-active",
        // disabled: disabled-fill + --semi-color-border, not-allowed cursor
        "data-disabled:cursor-not-allowed data-disabled:border-border data-disabled:bg-disabled-fill data-disabled:hover:border-border data-disabled:hover:bg-disabled-fill",
        // disabled + checked/indeterminate: primary-disabled at 75% opacity
        "data-disabled:data-checked:border-primary-disabled data-disabled:data-checked:bg-primary-disabled data-disabled:data-checked:opacity-75 data-disabled:data-checked:hover:bg-primary-disabled",
        "data-disabled:data-indeterminate:border-primary-disabled data-disabled:data-indeterminate:bg-primary-disabled data-disabled:data-indeterminate:opacity-75 data-disabled:data-indeterminate:hover:bg-primary-disabled",
        // Semi checkbox focus outline: 2px primary-light-active
        "focus-visible:outline-2 focus-visible:outline-primary-light-active",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <Check aria-hidden className="size-3.5 in-data-indeterminate:hidden" />
        <Minus aria-hidden className="hidden size-3.5 in-data-indeterminate:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export interface CheckboxProps
  extends Omit<CheckboxPrimitive.Root.Props, "className"> {
  /** Optional label rendered next to the box (Semi `.semi-checkbox-addon`). */
  children?: ReactNode;
  className?: string;
}

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  if (children === undefined || children === null) {
    return <CheckboxBox className={className} {...props} />;
  }
  return (
    // Semi `.semi-checkbox`: box + addon row, 8px gap, 14px/20px text-0 label
    <label
      data-slot="checkbox-row"
      className={cn(
        "group inline-flex cursor-pointer items-center gap-2 text-sm leading-5 text-foreground select-none has-data-disabled:cursor-not-allowed",
        className,
      )}
    >
      <CheckboxBox {...props} />
      <span
        data-slot="checkbox-label"
        className="group-data-disabled:text-disabled-foreground"
      >
        {children}
      </span>
    </label>
  );
}

export interface CheckboxGroupProps extends CheckboxGroupPrimitive.Props {
  /** Layout direction of the group; Semi uses 12px vertical / 16px horizontal gaps. */
  orientation?: "vertical" | "horizontal";
}

export function CheckboxGroup({
  className,
  orientation = "vertical",
  ...props
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "flex-row items-center gap-4"
          : "flex-col gap-3",
        className,
      )}
      {...props}
    />
  );
}
