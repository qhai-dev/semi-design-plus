import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./index";

describe("NavigationMenu", () => {
  it("renders the bar structure with Semi item styles", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    const root = document.querySelector("[data-slot='navigation-menu']");
    expect(root).not.toBeNull();
    expect(document.querySelector("[data-slot='navigation-menu-list']")).toHaveClass(
      "flex",
      "items-center",
      "gap-2",
    );
    const link = screen.getByText("Docs");
    expect(link).toHaveAttribute("data-slot", "navigation-menu-link");
    // Semi horizontal nav item: 32px tall pill, 3px radius, 14px regular text-0
    expect(link).toHaveClass("h-8", "px-4", "rounded-sm", "text-sm", "text-foreground");
    expect(link).toHaveClass("hover:bg-muted");
  });

  it("marks the active link with the Semi selected style", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#home">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#docs" active>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    const active = screen.getByText("Docs");
    expect(active).toHaveAttribute("data-active");
    expect(active).toHaveClass("data-active:bg-primary-light", "data-active:text-primary");
    expect(screen.getByText("Home")).not.toHaveAttribute("data-active");
  });

  it("opens the popup with the Semi dropdown surface styles", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#button">Button</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    await user.click(screen.getByRole("button", { name: /components/i }));
    const link = await screen.findByText("Button");
    // content -> viewport -> popup
    const popup = link.closest("[data-slot='navigation-menu-content']")?.parentElement
      ?.parentElement;
    // Semi dropdown surface: bg-3, 6px radius, elevated shadow
    expect(popup).toHaveClass("bg-popover", "rounded-xl", "shadow-elevated");
  });

  it("exposes the trigger style helper with Semi nav item classes", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(navigationMenuTriggerStyle()).toContain("h-8");
    expect(navigationMenuTriggerStyle()).toContain("hover:bg-muted");
    const trigger = screen.getByRole("button", { name: /menu/i });
    expect(trigger).toHaveAttribute("data-slot", "navigation-menu-trigger");
    expect(trigger).toHaveClass("rounded-sm", "px-4");
  });

  it("lets consumer className override built-ins", () => {
    render(
      <NavigationMenu className="flex-1 max-w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#a" className="h-10">
              Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    const root = document.querySelector("[data-slot='navigation-menu']");
    expect(root).toHaveClass("max-w-full");
    expect(screen.getByText("Link")).toHaveClass("h-10");
    expect(screen.getByText("Link")).not.toHaveClass("h-8");
  });
});
