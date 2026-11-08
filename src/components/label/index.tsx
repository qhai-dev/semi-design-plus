import type { LabelHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "../../lib/cn";

/**
 * shadcn Label API (bare <label>) with the Semi Design form label spec
 * (semi-foundation/form/form.scss `.semi-form-field-label` + variables.scss):
 * - 14px/20px regular text, font-weight 600 (Semi's bold), color text-0
 * - required: leading red `*` mark (color --semi-color-danger), 4px margin
 * - optional: trailing grey "(optional)" in --semi-color-tertiary
 * - disabled: color --semi-color-disabled-text (keeps the not-allowed cursor,
 *   no pointer-events-none)
 */

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Renders the required `*` mark before the label text. */
  required?: boolean;
  /** Renders a grey "(optional)" hint after the label text. */
  optional?: boolean;
  /** Muted label text (Semi `.semi-form-field-label-disabled`). */
  disabled?: boolean;
  ref?: Ref<HTMLLabelElement>;
}

export function Label({
  className,
  required = false,
  optional = false,
  disabled = false,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      data-slot="label"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "flex select-none items-center text-sm leading-5 font-semibold text-foreground",
        "peer-disabled:cursor-not-allowed peer-disabled:text-disabled-foreground",
        disabled && "cursor-not-allowed text-disabled-foreground",
        className,
      )}
      {...props}
    >
      {required && (
        <span
          data-slot="label-required"
          aria-hidden
          className="mr-1 font-semibold text-destructive"
        >
          *
        </span>
      )}
      {children as ReactNode}
      {optional && (
        <span
          data-slot="label-optional"
          className="ml-1 font-normal text-tertiary"
        >
          (optional)
        </span>
      )}
    </label>
  );
}

Label.displayName = "Label";
