import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./index";

describe("DropdownMenu", () => {
  it("renders trigger and stays closed", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
      "data-slot",
      "dropdown-menu-trigger",
    );
    expect(screen.queryByText("Item")).not.toBeInTheDocument();
  });

  it("opens the menu with Semi popup styles", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Semi item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const item = await screen.findByText("Semi item");
    const popup = item.closest("[data-slot='dropdown-menu-content']");
    expect(popup).toHaveClass("bg-popover", "rounded-xl", "shadow-elevated", "py-1");
    expect(item).toHaveClass("px-4", "py-2", "text-sm");
  });

  it("selects an item via onClick and closes", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onClick}>Pick me</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(await screen.findByText("Pick me"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders destructive variant with danger color", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const item = await screen.findByText("Delete");
    expect(item).toHaveAttribute("data-variant", "destructive");
    expect(item).toHaveClass("data-[variant=destructive]:text-destructive");
  });

  it("renders checkbox item with bold checked state", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Checked</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const item = (await screen.findByText("Checked")).closest(
      "[data-slot='dropdown-menu-checkbox-item']",
    );
    expect(item).toHaveAttribute("data-checked");
    expect(item).toHaveClass("data-checked:font-semibold");
  });

  it("renders radio group with selection", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="a">
            <DropdownMenuRadioItem value="a">Alpha</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">Beta</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const alpha = await screen.findByText("Alpha");
    expect(alpha.closest("[data-slot='dropdown-menu-radio-item']")).toHaveAttribute(
      "data-checked",
    );
  });

  it("renders label, separator and shortcut inside the popup", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group title</DropdownMenuLabel>
            <DropdownMenuItem>
              Copy
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Paste</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const label = await screen.findByText("Group title");
    expect(label).toHaveClass("text-text-2");
    expect(await screen.findByText("⌘C")).toHaveClass("text-text-2");
    expect(
      document.querySelector("[data-slot='dropdown-menu-separator']"),
    ).toHaveClass("h-px", "bg-border");
  });

  it("shows disabled items with disabled text color", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>Off</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const item = await screen.findByText("Off");
    expect(item).toHaveClass("data-disabled:text-disabled-foreground");
  });
});
