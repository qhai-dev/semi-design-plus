import * as React from "react";
import * as LucideIcons from "lucide-react";

/**
 * Stand-in for the registry's icon placeholder: renders the requested lucide
 * icon by name. Kept as the single icon surface so components stay
 * icon-library-agnostic (the site version swapped lucide/tabler/... at runtime;
 * the alternate library names are accepted and ignored).
 */
function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  remixicon,
  className,
  ...props
}: React.ComponentProps<"svg"> & {
  lucide?: string;
  tabler?: string;
  hugeicons?: string;
  phosphor?: string;
  remixicon?: string;
}) {
  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  >;
  const Component = icons[lucide || "SquareIcon"] ?? icons.SquareIcon;
  return <Component className={className} {...props} />;
}

export { IconPlaceholder };
