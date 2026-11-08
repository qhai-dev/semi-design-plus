import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import { AtSign, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./index";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <AtSign aria-hidden />
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon align="inline-end">.com</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Amount" type="text" inputMode="decimal" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>RMB</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Search docs" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Search">
          <Search aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Leave a comment" />
      <InputGroupAddon align="block-end">
        <InputGroupText>Markdown supported</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <AtSign aria-hidden />
      </InputGroupAddon>
      <InputGroupInput placeholder="Disabled" disabled />
    </InputGroup>
  ),
};

export const InteractiveFocus: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start" aria-label="Mention">
        <AtSign aria-hidden />
      </InputGroupAddon>
      <InputGroupInput placeholder="Click the addon" />
    </InputGroup>
  ),
  play: async () => {
    const input = within(document.body).getByPlaceholderText("Click the addon");
    // clicking the addon focuses the group input
    await userEvent.click(within(document.body).getByRole("group", { name: "Mention" }));
    await expect(input).toHaveFocus();
  },
};
