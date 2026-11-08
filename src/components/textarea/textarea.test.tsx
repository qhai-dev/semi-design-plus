import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { TextArea } from "./index";

describe("TextArea", () => {
  it("renders a textarea with the textarea data-slot", () => {
    render(<TextArea placeholder="Write" />);
    expect(screen.getByPlaceholderText("Write")).toHaveAttribute(
      "data-slot",
      "textarea",
    );
  });

  it("accepts typing", async () => {
    const user = userEvent.setup();
    render(<TextArea placeholder="bio" />);
    const el = screen.getByPlaceholderText("bio") as HTMLTextAreaElement;
    await user.type(el, "hello");
    expect(el).toHaveValue("hello");
  });

  it("applies the Semi fill-box styles (fill-0 bg, 3px radius, 8/12 padding, 60px min-height)", () => {
    render(<TextArea placeholder="a" />);
    const el = screen.getByPlaceholderText("a");
    expect(el).toHaveClass(
      "bg-muted",
      "hover:bg-muted-hover",
      "focus:border-focus-border",
      "rounded-sm",
      "px-3",
      "py-2",
      "min-h-15",
      "resize-y",
    );
  });

  it("renders error validation styles via validateStatus", () => {
    render(<TextArea validateStatus="error" placeholder="e" />);
    const el = screen.getByPlaceholderText("e");
    expect(el).toHaveClass(
      "bg-destructive-light",
      "border-destructive-light",
      "focus:border-destructive",
    );
  });

  it("renders warning validation styles via validateStatus", () => {
    render(<TextArea validateStatus="warning" placeholder="w" />);
    const el = screen.getByPlaceholderText("w");
    expect(el).toHaveClass("bg-warning-light", "focus:border-warning");
  });

  it("keeps the not-allowed cursor and disabled fill when disabled", () => {
    render(<TextArea disabled placeholder="d" />);
    const el = screen.getByPlaceholderText("d");
    expect(el).toBeDisabled();
    expect(el).toHaveClass(
      "disabled:bg-disabled-fill",
      "disabled:cursor-not-allowed",
    );
  });

  it("lets consumer className override built-ins (tailwind-merge)", () => {
    render(<TextArea className="min-h-40" placeholder="t" />);
    const el = screen.getByPlaceholderText("t");
    expect(el).toHaveClass("min-h-40");
    expect(el).not.toHaveClass("min-h-15");
  });
});
