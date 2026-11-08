import { render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./index";

function renderDialog(extra?: React.ReactNode) {
  return render(
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Semi dialog</DialogTitle>
          <DialogDescription>Description text</DialogDescription>
        </DialogHeader>
        {extra}
      </DialogContent>
    </Dialog>,
  );
}

describe("Dialog", () => {
  it("renders trigger and stays closed", () => {
    renderDialog();
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
      "data-slot",
      "dialog-trigger",
    );
    expect(screen.queryByText("Semi dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click with Semi modal styles", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: "Open" }));
    const content = await screen.findByText("Semi dialog");
    expect(content).toBeInTheDocument();
    const popup = content.closest("[data-slot='dialog-content']");
    expect(popup).toHaveClass(
      "bg-dialog",
      "rounded-3xl",
      "shadow-elevated",
      "sm:max-w-[448px]",
    );
  });

  it("shows a close button and closes via it", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: "Open" }));
    const close = await screen.findByRole("button", { name: "Close" });
    await user.click(close);
    await new Promise((r) => setTimeout(r, 300));
    expect(screen.queryByText("Semi dialog")).not.toBeInTheDocument();
  });

  it("renders footer actions and calls onOk", async () => {
    const user = userEvent.setup();
    const onOk = rstest.fn();
    renderDialog(
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button onClick={onOk}>OK</Button>
      </DialogFooter>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByText("Semi dialog");
    await user.click(screen.getByRole("button", { name: "OK" }));
    expect(onOk).toHaveBeenCalledOnce();
  });

  it("supports Semi sizes", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent size="large">
          <DialogTitle>Wide</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const popup = (await screen.findByText("Wide")).closest(
      "[data-slot='dialog-content']",
    );
    expect(popup).toHaveClass("sm:max-w-[920px]");
  });

  it("hides the close button on request", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogTitle>No close</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByText("No close");
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
