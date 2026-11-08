import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, it } from "vitest";
import { CodeBlock, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle } from "./index";

describe("CodeBlock", () => {
  it("renders the block/content/code structure with data-slots", () => {
    render(
      <CodeBlock>
        <CodeBlockContent>{"const a = 1"}</CodeBlockContent>
      </CodeBlock>,
    );
    const code = screen.getByText("const a = 1");
    expect(code.closest("[data-slot='code-block-code']")).toBeInTheDocument();
    expect(code.closest("[data-slot='code-block-content']")).toHaveAttribute(
      "data-slot",
      "code-block-content",
    );
    expect(code.closest("[data-slot='code-block']")).toBeInTheDocument();
  });

  it("styles the block per the Semi chat code spec (12px radius, bg-2 dialog surface, border)", () => {
    render(<CodeBlock>console.log(1)</CodeBlock>);
    const block = screen.getByText("console.log(1)").closest("[data-slot='code-block']")!;
    expect(block).toHaveClass("rounded-3xl", "border", "border-border", "bg-dialog");
    expect(block).toHaveClass("font-mono", "text-sm");
  });

  it("switches to the destructive border for error blocks", () => {
    render(<CodeBlock variant="destructive">throw new Error()</CodeBlock>);
    const block = screen.getByText("throw new Error()").closest("[data-slot='code-block']")!;
    expect(block).toHaveClass("border-destructive", "text-destructive");
  });

  it("renders line numbers on the text-2 token when numbered", () => {
    render(
      <CodeBlock>
        <CodeBlockContent lineNumbers>{`first\nsecond`}</CodeBlockContent>
      </CodeBlock>,
    );
    const lines = screen.getAllByText(/first|second/).map((node) =>
      node.closest("[data-slot='code-block-line']")!,
    );
    expect(lines).toHaveLength(2);
    for (const line of lines) {
      expect(line).toHaveAttribute("data-slot", "code-block-line");
      expect(line).toHaveClass("before:text-muted-foreground");
    }
  });

  it("styles diff line variants with Semi tokens", () => {
    render(
      <CodeBlock>
        <CodeBlockContent lineNumbers>{`a\nb\nc`}</CodeBlockContent>
      </CodeBlock>,
    );
    const lines = screen.getAllByText(/a|b|c/).map((node) =>
      node.closest("[data-slot='code-block-line']")!,
    );
    expect(lines[0]).toHaveAttribute("data-variant", "default");
    expect(lines[0]).toHaveClass("before:text-muted-foreground");
  });

  it("copies code and flips to the copied state", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>index.ts</CodeBlockTitle>
          <CodeBlockCopyButton value="const a = 1" />
        </CodeBlockHeader>
        <CodeBlockContent>{"const a = 1"}</CodeBlockContent>
      </CodeBlock>,
    );
    const button = screen.getByRole("button", { name: "Copy" });
    await user.click(button);
    expect(writeText).toHaveBeenCalledWith("const a = 1");
    expect(await screen.findByRole("button", { name: "Copied" })).toHaveAttribute("data-copied");
  });

  it("titles use the sans 14px/600 scale over the mono block", () => {
    render(
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>index.ts</CodeBlockTitle>
        </CodeBlockHeader>
      </CodeBlock>,
    );
    expect(screen.getByText("index.ts")).toHaveClass("font-sans", "text-sm", "font-semibold");
  });

  it("lets consumer className override built-ins", () => {
    render(<CodeBlock className="rounded-xl">Override</CodeBlock>);
    const block = screen.getByText("Override").closest("[data-slot='code-block']")!;
    expect(block).toHaveClass("rounded-xl");
    expect(block).not.toHaveClass("rounded-3xl");
  });
});
