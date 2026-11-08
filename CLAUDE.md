# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目定位

**shadcn/ui 的 API 架构 + Semi Design 的 1:1 视觉语言**,基于 **Base UI** 原语(不是 Radix)。组件对外暴露 shadcn 形态的复合组件与 `data-slot` 结构,内部所有视觉值取自 Semi Design 默认主题 token。

组件文档以 **Storybook autodocs 为唯一来源**(JSDoc + argTypes + stories,不建独立 docs 目录)。参考 `src/components/button/button.stories.tsx` 的写法。

## 仓库结构

单 npm 包(非 monorepo),pnpm 管理,Node ≥ 20。

```
src/components/<kebab-name>/index.tsx      # 组件本体,导出 Xxx + XxxVariants
src/components/<kebab-name>/<name>.test.tsx
src/components/<kebab-name>/<name>.stories.tsx
src/internal/<feature>/                    # 复杂组件的逻辑层(context/stores/hooks/geometry)
src/internal/use-render/                    # base-ui useRender 的自制替代
src/lib/cn.ts                              # twMerge(clsx(...)),全库唯一 className 合并入口
src/styles/semi-tokens.css                 # Semi 原始色板 + 语义 token(生成物,勿手改)
src/styles/base.css                        # data-* 自定义 variant、keyframes、动画 utility
src/styles/index.css                       # 入口:@theme inline 把 shadcn 变量映射到 Semi 变量
.storybook/                                # Storybook 9(react-vite + docs/themes/a11y)
vitest.config.ts / vitest.setup.ts         # 单测(vitest + happy-dom + jest-dom)
oxlint.config.ts                           # oxlint 配置(defineConfig,类型安全)
rslib.config.ts                            # 构建(esm + dts)
```

`src/index.ts` 是唯一导出面,新增组件必须在此加 `export * from "./components/<name>"`。

**样式三层**:`semi-tokens.css`(原始/语义 CSS 变量)→ `base.css`(自定义 variant)→ `index.css`(`@theme inline` 把 `--color-primary: var(--primary)` 之类的 shadcn 语义变量接到 Tailwind utility 上,并把 `--primary` 指向 `--semi-color-primary`)。暗色由 `.dark` 类下的 `--semi-*` 变量整体反转实现,**组件内不写 `dark:` 前缀颜色**。

## 常用命令

```bash
pnpm test            # vitest run(全量)
pnpm exec vitest run src/components/button/button.test.tsx   # 单文件
pnpm test:watch
pnpm typecheck       # tsc --noEmit
pnpm lint            # oxlint -c oxlint.config.ts .
pnpm format          # oxfmt
pnpm build           # rslib build(esm + dts)
pnpm storybook       # http://localhost:6006
pnpm build-storybook
pnpm test-storybook  # 跑所有 story 的 play 函数 + a11y
```

注意:本仓库通过 `devEngines` 锁定 pnpm,直接 `npx` 会报 EBADDEVENGINES,用 `pnpm exec` 代替。

## 组件实现约定(硬性规则)

1. **Token 优先**:颜色一律用映射出的 utility(`bg-primary`、`text-text-2`、`border-border`),圆角用 `rounded-*`(3/6/12px 刻度),**禁止裸 hex**。
2. **`cn` 必须可覆盖**:消费者传入的 `className` 要能覆盖内置类(靠 `twMerge`)。
3. **交互态四件套**:hover / active / focus-visible / disabled 全部实现;颜色过渡 100ms(`transition-colors duration-100`)。
4. **焦点环**:用 Semi 实心主色 `--semi-color-focus-border`(#0064FA),不是半透明蓝。
5. **禁用态**:用 `cursor-not-allowed`,**不用 `pointer-events-none`** 吞掉光标。
6. **`data-slot`**:每个可寻址部分都有 `data-slot="kebab-name"`。
7. **cva**:有两个以上 variant/size 的组件一律用 `class-variance-authority`,文件顶部导出 `XxxVariants`。
8. **图标**:显式 `import { X } from "lucide-react"`,禁止 `import * as LucideIcons`;装饰性图标加 `aria-hidden`。
9. **无 `dark:` 颜色覆盖**:一切随 token 自动反转(结构性布局除外)。
10. **文件命名**:`index.tsx` / `<name>.test.tsx` / `<name>.stories.tsx`。

## 测试策略

每个组件交付四件套:vitest 单测(断言 data-slot、variant 类名、交互、回调、a11y 基线,**禁止无断言的冒烟测试**)、stories(每个 variant/size/状态一个 story,至少一个带 `play` 交互函数)、test-storybook(playwright 驱动)、light/dark 视觉抽查。

验收门槛:typecheck 通过、vitest 全绿、test-storybook 全绿、oxlint 无 error。

- 单测用 **vitest**(显式 `import { describe, it, expect, vi } from "vitest"`,无 globals);mock 用 `vi.fn()`。
- jest-dom 断言由 `vitest.setup.ts` 里 `import "@testing-library/jest-dom/vitest"` 注册,同时完成类型增强;`@testing-library/react` 的 `cleanup` 挂在全局 `afterEach`。
- 测试环境 happy-dom;`vitest.config.ts` 用 `pool: "vmThreads"`(happy-dom 较重,每个 worker 只建一次环境,全量 15s → 11s)。

Storybook a11y 规则刻意禁用了若干条(`color-contrast`、`nested-interactive`、`aria-required-children` 等),原因记录在 `.storybook/preview.ts` 注释里——不要随手重新开启。

## 已知坑(踩坑前先看)

- **Base UI 不是 Radix**:Menu.Item 的回调是 `onClick`(非 `onSelect`);状态用 `data-active:` / `data-open:` / `data-checked:` 变体,不是 `data-[state=...]`。
- **lucide 图标名**:`CircleInfo` / `TickCircle` / `CircleWarning` 不存在,用 `Info` / `CircleCheck` / `TriangleAlert` / `CircleAlert`。
- **happy-dom + Tailwind**:带变体前缀的类在断言时要写完整字符串。
- `Avatar.Image` 在 happy-dom 永远不触发 load,只渲染 Fallback。
- 断言类名时注意 `font-semibold`(600)而非 `font-bold`(700)。
- **stories 的 meta 需要显式类型注解** `const meta: Meta<typeof X> = {...}`(`satisfies` 不够):rslib 生成 d.ts 时会对推断类型报 TS2742 不具名错误。
- **oxlint 的 React Compiler 系新规则**(`react/refs`、`react/set-state-in-effect`、`react/immutability`)在 `src/internal/**` 与 carousel 里是刻意豁免的(见 `oxlint.config.ts` 注释),新增内部逻辑遇到这类警告同理处理,不要为消除警告重写既有实现。

## 样式的特殊约定

- **`semi-tokens.css` 是生成物**(从 Semi Design 默认主题 token 转换而来),不要手改。
- **样式规格的权威来源**在仓库外的 `semi-design/packages/semi-foundation/<component>/*.scss` 与 `semi-theme-default/scss/*`,实现组件前对照它。
