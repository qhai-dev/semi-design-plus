import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";
import { Marker, MarkerContent, MarkerIcon } from "./index";

const meta = {
  title: "Components/Marker",
  component: Marker,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Marker>
      <MarkerIcon />
      <MarkerContent>Divider</MarkerContent>
    </Marker>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Marker>
        <MarkerContent>Plain meta line</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <Info aria-hidden />
        </MarkerIcon>
        <MarkerContent>With an icon</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Between rules</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Bottom bordered</MarkerContent>
      </Marker>
    </div>
  ),
};
