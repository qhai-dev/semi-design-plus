import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileCode2 } from "lucide-react";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "./index";

const meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE = `import { Button } from "@semi-design/plus";

export function App() {
  return <Button>Install</Button>;
}`;

export const Default: Story = {
  render: () => <CodeBlock>console.log(1)</CodeBlock>,
};

export const WithHeaderAndCopy: Story = {
  render: () => (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCode2 aria-hidden />
          app.tsx
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={SAMPLE} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{SAMPLE}</CodeBlockContent>
      <CodeBlockFooter>TypeScript · 5 lines</CodeBlockFooter>
    </CodeBlock>
  ),
};

export const LineNumbersAndDiff: Story = {
  render: () => (
    <CodeBlock>
      <CodeBlockContent lineNumbers>
        {["const keep = 1;", "- const drop = 2;", "+ const add = 3;"].map((line, index) => (
          <CodeBlockLine
            key={index}
            variant={
              line.startsWith("+") ? "added" : line.startsWith("-") ? "removed" : "default"
            }
          >
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  ),
};

export const Destructive: Story = {
  render: () => (
    <CodeBlock variant="destructive">
      <CodeBlockHeader>
        <CodeBlockTitle>runtime-error.log</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent>{"TypeError: x is not a function"}</CodeBlockContent>
    </CodeBlock>
  ),
};
