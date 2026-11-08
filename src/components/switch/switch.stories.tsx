import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, fn, userEvent } from "storybook/test";
import { Switch } from "./index";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { "aria-label": "toggle" },
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch aria-label="off" />
      <Switch defaultChecked aria-label="on" />
      <Switch disabled aria-label="disabled" />
      <Switch disabled defaultChecked aria-label="disabled on" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" defaultChecked aria-label="small on" />
      <Switch size="sm" aria-label="small off" />
      <Switch defaultChecked aria-label="default on" />
      <Switch aria-label="default off" />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm">
        <Switch defaultChecked /> Notifications
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Switch size="sm" /> Compact mode
      </label>
    </div>
  ),
};

export const InteractiveToggle: Story = {
  args: { "aria-label": "interactive", onCheckedChange: fn() },
  play: async ({ args }) => {
    const sw = within(document.body).getByRole("switch", { name: "interactive" });
    await userEvent.click(sw);
    await expect(sw).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledOnce();
    await userEvent.click(sw);
    await expect(sw).not.toBeChecked();
  },
};
