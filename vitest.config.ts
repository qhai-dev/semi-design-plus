import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { configDefaults, defineConfig } from "vitest/config";

const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

// 两个 project:
// - unit:     组件单测(happy-dom),由根配置 + projects[0] 的 extends: true 构成
// - storybook: 把 stories 当测试跑(浏览器模式,需 `pnpm exec playwright install chromium`)
// 更多信息: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    test: {
        name: "unit",
        environment: "happy-dom",
        // happy-dom 环境较重,vmThreads 让每个 worker 只创建一次(保留文件级隔离)
        pool: "vmThreads",
        setupFiles: ["./vitest.setup.ts"],
        // E2E(<name>.spec.ts,playwright)归 playwright.config.ts;
        // vitest 只认 <name>.test.tsx
        exclude: [...configDefaults.exclude, "**/*.spec.ts"],
        projects: [
            {
                extends: true,
                test: {},
            },
            {
                plugins: [
                    // 运行 Storybook 配置中的所有 stories 测试
                    // 插件选项: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright({}),
                        instances: [{ browser: "chromium" }],
                    },
                    setupFiles: [
                        path.join(dirname, ".storybook/vitest.setup.ts"),
                    ],
                },
            },
        ],
    },
});
