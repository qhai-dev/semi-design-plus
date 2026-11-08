import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "./index";

const meta = {
  title: "Components/ContextMenu",
};

export default meta;

export const Default = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="p-4">Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
