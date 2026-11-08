import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../input";
import { Label } from "./index";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="default">Username</Label>
      <Input id="default" placeholder="Please enter" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="required" required>
        Email address
      </Label>
      <Input id="required" placeholder="name@example.com" />
    </div>
  ),
};

export const Optional: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="optional" optional>
        Nickname
      </Label>
      <Input id="optional" placeholder="Optional field" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="disabled" disabled>
        Company
      </Label>
      <Input id="disabled" placeholder="Disabled field" disabled />
    </div>
  ),
};
