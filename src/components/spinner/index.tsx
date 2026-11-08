import { LoaderCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Semi Design spin spec: a primary-colored rotating arc, sizes 14 / 20 / 32px.
 */
const spinnerVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      sm: "size-3.5",
      default: "size-5",
      lg: "size-8",
    },
  },
  defaultVariants: { size: "default" },
});

function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
  return (
    <LoaderCircle
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };
