import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./index";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion defaultValue={["a"]} className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>What is Semi Design?</AccordionTrigger>
        <AccordionContent>
          Semi Design is a design system for building modern applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>How do I customize tokens?</AccordionTrigger>
        <AccordionContent>Override the --semi-* CSS variables on your root.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger disabled>Disabled section</AccordionTrigger>
        <AccordionContent>Not reachable.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion defaultValue={["a", "b"]} className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>First content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>Second content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
