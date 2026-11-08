import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Semi Design Tag spec (the shadcn "badge" shape maps to Semi's tag):
 * - 24px height, 8px horizontal padding, 3px radius (full for `shape="circle"`)
 * - semantic solid fills with white text, `light` variant uses the
 *   fill-0 grey surface like Semi's default tag
 */
const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-sm px-2 text-sm [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3.5 focus-visible:outline-2 focus-visible:outline-primary-light-active",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-white",
        outline: "border border-border bg-transparent text-foreground",
        light: "bg-muted text-foreground",
      },
      shape: {
        square: "rounded-sm",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "square",
    },
  },
);

function Badge({
  className,
  variant = "default",
  shape = "square",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, shape }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
      shape,
    },
  });
}

export { Badge, badgeVariants };
