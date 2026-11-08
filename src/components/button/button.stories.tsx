import type { Meta, StoryObj } from "@storybook/react-vite";

import { Plus } from "lucide-react";
import { within, expect, fn, userEvent, waitFor } from "storybook/test";

import { Button } from "./index";

const meta = {
    title: "Components/Button",
    component: Button,
    // autodocs: 在侧边栏为该组件生成一个 Docs 页，
    // 页面 = 组件描述(JSDoc) + API 表(argTypes/JSDoc) + 下方所有 story
    tags: ["autodocs"],
    parameters: { layout: "centered" },
    argTypes: {
        // API 表的每一行：description(说明)、control(控件)、table(分组/默认值)
        children: {
            description: "按钮内容：文字、图标，或图标 + 文字的组合。",
            control: "text",
            table: { category: "Content" },
        },
        variant: {
            description:
                "视觉风格，映射 Semi `theme` + `type` 组合：`default` = solid/primary、" +
                "`secondary` = solid/tertiary、`outline` = light/primary、" +
                "`ghost` = borderless/primary、`destructive` = solid/danger、`link` = 文字链接。",
            control: "radio",
            table: {
                category: "Appearance",
                defaultValue: { summary: "default" },
                type: {
                    summary:
                        '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
                },
            },
        },
        size: {
            description:
                "尺寸，高度遵循 Semi 控件规格：`xs`/`sm` = 24px、`default` = 32px、" +
                "`lg` = 40px；`icon*` 为方形图标按钮，必须提供 `aria-label`。",
            control: "radio",
            table: {
                category: "Appearance",
                defaultValue: { summary: "default" },
                type: {
                    summary:
                        '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
                },
            },
        },
        loading: {
            description:
                "加载态：追加旋转图标、置为 disabled 并设置 `aria-busy`（对应 Semi `loading`）。加载中不会触发 `onClick`。",
            control: "boolean",
            table: { category: "State", defaultValue: { summary: "false" } },
        },
        disabled: {
            description:
                "禁用态：颜色降为 disabled token，保留 `cursor: not-allowed`（Semi 规格）。",
            control: "boolean",
            table: { category: "State" },
        },
        onClick: {
            description: "点击回调。`loading` 或 `disabled` 时不会触发。",
            table: { category: "Events" },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 基础用法：主操作按钮，对应 Semi `<Button theme="solid" type="primary">`。 */
export const Default: Story = {
    args: { children: "Click me" },
};

/** 六种 `variant` 一览，与 Semi `theme` + `type` 的对应关系见上方 API 表。 */
export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Danger</Button>
            <Button variant="link">Link</Button>
        </div>
    ),
};

/** `size` 与高度的对应关系（24 / 32 / 40px），末尾是方形图标按钮。 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XS 24</Button>
            <Button size="sm">SM 24</Button>
            <Button>Default 32</Button>
            <Button size="lg">Large 40</Button>
            <Button size="icon" aria-label="Add">
                <Plus />
            </Button>
        </div>
    ),
};

/** `loading`：显示旋转图标、不可点击，并带有 `aria-busy="true"`。 */
export const Loading: Story = {
    args: { loading: true, children: "Saving…" },
};

/** 禁用态：各变体的 disabled 颜色与 `not-allowed` 光标。 */
export const Disabled: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Button disabled>Primary</Button>
            <Button variant="outline" disabled>
                Outline
            </Button>
            <Button variant="secondary" disabled>
                Secondary
            </Button>
        </div>
    ),
};

/** 图标 + 文字组合。纯图标按钮（`size="icon*"`）必须带 `aria-label`。 */
export const WithIcon: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Button>
                <Plus aria-hidden /> New
            </Button>
            <Button variant="outline">
                <Plus aria-hidden /> Add
            </Button>
        </div>
    ),
};

/** 交互测试：点击触发 `onClick` 并获得焦点（由 test-runner 自动执行）。 */
export const InteractiveClick: Story = {
    args: { children: "Interactive", onClick: fn() },
    play: async ({ args }) => {
        const btn = within(document.body).getByRole("button", {
            name: "Interactive",
        });
        await userEvent.click(btn);
        await expect(args.onClick).toHaveBeenCalledOnce();
        await waitFor(() => expect(btn).toHaveFocus());
    },
};
