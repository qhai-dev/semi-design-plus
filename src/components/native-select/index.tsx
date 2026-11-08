import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

/**
 * Native `<select>` rendered with the Semi Design select trigger spec:
 * - the box mirrors the Semi input wrapper: fill-0 background deepening on
 *   hover (fill-1), 1px focus-border border while focused, 32px height,
 *   3px radius, 14px text, with a 12px chevron overlaid on the right
 */

export const nativeSelectVariants = cva(
  "h-8 w-full min-w-0 cursor-pointer appearance-none rounded-sm border border-transparent bg-muted px-3 pr-8 text-sm leading-5 text-foreground select-none outline-none transition-colors duration-100 hover:bg-muted-hover active:bg-muted-active focus:border-focus-border focus:bg-muted disabled:cursor-not-allowed disabled:bg-disabled-fill disabled:text-disabled-foreground aria-invalid:border-destructive aria-invalid:bg-destructive-light",
  {
    variants: {
      // Semi control heights: 32 / 24px
      size: {
        default: "",
        sm: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface NativeSelectProps
  extends Omit<ComponentProps<"select">, "size">,
    VariantProps<typeof nativeSelectVariants> {}

function NativeSelect({ className, size = "default", ...props }: NativeSelectProps) {
  return (
    <div
      className={cn("group/native-select relative w-fit", className)}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(nativeSelectVariants({ size }))}
        {...props}
      />
      <ChevronDown
        aria-hidden
        data-slot="native-select-icon"
        className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-text-2 select-none"
      />
    </div>
  );
}

function NativeSelectOption({ className, ...props }: ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({ className, ...props }: ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
