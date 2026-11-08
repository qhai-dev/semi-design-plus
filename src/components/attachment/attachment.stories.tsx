import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlert, Download, FileText, Paperclip, X } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "./index";

const meta = {
  title: "Components/Attachment",
  component: Attachment,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Attachment>
      <AttachmentContent>
        <AttachmentTitle>file.png</AttachmentTitle>
        <AttachmentDescription>Image attachment</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
};

export const WithMediaAndActions: Story = {
  render: () => (
    <Attachment>
      <AttachmentMedia variant="icon">
        <FileText aria-hidden />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Download">
          <Download aria-hidden />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove">
          <X aria-hidden />
        </AttachmentAction>
      </AttachmentActions>
      <AttachmentTrigger aria-label="Open quarterly-report.pdf" />
    </Attachment>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Attachment state="idle">
        <AttachmentMedia variant="icon">
          <Paperclip aria-hidden />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Choose a file</AttachmentTitle>
          <AttachmentDescription>Idle, dashed border</AttachmentDescription>
        </AttachmentContent>
        <AttachmentTrigger aria-label="Choose a file" />
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia variant="icon">
          <FileText aria-hidden />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>design-tokens.zip</AttachmentTitle>
          <AttachmentDescription>Uploading… 62%</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia variant="icon">
          <CircleAlert aria-hidden />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>broken-upload.zip</AttachmentTitle>
          <AttachmentDescription>Upload failed. Retry?</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <X aria-hidden />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Attachment size="default">
        <AttachmentContent>
          <AttachmentTitle>Default size</AttachmentTitle>
          <AttachmentDescription>14px title</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="sm">
        <AttachmentContent>
          <AttachmentTitle>Small size</AttachmentTitle>
          <AttachmentDescription>12px title</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="xs">
        <AttachmentContent>
          <AttachmentTitle>Extra small</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AttachmentGroup className="max-w-md">
      {["design-v1.png", "design-v2.png", "design-v3.png"].map((name) => (
        <Attachment key={name} state="done">
          <AttachmentMedia variant="icon">
            <FileText aria-hidden />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  ),
};
