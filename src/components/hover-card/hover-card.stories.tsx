import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent, waitFor } from "storybook/test";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";
import { Button } from "../button";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link">@semi_design</Button>} />
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-foreground">Semi Design</div>
          <div className="text-sm text-text-2">
            A design system from DouyinFE, mapped 1:1 onto Tailwind tokens.
          </div>
          <div className="text-xs text-text-3">Joined March 2020</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger render={<Button variant="outline">{side}</Button>} />
          <HoverCardContent side={side}>
            <div className="text-sm text-foreground">Hover card on the {side} side.</div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

export const InteractiveHover: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link">Hover for details</Button>} />
      <HoverCardContent>
        <div className="text-sm text-foreground">Rich preview content.</div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async () => {
    const trigger = within(document.body).getByRole("button", { name: "Hover for details" });
    await userEvent.hover(trigger);
    // Base UI opens on the pointer event sequence (over → enter → move);
    // testing-library userEvent.hover only dispatches over/enter.
    const pointerOpts = { bubbles: true, pointerType: "mouse", pointerId: 1, isPrimary: true };
    trigger.dispatchEvent(new PointerEvent("pointerenter", pointerOpts));
    trigger.dispatchEvent(new MouseEvent("mouseenter", pointerOpts));
    trigger.dispatchEvent(new PointerEvent("pointermove", pointerOpts));
    const content = await waitFor(() => within(document.body).getByText("Rich preview content."));
    expect(content.closest("[data-slot='hover-card-content']")).toHaveClass(
      "bg-popover",
      "rounded-xl",
      "shadow-elevated",
    );
    await userEvent.unhover(trigger);
    await new Promise((r) => setTimeout(r, 400));
    expect(within(document.body).queryByText("Rich preview content.")).not.toBeInTheDocument();
  },
};
