import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { act } from "react";
import { Toaster, createToastManager, toast } from "./index";

describe("Toast", () => {
  it("renders the viewport", () => {
    render(<Toaster />);
    expect(document.querySelector("[data-slot='toast-viewport']")).toBeInTheDocument();
  });

  it("shows a toast via the manager with Semi styles", async () => {
    const manager = createToastManager();
    render(<Toaster toastManager={manager} />);
    act(() => {
      manager.add({
        title: "Changes saved",
        type: "success",
      });
    });
    await waitFor(() => {
      const title = screen.getByText("Changes saved");
      const root = title.closest("[data-slot='toast']");
      expect(root).toHaveClass("bg-popover", "shadow-elevated", "rounded-xl");
      expect(title).toHaveClass("text-foreground");
      expect(document.querySelector(".text-success")).not.toBeNull();
    });
  });

  it("exposes the toast helper bound to the default manager", () => {
    expect(typeof toast.add).toBe("function");
  });
});
