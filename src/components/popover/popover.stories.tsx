import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./index";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Confirm action</PopoverTitle>
          <PopoverDescription>
            This will apply the change to every item in the current workspace.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Plain content</Button>} />
      <PopoverContent>
        <PopoverDescription>
          A lightweight card without the title divider.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">No arrow</Button>} />
      <PopoverContent showArrow={false}>
        <PopoverHeader>
          <PopoverTitle>Detached card</PopoverTitle>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};
