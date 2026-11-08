import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./index";

function renderSidebar() {
  return render(
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Active item</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Plain item</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarTrigger />
      <SidebarInset>Page</SidebarInset>
    </SidebarProvider>,
  );
}

describe("Sidebar", () => {
  it("renders the 240px navigation with the Semi nav background", () => {
    renderSidebar();
    const wrapper = document.querySelector<HTMLElement>("[data-slot='sidebar-wrapper']");
    expect(wrapper).not.toBeNull();
    expect(wrapper?.style.getPropertyValue("--sidebar-width")).toBe("15rem");
    // jsdom renders the desktop (non-mobile) branch
    const inner = document.querySelector<HTMLElement>("[data-slot='sidebar-inner']");
    expect(inner).toHaveClass("bg-sidebar", "px-2");
    const container = document.querySelector<HTMLElement>("[data-slot='sidebar-container']");
    expect(container).toHaveClass("w-(--sidebar-width)");
  });

  it("styles menu items per the Semi navigation spec (36px, 3px radius, fill-0 hover)", () => {
    renderSidebar();
    const plain = screen.getByRole("button", { name: "Plain item" });
    expect(plain).toHaveAttribute("data-slot", "sidebar-menu-button");
    expect(plain).toHaveClass("h-9", "rounded-sm", "px-2", "gap-3");
    expect(plain).toHaveClass("hover:bg-muted", "hover:text-foreground");
    expect(plain).toHaveClass("active:bg-muted-hover");
    expect(plain).not.toHaveAttribute("data-active");
  });

  it("marks the active item with data-active and the primary-light selection", () => {
    renderSidebar();
    const active = screen.getByRole("button", { name: "Active item" });
    expect(active).toHaveAttribute("data-active");
    expect(active).toHaveClass(
      "data-active:bg-primary-light",
      "data-active:text-primary",
      "bg-primary-light",
      "text-primary",
    );
    expect(active).not.toHaveClass("hover:bg-muted");
  });

  it("styles the group label as small semibold secondary text", () => {
    renderSidebar();
    const label = screen.getByText("Platform");
    expect(label).toHaveAttribute("data-slot", "sidebar-group-label");
    expect(label).toHaveClass("text-xs", "font-semibold", "text-text-2", "rounded-sm");
  });

  it("toggles the collapsed state from the trigger and the rail", async () => {
    const user = userEvent.setup();
    renderSidebar();
    const sidebar = document.querySelector<HTMLElement>("[data-slot='sidebar']");
    const trigger = document.querySelector<HTMLElement>("[data-slot='sidebar-trigger']");
    const rail = document.querySelector<HTMLElement>("[data-slot='sidebar-rail']");
    expect(trigger).toHaveTextContent("Toggle Sidebar");
    expect(rail).toHaveAttribute("title", "Toggle Sidebar");
    expect(sidebar).toHaveAttribute("data-state", "expanded");
    await user.click(trigger!);
    expect(sidebar).toHaveAttribute("data-state", "collapsed");
    await user.click(rail!);
    expect(sidebar).toHaveAttribute("data-state", "expanded");
  });

  it("invokes onClick handlers passed to the trigger", async () => {
    const user = userEvent.setup();
    const onClick = rstest.fn();
    render(
      <SidebarProvider>
        <SidebarTrigger onClick={onClick} />
      </SidebarProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Toggle Sidebar" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
