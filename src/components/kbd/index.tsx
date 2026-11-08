import { cn } from "../../lib/cn";

/**
 * Keyboard key chip (no direct Semi counterpart, Semi border style):
 * - fill-0 background, 1px border in --semi-color-border
 * - 3px radius, 24px height / 24px min width, 1.5 horizontal padding
 * - 12px monospace text in text-0
 * - a 2px bottom border reads as the deeper bottom edge of a physical key
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-6 min-w-6 cursor-default select-none items-center justify-center gap-1 rounded-sm border border-border border-b-2 bg-muted px-1.5 font-mono text-xs leading-4 text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** Renders a combination of keys (Ctrl + K) with a 4px gap. */
function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
