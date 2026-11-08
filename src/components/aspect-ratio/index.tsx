import { cn } from "../../lib/cn";

/**
 * Responsive ratio container (no Semi counterpart; kept neutral).
 * The ratio is passed as a CSS variable so `aspect-(--ratio)` applies it,
 * and consumer className can override everything.
 */
function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  );
}

export { AspectRatio };
