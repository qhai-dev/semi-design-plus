import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoTabs({ variant }: { variant: "line" | "button" | "card" }) {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant={variant}>
        <TabsTrigger value="overview" variant={variant}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" variant={variant}>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings" variant={variant} disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview panel content.</TabsContent>
      <TabsContent value="analytics">Analytics panel content.</TabsContent>
      <TabsContent value="settings">Settings panel content.</TabsContent>
    </Tabs>
  );
}

export const Line: Story = {
  render: () => <DemoTabs variant="line" />,
};

export const Button: Story = {
  render: () => <DemoTabs variant="button" />,
};

export const Card: Story = {
  render: () => <DemoTabs variant="card" />,
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="a" orientation="vertical" className="min-h-40">
      <TabsList variant="line">
        <TabsTrigger value="a">First</TabsTrigger>
        <TabsTrigger value="b">Second</TabsTrigger>
      </TabsList>
      <TabsContent value="a">First vertical panel.</TabsContent>
      <TabsContent value="b">Second vertical panel.</TabsContent>
    </Tabs>
  ),
};
