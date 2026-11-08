import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "../../lib/cn";

/**
 * shadcn HoverCard API mapped to the Semi Design Popover hover form
 * (`popover/popover.scss`):
 * - bg-3 surface with a 1px border line, 6px radius (`--semi-border-radius-medium`),
 *   12px padding (`$spacing-popover_withArrow-padding`), elevated shadow, 320px width
 * - no arrow: Semi `Popover` ships `showArrow: false` by default (the arrow is an
 *   opt-in, so the hover form renders bare)
 * - trigger delays follow Semi's hover defaults `MOUSE_ENTER_DELAY` /
 *   `MOUSE_LEAVE_DELAY` = 50ms (semi-foundation/tooltip/constants.ts), overridable
 *   through the trigger's `delay` / `closeDelay` props
 */

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  delay = 50,
  closeDelay = 50,
  ...props
}: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      delay={delay}
      closeDelay={closeDelay}
      {...props}
    />
  );
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-80 origin-(--transform-origin) rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground shadow-elevated outline-none",
            "duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
