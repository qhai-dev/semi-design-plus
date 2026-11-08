import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./index";

describe("Menubar", () => {
  it("renders", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
  });
});
