import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./index";

const meta = {
  title: "Components/Menubar",
};

export default meta;

export const Default = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
