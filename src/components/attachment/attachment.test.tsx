import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Paperclip } from "lucide-react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "./index";

describe("Attachment", () => {
  it("renders the card/content structure with data-slots and state", () => {
    render(
      <Attachment>
        <AttachmentContent>
          <AttachmentTitle>file.png</AttachmentTitle>
          <AttachmentDescription>Image attachment</AttachmentDescription>
        </AttachmentContent>
      </Attachment>,
    );
    const title = screen.getByText("file.png");
    expect(title).toHaveAttribute("data-slot", "attachment-title");
    expect(title.closest("[data-slot='attachment']")).toHaveAttribute("data-state", "done");
    expect(screen.getByText("Image attachment")).toHaveAttribute(
      "data-slot",
      "attachment-description",
    );
  });

  it("styles the file card per Semi chat attachment spec (6px radius, border, hover fill)", () => {
    render(<Attachment>doc.pdf</Attachment>);
    const card = screen.getByText("doc.pdf");
    expect(card).toHaveClass("rounded-xl", "border", "bg-card");
    expect(card).toHaveClass("has-[>a,>button]:hover:bg-muted");
    expect(card).toHaveClass("transition-colors", "duration-100");
  });

  it("switches card and media styles on error/idle states", () => {
    render(
      <>
        <Attachment state="error" data-testid="error">
          broken.zip
        </Attachment>
        <Attachment state="idle" data-testid="idle">
          pending.zip
        </Attachment>
      </>,
    );
    expect(screen.getByTestId("error")).toHaveClass("data-[state=error]:border-destructive");
    expect(screen.getByTestId("idle")).toHaveClass("data-[state=idle]:border-dashed");
  });

  it("renders media with text-2 icon color and error tint", () => {
    render(
      <Attachment state="error">
        <AttachmentMedia variant="icon">
          <Paperclip aria-hidden />
        </AttachmentMedia>
        <AttachmentContent>broken.zip</AttachmentContent>
      </Attachment>,
    );
    const media = screen.getByText("broken.zip").closest("[data-slot='attachment']");
    const mediaEl = media!.querySelector("[data-slot='attachment-media']")!;
    expect(mediaEl).toHaveClass("bg-muted", "text-muted-foreground");
    expect(mediaEl).toHaveClass("group-data-[state=error]/attachment:bg-destructive-light");
    expect(mediaEl).toHaveClass("group-data-[state=error]/attachment:text-destructive");
  });

  it("keeps title semibold and description muted", () => {
    render(
      <Attachment>
        <AttachmentContent>
          <AttachmentTitle>file.png</AttachmentTitle>
          <AttachmentDescription>Image attachment</AttachmentDescription>
        </AttachmentContent>
      </Attachment>,
    );
    expect(screen.getByText("file.png")).toHaveClass("font-semibold", "text-foreground");
    expect(screen.getByText("Image attachment")).toHaveClass("text-xs", "text-muted-foreground");
  });

  it("lets consumer className override built-ins", () => {
    render(<Attachment className="rounded-3xl">Override</Attachment>);
    const card = screen.getByText("Override");
    expect(card).toHaveClass("rounded-3xl");
    expect(card).not.toHaveClass("rounded-xl");
  });
});
