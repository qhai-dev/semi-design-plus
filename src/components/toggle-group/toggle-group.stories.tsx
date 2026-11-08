import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { within, expect, fn, userEvent } from "storybook/test";
import { ToggleGroup, ToggleGroupItem } from "./index";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={["left"]} aria-label="alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup defaultValue={["bold"]} aria-label="borderless">
        <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold aria-hidden /> Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic aria-hidden /> Italic
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline aria-hidden /> Underline
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="outline" defaultValue={["bold"]} aria-label="outline">
        <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold aria-hidden /> Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic aria-hidden /> Italic
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline aria-hidden /> Underline
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={["bold", "underline"]} aria-label="styles">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Joined: Story = {
  render: () => (
    <ToggleGroup variant="outline" spacing={0} defaultValue={["center"]} aria-label="joined">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" defaultValue={["top"]} aria-label="vertical">
      <ToggleGroupItem value="top">Top</ToggleGroupItem>
      <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
      <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const InteractiveSingle: Story = {
  args: { "aria-label": "interactive" },
  play: async () => {
    const a = within(document.body).getByRole("button", { name: "A" });
    const b = within(document.body).getByRole("button", { name: "B" });
    await userEvent.click(a);
    await expect(a).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(b);
    await expect(b).toHaveAttribute("aria-pressed", "true");
    await expect(a).toHaveAttribute("aria-pressed", "false");
  },
  render: () => (
    <ToggleGroup aria-label="interactive">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithCallback: Story = {
  args: { onValueChange: fn() },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ args }) => {
    await userEvent.click(within(document.body).getByRole("button", { name: "A" }));
    await expect(args.onValueChange).toHaveBeenCalledOnce();
  },
};
