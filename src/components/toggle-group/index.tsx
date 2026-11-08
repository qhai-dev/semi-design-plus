"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

import { toggleVariants } from "../toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
});

export interface ToggleGroupProps
  extends ToggleGroupPrimitive.Props,
    VariantProps<typeof toggleVariants> {
  /** Gap between items in 4px steps (Semi spacing scale); 0 joins the items. */
  spacing?: number;
  /** Layout direction of the group. */
  orientation?: "horizontal" | "vertical";
}

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": `${spacing * 0.25}rem` } as React.CSSProperties}
      className={cn(
        "flex w-fit items-center gap-(--gap)",
        orientation === "vertical" && "flex-col items-stretch",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);
  const activeVariant = context.variant || variant;
  const activeSize = context.size || size;
  const joined = context.spacing === 0;
  const isVertical = context.orientation === "vertical";

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={activeVariant}
      data-size={activeSize}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({ variant: activeVariant, size: activeSize }),
        "shrink-0 focus-visible:z-10",
        // joined (spacing=0): square inner corners + shared outline dividers
        joined && [
          "rounded-none px-2",
          isVertical
            ? "first:rounded-t-sm last:rounded-b-sm"
            : "first:rounded-l-sm last:rounded-r-sm",
          activeVariant === "outline" &&
            (isVertical
              ? "border-t-0 first:border-t"
              : "border-l-0 first:border-l"),
        ],
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
