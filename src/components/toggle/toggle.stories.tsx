import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Pin, Underline } from "lucide-react";
import { within, expect, fn, userEvent } from "storybook/test";
import { Toggle } from "./index";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Toggle" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle aria-label="bold">
        <Bold aria-hidden /> Borderless
      </Toggle>
      <Toggle variant="outline" aria-label="underline">
        <Underline aria-hidden /> Outline
      </Toggle>
    </div>
  ),
};

export const Pressed: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle defaultPressed aria-label="bold">
        <Bold aria-hidden />
      </Toggle>
      <Toggle defaultPressed variant="outline" aria-label="italic">
        <Italic aria-hidden />
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="small">
        <Pin aria-hidden /> Small 24
      </Toggle>
      <Toggle aria-label="default">
        <Pin aria-hidden /> Default 32
      </Toggle>
      <Toggle size="lg" aria-label="large">
        <Pin aria-hidden /> Large 40
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle disabled>Bold</Toggle>
      <Toggle variant="outline" disabled>
        Outline
      </Toggle>
    </div>
  ),
};

export const InteractivePress: Story = {
  args: { "aria-label": "pin", onPressedChange: fn() },
  play: async ({ args }) => {
    const t = within(document.body).getByRole("button", { name: "pin" });
    await userEvent.click(t);
    await expect(t).toHaveAttribute("aria-pressed", "true");
    await expect(args.onPressedChange).toHaveBeenCalledOnce();
    await userEvent.click(t);
    await expect(t).toHaveAttribute("aria-pressed", "false");
  },
};
