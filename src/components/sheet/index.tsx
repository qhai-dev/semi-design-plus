import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

import { Button } from "../button";

/**
 * shadcn Sheet API rendered with the Semi Design SideSheet spec
 * (`sideSheet/sideSheet.scss`):
 * - flush panel with no radius, bg-2 surface, elevated shadow, overlay mask
 * - small width 448px (`$width-sideSheet_size-small`) for left/right sides;
 *   top/bottom span the full width with auto height
 * - header padding 24px with 20px bottom (`$spacing-sideSheet_header-padding`,
 *   `...-paddingBottom`), body/footer padding 24px
 * - title 18px/600 (`$font-sideSheet_title-fontSize`, `...-fontWeight`)
 * - 180ms slide in/out (`$animation_duration-sideSheet_inner-show/hide`)
 *   with an opacity mask fade (`$animation_duration-sideSheet_mask-show/hide`)
 */

export const sheetVariants = cva(
  "fixed z-50 flex flex-col overflow-y-auto bg-dialog text-sm text-foreground shadow-elevated outline-none duration-[180ms] data-open:animate-in data-closed:animate-out",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full w-[448px] max-w-[calc(100%-2rem)] data-open:slide-in-from-right data-closed:slide-out-to-right",
        left: "inset-y-0 left-0 h-full w-[448px] max-w-[calc(100%-2rem)] data-open:slide-in-from-left data-closed:slide-out-to-left",
        top: "inset-x-0 top-0 max-h-[calc(100%-2rem)] w-full data-open:slide-in-from-top data-closed:slide-out-to-top",
        bottom:
          "inset-x-0 bottom-0 max-h-[calc(100%-2rem)] w-full data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export interface SheetContentProps
  extends SheetPrimitive.Popup.Props,
    VariantProps<typeof sheetVariants> {
  /** Shows the corner close button (Semi SideSheet close icon). */
  showCloseButton?: boolean;
}

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay duration-[180ms] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            aria-label="Close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-6 right-6 text-text-2 hover:bg-muted hover:text-text-0"
              />
            }
          >
            <X aria-hidden className="size-5" />
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-2 p-6 pr-12 pb-5", className)}
      {...props}
    />
  );
}

function SheetFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg leading-6 font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm leading-5 text-text-2", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
