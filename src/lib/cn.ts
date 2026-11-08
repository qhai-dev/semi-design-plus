import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind conflict resolution.
 * Unlike plain concatenation, consumer-supplied utilities
 * (e.g. `h-10`) properly override the component's built-ins (`h-8`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
