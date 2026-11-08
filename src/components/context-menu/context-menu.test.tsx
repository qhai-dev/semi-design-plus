import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "./index";

describe("ContextMenu", () => {
  it("renders", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger className="p-4">Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
  });
});
