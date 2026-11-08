import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./index";

function renderAlertDialog() {
  return render(
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Move to trash?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  );
}

describe("AlertDialog", () => {
  it("renders trigger and stays closed", () => {
    renderAlertDialog();
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAttribute(
      "data-slot",
      "alert-dialog-trigger",
    );
    expect(screen.queryByText("Move to trash?")).not.toBeInTheDocument();
  });

  it("opens with the alertdialog role and Semi modal styles", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    const title = await screen.findByText("Move to trash?");
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    const popup = title.closest("[data-slot='alert-dialog-content']");
    expect(popup).toHaveClass(
      "bg-dialog",
      "rounded-3xl",
      "shadow-elevated",
      "p-6",
      "sm:max-w-[448px]",
    );
    expect(title).toHaveClass("text-sm", "font-semibold");
  });

  it("has no corner close button", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByText("Move to trash?");
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("closes via Cancel and keeps the dialog open for Action", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Move to trash?</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByText("Move to trash?");
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await new Promise((r) => setTimeout(r, 300));
    expect(screen.queryByText("Move to trash?")).not.toBeInTheDocument();
    expect(onDelete).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByText("Move to trash?");
    const dialogDeleteButton = screen
      .getAllByRole("button", { name: "Delete" })
      .find((button) => button.dataset.slot === "alert-dialog-action");
    await user.click(dialogDeleteButton!);
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("renders Cancel as outline and Action as solid destructive (Semi danger confirm)", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByText("Move to trash?");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "border",
      "border-border",
    );
    const action = screen
      .getAllByRole("button", { name: "Delete" })
      .find((button) => button.dataset.slot === "alert-dialog-action");
    expect(action).toHaveClass("bg-destructive", "text-white");
  });

  it("supports a semantic media icon above the title", async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="text-destructive">
              <svg aria-hidden />
            </AlertDialogMedia>
            <AlertDialogTitle>Permanently delete?</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    const media = await screen.findByText("Permanently delete?");
    expect(
      media.closest("[data-slot='alert-dialog-header']")?.querySelector(
        "[data-slot='alert-dialog-media']",
      ),
    ).toHaveClass("size-6");
  });
});
