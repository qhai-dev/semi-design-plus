import type { Meta, StoryObj } from "@storybook/react-vite";

import { within, expect, userEvent } from "storybook/test";

import { TextArea } from "./index";

const meta = {
    title: "Components/Textarea",
    component: TextArea,
    parameters: { layout: "centered" },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { placeholder: "Please enter" },
};

export const States: Story = {
    render: () => (
        <div className="flex w-80 flex-col gap-3">
            <TextArea placeholder="Default" />
            <TextArea
                validateStatus="error"
                placeholder="Error"
                defaultValue="Invalid value"
            />
            <TextArea validateStatus="warning" placeholder="Warning" />
            <TextArea placeholder="Disabled" disabled />
        </div>
    ),
};

export const InteractiveTyping: Story = {
    args: { placeholder: "Type and blur" },
    play: async () => {
        const el = within(document.body).getByPlaceholderText("Type and blur");
        await userEvent.type(el, "semi design");
        await expect(el).toHaveValue("semi design");
        await userEvent.tab();
        await expect(el).not.toHaveFocus();
    },
};
