import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, ChevronRight, Inbox, LayoutDashboard, Search, Settings } from "lucide-react";
import { within, expect, userEvent } from "storybook/test";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "./index";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-foreground">
          Semi Design Plus
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <LayoutDashboard aria-hidden />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Inbox aria-hidden />
                  <span>Inbox</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>12</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Calendar aria-hidden />
                  <span>Calendar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Expand projects">
            <ChevronRight aria-hidden />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton variant="outline">
                  <Search aria-hidden />
                  <span>Search projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings aria-hidden />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <DemoSidebar />
      <SidebarTrigger />
      <SidebarInset>
        <div className="p-6 text-sm text-text-2">Page content next to the navigation.</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const Floating: Story = {
  render: () => (
    <SidebarProvider>
      <DemoSidebarWrapper variant="floating" />
      <SidebarTrigger />
      <SidebarInset>Page</SidebarInset>
    </SidebarProvider>
  ),
};

export const Inset: Story = {
  render: () => (
    <SidebarProvider>
      <DemoSidebarWrapper variant="inset" />
      <SidebarTrigger />
      <SidebarInset>Page</SidebarInset>
    </SidebarProvider>
  ),
};

export const RightSide: Story = {
  render: () => (
    <SidebarProvider>
      <DemoSidebarWrapper side="right" />
      <SidebarTrigger />
      <SidebarInset>Page</SidebarInset>
    </SidebarProvider>
  ),
};

function DemoSidebarWrapper({
  side,
  variant,
}: {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
}) {
  return (
    <Sidebar side={side} variant={variant}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <LayoutDashboard aria-hidden />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export const CollapseToggle: Story = {
  render: () => (
    <SidebarProvider>
      <DemoSidebar />
      <SidebarTrigger />
      <SidebarInset>Page</SidebarInset>
    </SidebarProvider>
  ),
  play: async () => {
    const sidebar = document.querySelector("[data-slot='sidebar']");
    expect(sidebar).toHaveAttribute("data-state", "expanded");
    const [trigger1] = within(document.body).getAllByRole("button", { name: "Toggle Sidebar" });
    await userEvent.click(trigger1);
    expect(sidebar).toHaveAttribute("data-state", "collapsed");
    const [trigger2] = within(document.body).getAllByRole("button", { name: "Toggle Sidebar" });
    await userEvent.click(trigger2);
    expect(sidebar).toHaveAttribute("data-state", "expanded");
  },
};
