import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
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
import { Button } from "../button";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button>Open drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Activity log</DrawerTitle>
          <DrawerDescription>
            The body scrolls freely — no header is rendered by the panel itself.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-1 flex-col gap-2 px-6 py-4 text-sm text-text-1">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="rounded-sm bg-muted px-3 py-2">
              Event #{i + 1}
            </div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Drawer key={side}>
          <DrawerTrigger render={<Button variant="outline">{side}</Button>} />
          <DrawerContent side={side}>
            <DrawerHeader>
              <DrawerTitle>{side} drawer</DrawerTitle>
              <DrawerDescription>Same panel spec as the side sheet.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Close</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const InteractiveOpenClose: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button>Open panel</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Plain panel</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button>Done</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async () => {
    await userEvent.click(within(document.body).getByRole("button", { name: "Open panel" }));
    const title = await within(document.body).findByText("Plain panel");
    expect(title).toBeInTheDocument();
    expect(title.closest("[data-slot='drawer-content']")).toHaveClass(
      "bg-dialog",
      "w-[448px]",
    );
    await userEvent.click(within(document.body).getByRole("button", { name: "Done" }));
    await new Promise((r) => setTimeout(r, 400));
    expect(within(document.body).queryByText("Plain panel")).not.toBeInTheDocument();
  },
};
