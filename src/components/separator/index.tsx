import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "../../lib/cn";

/**
 * Semi Design divider spec: a 1px line with 1px outer margins. Optional
 * inlined content renders as line-text-line with 8px side padding, and
 * `dashed` switches the line style like Semi's dashed divider.
 */
function Separator({
  className,
  orientation = "horizontal",
  dashed = false,
  children,
  ...props
}: SeparatorPrimitive.Props & {
  dashed?: boolean;
  children?: React.ReactNode;
}) {
  if (children) {
    const lineClass = cn(
      dashed
        ? "border-border bg-transparent"
        : "bg-border border-transparent border-t-0 border-l-0",
      "shrink-0",
    );
    return (
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        data-dashed={dashed ? "" : undefined}
        className={cn(
          "my-1 flex w-full items-center text-sm text-foreground select-none",
          orientation === "vertical" && "mx-1 my-0 h-full w-auto flex-col",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            lineClass,
            orientation === "vertical" ? "h-full w-px" : "h-px flex-1",
            dashed && (orientation === "vertical" ? "border-l" : "border-t"),
          )}
        />
        <span className="px-2 leading-5">{children}</span>
        <span
          aria-hidden
          className={cn(
            lineClass,
            orientation === "vertical" ? "h-full w-px" : "h-px flex-1",
            dashed && (orientation === "vertical" ? "border-l" : "border-t"),
          )}
        />
      </SeparatorPrimitive>
    );
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      data-dashed={dashed ? "" : undefined}
      className={cn(
        "shrink-0 bg-border",
        dashed && "bg-transparent border-border",
        "data-horizontal:my-1 data-horizontal:h-px data-horizontal:w-full",
        "data-vertical:mx-1 data-vertical:w-px data-vertical:self-stretch",
        dashed && "data-horizontal:border-t data-vertical:border-l",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
