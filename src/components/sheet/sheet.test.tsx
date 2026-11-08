import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./index";

function renderSheet(side?: "top" | "right" | "bottom" | "left") {
  return render(
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Side sheet</SheetTitle>
          <SheetDescription>Panel description</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Dismiss</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>,
  );
}

const sideClasses = {
  top: [
    "inset-x-0",
    "top-0",
    "w-full",
    "data-open:slide-in-from-top",
    "data-closed:slide-out-to-top",
  ],
  bottom: [
    "inset-x-0",
    "bottom-0",
    "w-full",
    "data-open:slide-in-from-bottom",
    "data-closed:slide-out-to-bottom",
  ],
  left: [
    "inset-y-0",
    "left-0",
    "h-full",
    "w-[448px]",
    "data-open:slide-in-from-left",
    "data-closed:slide-out-to-left",
  ],
} as const;

describe("Sheet", () => {
  it("renders trigger and stays closed", () => {
    renderSheet();
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
      "data-slot",
      "sheet-trigger",
    );
    expect(screen.queryByText("Side sheet")).not.toBeInTheDocument();
  });

  it("opens on trigger click with Semi SideSheet styles", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open" }));
    const title = await screen.findByText("Side sheet");
    const popup = title.closest("[data-slot='sheet-content']");
    expect(popup).toHaveClass("bg-dialog", "shadow-elevated", "w-[448px]");
    expect(popup).toHaveAttribute("data-side", "right");
    expect(popup).toHaveClass("data-open:slide-in-from-right");
  });

  it("applies the slide classes for the other sides", async () => {
    const user = userEvent.setup();
    for (const side of ["top", "bottom", "left"] as const) {
      const { unmount } = renderSheet(side);
      await user.click(screen.getByRole("button", { name: "Open" }));
      const popup = (await screen.findByText("Side sheet")).closest(
        "[data-slot='sheet-content']",
      );
      expect(popup).toHaveAttribute("data-side", side);
      expect(popup).toHaveClass(...sideClasses[side]);
      unmount();
    }
  });

  it("renders header and footer with Semi paddings and title typography", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open" }));
    const title = await screen.findByText("Side sheet");
    expect(title).toHaveClass("text-lg", "font-semibold");
    expect(title.closest("[data-slot='sheet-header']")).toHaveClass("p-6", "pb-5");
    expect(screen.getByText("Panel description")).toHaveClass("text-text-2");
    expect(
      screen.getByText("Dismiss").closest("[data-slot='sheet-footer']"),
    ).toHaveClass("p-6");
  });

  it("closes via the corner close button", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open" }));
    const close = await screen.findByRole("button", { name: "Close" });
    expect(close).toHaveAttribute("data-slot", "sheet-close");
    await user.click(close);
    await new Promise((r) => setTimeout(r, 300));
    expect(screen.queryByText("Side sheet")).not.toBeInTheDocument();
  });

  it("renders the overlay mask with the Semi overlay color", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByText("Side sheet");
    const overlay = document.querySelector("[data-slot='sheet-overlay']");
    expect(overlay).toHaveClass("bg-overlay", "fixed", "inset-0");
  });
});
