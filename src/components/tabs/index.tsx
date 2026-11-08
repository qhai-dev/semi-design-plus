import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Semi Design tabs spec:
 * - line: text tabs (text-2 → text-0 on hover/active), 2px primary underline,
 *   1px border track; tab padding 16/4/15/4 with 24px gaps
 * - button: filled tabs — default text-2, hover fill-0,
 *   selected primary-light background with primary text (32px height)
 * - card: selected tab lifts to bg-1 with a border; track keeps a bottom line
 */

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center text-text-2 data-horizontal:h-12 data-vertical:flex-col data-vertical:h-fit data-vertical:gap-1",
  {
    variants: {
      variant: {
        line: "gap-6 rounded-none border-b border-border bg-transparent data-vertical:border-b-0",
        button: "gap-2 rounded-none bg-transparent data-vertical:items-stretch",
        card: "gap-1 rounded-none border-b border-border bg-transparent",
      },
    },
    defaultVariants: { variant: "line" },
  },
);

const tabsTriggerVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm outline-none transition-colors duration-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-light-active disabled:cursor-not-allowed disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        line: [
          "-mb-px rounded-none border-b-2 border-transparent px-1 py-4 text-text-2",
          "hover:text-foreground",
          "data-active:border-b-primary data-active:text-foreground",
          "data-vertical:justify-start data-vertical:border-b-0 data-vertical:border-l-2 data-vertical:-ml-px data-vertical:px-4 data-vertical:py-2",
          "data-vertical:data-active:border-l-primary data-vertical:data-active:bg-primary-light",
        ].join(" "),
        button: [
          "h-8 rounded-sm px-4 text-text-2",
          "hover:bg-muted",
          "data-active:bg-primary-light data-active:text-primary",
        ].join(" "),
        card: [
          "-mb-px rounded-t-sm border border-b-0 border-transparent px-4 py-2.5 text-text-2",
          "hover:bg-muted hover:text-foreground",
          "data-active:border-border data-active:bg-card data-active:text-foreground",
        ].join(" "),
      },
    },
    defaultVariants: { variant: "line" },
  },
);

function TabsList({
  className,
  variant = "line",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant = "line",
  ...props
}: TabsPrimitive.Tab.Props & VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 pt-4 text-sm text-foreground outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
