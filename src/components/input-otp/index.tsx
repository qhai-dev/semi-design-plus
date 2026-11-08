"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * shadcn InputOTP API (input-otp primitives) with the Semi Design pincode
 * spec (semi-foundation/pincode/pincode.scss + variables.scss):
 * - equal-square cells: 32px default / 24px small ($width-pinCode_input_*),
 *   spaced 8px default / 6px small ($spacing-pinCode_*-marginRight)
 * - each cell is a Semi input-wrapper: fill-0 bg, 3px radius, 1px solid
 *   focus-border on the active cell
 * - separator divider uses the border token; disabled cells use
 *   bg-disabled-fill with the not-allowed cursor
 */

/** Cell spacing per Semi pincode size (shared by container and groups). */
const inputOTPContainerVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-2",
      sm: "gap-1.5",
    },
  },
  defaultVariants: { size: "default" },
});

export const inputOTPSlotVariants = cva(
  "relative flex items-center justify-center rounded-sm border border-transparent bg-muted text-sm text-foreground outline-none transition-colors duration-100 data-[active=true]:border-focus-border group-data-[disabled]/otp:bg-disabled-fill group-data-[disabled]/otp:text-disabled-foreground",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        sm: "h-6 w-6 text-xs",
      },
    },
    defaultVariants: { size: "default" },
  },
);

type InputOTPSize = NonNullable<
  VariantProps<typeof inputOTPSlotVariants>["size"]
>;

const InputOTPSizeContext = React.createContext<InputOTPSize>("default");

/**
 * Wrapper props. Mirrors input-otp's own overrides (value/onChange work on
 * the joined string, maxLength is required); the render prop is not exposed —
 * compose cells via children as in the shadcn recipe.
 */
export interface InputOTPProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "value" | "onChange" | "maxLength" | "defaultValue"
  > {
  /** Controlled value (the joined cell characters). */
  value?: string;
  /** Fires with the joined string as the user types. */
  onChange?: (newValue: string) => unknown;
  /** Number of cells; defaults to 6. */
  maxLength?: number;
  /** Extra classes for the flex container that spaces the cells. */
  containerClassName?: string;
  /** Semi pincode cell size: default 32px cells / sm 24px cells. */
  size?: InputOTPSize;
  children?: React.ReactNode;
}

function InputOTP({
  className,
  containerClassName,
  size = "default",
  disabled,
  maxLength = 6,
  ...props
}: InputOTPProps) {
  return (
    <InputOTPSizeContext.Provider value={size}>
      <div
        data-slot="input-otp"
        data-size={size}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "group/otp inline-block",
          disabled && "cursor-not-allowed",
          className,
        )}
      >
        <OTPInput
          containerClassName={cn(
            inputOTPContainerVariants({ size }),
            containerClassName,
          )}
          disabled={disabled}
          spellCheck={false}
          // OTP codes are not password fields: skip the password-manager
          // badge workaround (and its elementFromPoint measurements)
          pushPasswordManagerStrategy="none"
          className="disabled:cursor-not-allowed"
          // InputOTPProps reflects the children-composition subset of the
          // package's (render | children) union; this cast keeps passthrough
          {...(props as React.ComponentProps<typeof OTPInput>)}
          maxLength={maxLength}
        />
      </div>
    </InputOTPSizeContext.Provider>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  const size = React.useContext(InputOTPSizeContext);
  return (
    <div
      data-slot="input-otp-group"
      className={cn(inputOTPContainerVariants({ size }), className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const size = React.useContext(InputOTPSizeContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-size={size}
      className={cn(inputOTPSlotVariants({ size }), className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn(
        "flex items-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <Minus aria-hidden className="text-border" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
