import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { CircleCheck, CircleX, Info, LoaderCircle, TriangleAlert } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheck aria-hidden className="size-4 text-success" />
        ),
        info: (
          <Info aria-hidden className="size-4 text-info" />
        ),
        warning: (
          <TriangleAlert aria-hidden className="size-4 text-warning" />
        ),
        error: (
          <CircleX aria-hidden className="size-4 text-destructive" />
        ),
        loading: (
          <LoaderCircle aria-hidden className="size-4 animate-spin text-primary" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "rounded-xl shadow-elevated",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
