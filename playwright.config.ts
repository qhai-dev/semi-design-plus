import { defineConfig } from "@playwright/test";

// E2E 测试:直接打 Storybook 的 iframe 页面,在真实浏览器里交互组件
// 运行: pnpm e2e (自动拉起 Storybook,占用 6006 端口)
export default defineConfig({
    // E2E 与组件同目录:命名规范 <name>.spec.ts(playwright 专用,
    // 与 vitest 的 <name>.test.tsx 区分)
    testDir: "./src",
    testMatch: "**/*.spec.ts",
    timeout: 30_000,
    fullyParallel: true,
    use: {
        baseURL: "http://127.0.0.1:6006",
        viewport: { width: 1280, height: 720 },
    },
    // Storybook 未启动时自动拉起;已在跑则复用
    webServer: {
        command: "pnpm exec storybook dev -p 6006 --no-open --ci",
        url: "http://127.0.0.1:6006/index.json",
        reuseExistingServer: true,
        timeout: 120_000,
    },
    projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
