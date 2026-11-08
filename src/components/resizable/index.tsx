import { cn } from "../../lib/cn";
import * as ResizablePrimitive from "react-resizable-panels";

/**
 * react-resizable-panels structure with the Semi resizable handle spec:
 * - a 2px transparent handle that turns primary-light on hover, primary on
 *   drag / keyboard focus (spec row 43: "handle hover 主色")
 * - a round grip dot when `withHandle` is set
 * - an enlarged invisible hit area via the ::after pseudo element
 */
function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({ ...props }: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "relative flex bg-transparent outline-none transition-colors duration-100 select-none",
        "hover:bg-primary-light",
        "data-[resize-handle-state=drag]:bg-primary-light-hover",
        "data-[resize-handle-active=keyboard]:bg-primary focus-visible:bg-primary",
        "data-[panel-group-direction=horizontal]:h-full data-[panel-group-direction=horizontal]:w-0.5 data-[panel-group-direction=horizontal]:cursor-col-resize",
        "data-[panel-group-direction=vertical]:h-0.5 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:cursor-row-resize",
        "after:absolute after:content-['']",
        "data-[panel-group-direction=horizontal]:after:inset-y-0 data-[panel-group-direction=horizontal]:after:left-1/2 data-[panel-group-direction=horizontal]:after:w-1.5 data-[panel-group-direction=horizontal]:after:-translate-x-1/2",
        "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:h-1.5 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div
          data-slot="resizable-handle-grip"
          className="z-10 size-2 shrink-0 rounded-full bg-border-strong"
        />
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
