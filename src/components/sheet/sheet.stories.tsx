import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
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
import { Button } from "../button";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button>Open side sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Changes are applied immediately after saving.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
          <SheetClose render={<Button>Save changes</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline">{side}</Button>} />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{side} side sheet</SheetTitle>
              <SheetDescription>
                {side === "top" || side === "bottom"
                  ? "Full width, auto height."
                  : "448px wide, flush to the edge."}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose render={<Button variant="outline">Close</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open</Button>} />
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Custom close</SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button>Got it</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const InteractiveOpenClose: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button>Open panel</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Choose what you want to hear about.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button>Done</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async () => {
    await userEvent.click(within(document.body).getByRole("button", { name: "Open panel" }));
    const title = await within(document.body).findByText("Notifications");
    expect(title).toBeInTheDocument();
    expect(title.closest("[data-slot='sheet-content']")).toHaveClass(
      "bg-dialog",
      "w-[448px]",
    );
    await userEvent.click(within(document.body).getByRole("button", { name: "Close", hidden: true }));
    await new Promise((r) => setTimeout(r, 400));
    expect(within(document.body).queryByText("Notifications")).not.toBeInTheDocument();
  },
};
