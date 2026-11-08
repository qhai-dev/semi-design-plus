import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./index";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert>
        <Info aria-hidden />
        <AlertTitle>Info banner</AlertTitle>
        <AlertDescription>A new version is available.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck aria-hidden />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlert aria-hidden />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your trial expires in 3 days.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlert aria-hidden />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to sync. Please retry.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Minimal banner without description</AlertTitle>
    </Alert>
  ),
};
