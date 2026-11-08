import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
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
import { Button } from "../button";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open modal</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move to trash?</DialogTitle>
          <DialogDescription>
            Deleted items will stay in the trash for 30 days before being permanently
            removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose render={<Button>Confirm</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["small", "medium", "large", "full"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline">{size}</Button>} />
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size} modal</DialogTitle>
              <DialogDescription>
                {size === "small" && "448px"}
                {size === "medium" && "684px"}
                {size === "large" && "920px"}
                {size === "full" && "calc(100vw - 64px)"}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button>Confirm</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Custom close</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button>Got it</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const InteractiveConfirm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open delete</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm deletion</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose render={<Button variant="destructive">Delete</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async () => {
    await userEvent.click(within(document.body).getByRole("button", { name: "Open delete" }));
    const title = await within(document.body).findByText("Confirm deletion");
    expect(title).toBeInTheDocument();
    await userEvent.click(within(document.body).getByRole("button", { name: "Delete", hidden: true }));
    await new Promise((r) => setTimeout(r, 400));
    expect(within(document.body).queryByText("Confirm deletion")).not.toBeInTheDocument();
  },
};
