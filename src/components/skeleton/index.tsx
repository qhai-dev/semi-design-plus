import { cn } from "../../lib/cn";

/**
 * Semi Design skeleton spec: fill-0 blocks with a 3px radius and a pulsing
 * opacity animation.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-sm bg-muted animate-pulse", className)}
      {...props}
    />
  );
}

export { Skeleton };
