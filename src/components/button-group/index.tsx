import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

import { Separator } from "../separator";

/**
 * Semi ButtonGroup spec (button.scss `.semi-button-group`):
 * - member buttons lose their own radius; the first member keeps the left
 *   3px radius, the last member the right 3px radius
 * - members are joined by a 1px line in --semi-color-border (via the leading
 *   border of each following member)
 * - outline members merge their adjacent borders: each following member pulls
 *   itself 1px left over the previous member (margin-right -1px in Semi)
 * - explicit separators stay 1px wide and are excluded from the merge
 */
const buttonGroupVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*]:rounded-none [&>*:first-child]:rounded-l-sm [&>*:last-child]:rounded-r-sm " +
          "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:-ml-px " +
          "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:border-l " +
          "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:border-border",
        vertical:
          "flex-col [&>*]:rounded-none [&>*:first-child]:rounded-t-sm [&>*:last-child]:rounded-b-sm " +
          "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:-mt-px " +
          "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:border-t " +
          "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:border-border",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 bg-muted px-3 text-sm font-semibold text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  });
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-border self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
