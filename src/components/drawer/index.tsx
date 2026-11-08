import * as React from "react";
import { Dialog as DrawerPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * shadcn Drawer API rendered with the Semi Design SideSheet spec, without the
 * header scaffolding: the same flush bg-2 panel as the sheet (448px small
 * width for left/right, elevated shadow, overlay mask, 180ms slide), but the
 * content area is a plain scrollable region — no baked-in close button, no
 * forced header. Compose DrawerTitle/DrawerDescription/DrawerHeader/DrawerFooter
 * as needed; a DrawerClose trigger closes the panel.
 */

export const drawerVariants = cva(
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

export interface DrawerContentProps
  extends DrawerPrimitive.Popup.Props,
    VariantProps<typeof drawerVariants> {}

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay duration-[180ms] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  side = "right",
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Popup
        data-slot="drawer-content"
        data-side={side}
        className={cn(drawerVariants({ side }), className)}
        {...props}
      >
        {children}
      </DrawerPrimitive.Popup>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-2 p-6 pb-5", className)}
      {...props}
    />
  );
}

function DrawerFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
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

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg leading-6 font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm leading-5 text-text-2", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
