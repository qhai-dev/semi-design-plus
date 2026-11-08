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

/**
 * 主操作按钮，一个视图内最多出现一个（如表单提交、弹窗确认）。
 * 对应 Semi `<Button theme="solid" type="primary">`。
 *
 * @summary 主操作按钮
 */
export const Default: Story = {
    args: { children: "Click me" },
};

/**
 * 六种视觉风格的权重阶梯，按语义选型：主操作用 primary(default)，
 * 次要用 secondary/outline，弱操作用 ghost/link，删除等危险操作用 destructive。
 * 与 Semi `theme` + `type` 的对应关系见上方 API 表。
 *
 * @summary 按语义选择视觉风格
 */
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

/**
 * 高度阶梯（24 / 32 / 40px）：表单内控件用 default，紧凑工具栏用 xs/sm，
 * 页头主操作用 lg；纯图标按钮选 icon* 系列（必须带 `aria-label`）。
 *
 * @summary 按场景选择尺寸阶梯
 */
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

/**
 * 异步提交进行中的占位：显示旋转图标、拦截点击，防止重复提交。
 * 使用时不需要再叠加 `disabled`——loading 已隐含禁用。
 *
 * @summary 异步进行中，防重复提交
 */
export const Loading: Story = {
    args: { loading: true, children: "Saving…" },
};

/**
 * 不可用态：权限不足或前置条件未满足时使用。
 * 保留 `not-allowed` 光标，让用户明白是按钮被禁用而非页面无响应。
 *
 * @summary 条件不满足时的不可用态
 */
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

/**
 * 图标增强识别：操作含义可用图标表达时优先图标 + 文字（装饰性图标加 `aria-hidden`）。
 * 纯图标按钮（`size="icon*"`）没有文字，必须补 `aria-label`。
 *
 * @summary 图标与文字的组合规则
 */
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

/**
 * 交互回归用例：点击应触发 `onClick` 并把焦点移到按钮上。
 * 由 test-runner 自动执行，同时作为 play 函数的编写示例。
 *
 * @summary 点击交互的回归用例
 */
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
