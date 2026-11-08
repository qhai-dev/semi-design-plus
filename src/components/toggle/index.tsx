import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * shadcn Toggle API rendered with the Semi Design button spec for
 * borderless/light buttons (semi-foundation/button/button.scss):
 * - 32px height, 3px radius, 14px/20px semibold text, 100ms color transition
 * - default (borderless): transparent, hover fill-0, active fill-1; the
 *   pressed state sits on fill-1 with text-0
 * - outline: transparent + 1px --semi-color-border + text-0; the pressed state
 *   switches to the Semi light-button palette (primary-light bg, primary text)
 * - disabled keeps the not-allowed cursor (no pointer-events-none)
 * - focus-visible: 2px outline in --semi-color-primary-light-active
 */
export const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-sm leading-5 font-semibold whitespace-nowrap outline-none select-none transition-colors duration-100 cursor-pointer disabled:cursor-not-allowed disabled:text-disabled-foreground focus-visible:outline-2 focus-visible:outline-primary-light-active [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Semi <Button theme="borderless">: transparent, hover fill-0;
        // pressed = fill-1 + text-0
        default:
          "bg-transparent text-foreground hover:bg-muted active:bg-muted-hover data-pressed:bg-muted-hover data-pressed:hover:bg-muted-hover data-pressed:active:bg-muted-hover disabled:data-pressed:bg-muted-hover disabled:data-pressed:text-disabled-foreground",
        // Semi outline + light pressed semantics: 1px border, text-0;
        // pressed = primary-light bg + primary text
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted active:bg-muted-hover disabled:border-border disabled:bg-transparent data-pressed:border-border data-pressed:bg-primary-light data-pressed:text-primary data-pressed:hover:bg-primary-light-hover disabled:data-pressed:bg-primary-light disabled:data-pressed:text-disabled-foreground",
      },
      size: {
        // Semi control heights: 24 / 32 / 40px
        default: "h-8 px-3",
        sm: "h-6 px-2 text-sm [&_svg:not([class*='size-'])]:size-3",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ToggleProps
  extends TogglePrimitive.Props,
    VariantProps<typeof toggleVariants> {}

export function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}
