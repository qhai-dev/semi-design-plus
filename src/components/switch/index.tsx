import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "../../lib/cn";

/**
 * shadcn Switch API rendered with the Semi Design switch spec
 * (semi-foundation/switch/switch.scss + variables.scss, checked color per
 * docs/spec.md: primary blue, NOT the Semi default success green):
 * - track 40x24px (small 26x16px), fully rounded, 200ms ease transitions
 * - unchecked: fill-0 track deepening to fill-1 on hover / fill-2 on active
 * - checked: bg-primary, hover primary-hover, active primary-active
 * - knob: white 18px circle with the Semi knob shadow
 *   `0 4px 6px rgba(0,0,0,.1), 0 0 1px rgba(0,0,0,.3)`, translateX 2px -> 18px
 * - disabled: transparent track + --semi-color-border, knob loses its shadow
 *   and gains a border; checked+disabled keeps --semi-color-primary-disabled
 */

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  /** Semi sizes: default 40x24, sm 26x16. */
  size?: "sm" | "default";
}

export function Switch({
  className,
  size = "default",
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent outline-none transition-colors duration-200 ease-in-out",
        // Semi control sizes: 40x24 (default) / 26x16 (sm)
        "data-[size=default]:h-6 data-[size=default]:w-10 data-[size=sm]:h-4 data-[size=sm]:w-[26px]",
        // unchecked: fill-0 -> hover fill-1 -> active fill-2
        "data-unchecked:bg-muted",
        "hover:data-unchecked:bg-muted-hover active:data-unchecked:bg-muted-active",
        // checked: primary blue per docs/spec.md (not the Semi success green)
        "data-checked:bg-primary",
        "hover:data-checked:bg-primary-hover active:data-checked:bg-primary-active",
        // disabled: transparent track + --semi-color-border, no hover/active
        "data-disabled:cursor-not-allowed",
        "data-disabled:data-unchecked:bg-transparent data-disabled:data-unchecked:border-border data-disabled:data-unchecked:hover:bg-transparent data-disabled:data-unchecked:active:bg-transparent",
        // disabled + checked: primary-disabled track
        "data-disabled:data-checked:border-transparent data-disabled:data-checked:bg-primary-disabled data-disabled:data-checked:hover:bg-primary-disabled",
        // Semi switch focus outline: 2px primary-light-active
        "focus-visible:outline-2 focus-visible:outline-primary-light-active",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white transition-transform duration-200 ease-in-out",
          // Semi knob shadow (shadow-knob)
          "shadow-[0_4px_6px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.3)]",
          // knob travel: 2px -> 18px (default) / 1px -> 11px (sm)
          "group-data-[size=default]/switch:data-unchecked:translate-x-[2px] group-data-[size=default]/switch:data-checked:translate-x-[18px]",
          "group-data-[size=sm]/switch:data-unchecked:translate-x-[1px] group-data-[size=sm]/switch:data-checked:translate-x-[11px]",
          // knob sizes: 18px (default) / 12px (sm)
          "group-data-[size=default]/switch:size-[18px] group-data-[size=sm]/switch:size-3",
          // disabled knob: no shadow; unchecked adds a --semi-color-border ring
          "data-disabled:shadow-none data-disabled:data-unchecked:border data-disabled:data-unchecked:border-border",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
