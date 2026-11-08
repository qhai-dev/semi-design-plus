import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

/**
 * shadcn Select API rendered with the Semi Design select spec:
 * - trigger mirrors the Semi input wrapper: fill-0 background deepening on
 *   hover (fill-1), 1px focus-border border while focused/open, 32px height,
 *   3px radius, 14px text (value is never bold)
 * - popup: 6px radius, elevated shadow, 8px vertical padding, same width as
 *   the trigger (w-(--anchor-width))
 * - items: 36px rows, fill-0 hover/highlight, selected = semibold + a primary
 *   Check on the right (Semi tick)
 */

export const selectTriggerVariants = cva(
  "flex w-fit cursor-pointer select-none items-center justify-between gap-1.5 whitespace-nowrap rounded-sm border border-transparent bg-muted px-3 text-sm leading-5 text-foreground outline-none transition-colors duration-100 hover:bg-muted-hover active:bg-muted-active focus-visible:border-focus-border focus-visible:bg-muted data-popup-open:border-focus-border data-popup-open:bg-muted data-popup-open:hover:bg-muted disabled:cursor-not-allowed disabled:bg-disabled-fill disabled:text-disabled-foreground aria-invalid:border-destructive aria-invalid:bg-destructive-light data-placeholder:text-text-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // Semi control heights: 32 / 24px
      size: {
        default: "h-8",
        sm: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface SelectTriggerProps
  extends SelectPrimitive.Trigger.Props,
    VariantProps<typeof selectTriggerVariants> {}

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-0", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        className="pointer-events-none size-3 shrink-0 text-text-2"
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "min-w-36 rounded-xl bg-popover py-2 text-popover-foreground shadow-elevated duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 cn-menu-target cn-menu-translucent relative isolate z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-3 py-1 text-xs text-text-2", className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex h-9 w-full cursor-default select-none items-center gap-2 px-3 text-sm leading-5 text-foreground outline-none transition-colors duration-100 data-highlighted:bg-muted data-highlighted:text-foreground active:bg-muted-active aria-selected:font-semibold data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive-light [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span
            data-slot="select-item-indicator"
            className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center"
          />
        }
      >
        <Check aria-hidden className="size-3.5 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 text-text-2 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <ChevronUp aria-hidden />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 text-text-2 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <ChevronDown aria-hidden />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
