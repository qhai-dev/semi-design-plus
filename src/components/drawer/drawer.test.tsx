import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

function renderDrawer(side?: "top" | "right" | "bottom" | "left") {
  return render(
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Scrollable body</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>,
  );
}

describe("Drawer", () => {
  it("renders trigger and stays closed", () => {
    renderDrawer();
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
      "data-slot",
      "drawer-trigger",
    );
    expect(screen.queryByText("Drawer")).not.toBeInTheDocument();
  });

  it("opens on click with the Semi SideSheet panel styles", async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByRole("button", { name: "Open" }));
    const title = await screen.findByText("Drawer");
    const popup = title.closest("[data-slot='drawer-content']");
    expect(popup).toHaveClass(
      "bg-dialog",
      "shadow-elevated",
      "overflow-y-auto",
      "w-[448px]",
    );
    expect(popup).toHaveAttribute("data-side", "right");
    expect(title).toHaveClass("text-lg", "font-semibold");
  });

  it("supports the other sides with slide classes", async () => {
    const user = userEvent.setup();
    renderDrawer("bottom");
    await user.click(screen.getByRole("button", { name: "Open" }));
    const popup = (await screen.findByText("Drawer")).closest(
      "[data-slot='drawer-content']",
    );
    expect(popup).toHaveAttribute("data-side", "bottom");
    expect(popup).toHaveClass(
      "inset-x-0",
      "bottom-0",
      "w-full",
      "data-open:slide-in-from-bottom",
      "data-closed:slide-out-to-bottom",
    );
  });

  it("closes via the DrawerClose button", async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByText("Drawer");
    await user.click(screen.getByRole("button", { name: "Close" }));
    await new Promise((r) => setTimeout(r, 300));
    expect(screen.queryByText("Drawer")).not.toBeInTheDocument();
  });

  it("renders the overlay mask", async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByText("Drawer");
    const overlay = document.querySelector("[data-slot='drawer-overlay']");
    expect(overlay).toHaveClass("bg-overlay", "fixed", "inset-0");
  });
});
