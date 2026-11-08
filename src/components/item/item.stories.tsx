import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRight, FileText, Settings } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./index";

const meta = {
  title: "Components/Item",
  component: Item,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-150">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item>
      <ItemMedia variant="icon">
        <Settings aria-hidden />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Account settings</ItemTitle>
        <ItemDescription>Manage your profile, email and preferences.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRight aria-hidden className="size-4 text-text-2" />
      </ItemActions>
    </Item>
  ),
};

export const Group: Story = {
  render: () => (
    <ItemGroup>
      <Item>
        <ItemMedia variant="icon">
          <FileText aria-hidden />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Semi Design spec.pdf</ItemTitle>
          <ItemDescription>Updated 2 hours ago</ItemDescription>
        </ItemContent>
        <ItemActions>12 MB</ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <FileText aria-hidden />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Quarterly report.docx</ItemTitle>
          <ItemDescription>Updated yesterday</ItemDescription>
        </ItemContent>
        <ItemActions>4 MB</ItemActions>
      </Item>
    </ItemGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Item>Default (bordered card row)</Item>
      <Item variant="outline">Outline (transparent surface)</Item>
      <Item variant="muted">Muted (fill background)</Item>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Small row</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="default">
        <ItemContent>
          <ItemTitle>Default row</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  ),
};

export const WithHeaderFooter: Story = {
  render: () => (
    <Item>
      <ItemHeader>
        <ItemTitle>Design review</ItemTitle>
        <span className="text-sm text-text-2">10:00</span>
      </ItemHeader>
      <ItemDescription>Weekly sync on the component library roadmap.</ItemDescription>
      <ItemFooter>
        <ItemActions>
          <button type="button" className="text-sm text-primary">
            Join
          </button>
        </ItemActions>
      </ItemFooter>
    </Item>
  ),
};
