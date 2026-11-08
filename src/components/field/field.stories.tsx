import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "./index";

const meta = {
  title: "Components/Field",
  component: Field,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <input
        id="username"
        className="h-8 rounded-sm bg-muted px-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-primary-light-active"
      />
    </Field>
  ),
};

export const WithDescriptionAndError: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="email" required>
        Email
      </FieldLabel>
      <input
        id="email"
        className="h-8 rounded-sm bg-destructive-light px-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-destructive-light-active"
        aria-invalid
      />
      <FieldDescription>We only use this for account notices.</FieldDescription>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
      <input
        id="nickname"
        className="h-8 flex-1 rounded-sm bg-muted px-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-primary-light-active"
      />
    </Field>
  ),
};

export const Grouped: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="first">First name</FieldLabel>
        <input
          id="first"
          className="h-8 rounded-sm bg-muted px-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-primary-light-active"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="last">Last name</FieldLabel>
        <input
          id="last"
          className="h-8 rounded-sm bg-muted px-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-primary-light-active"
        />
        <FieldDescription>As shown on your ID.</FieldDescription>
      </Field>
    </FieldGroup>
  ),
};
