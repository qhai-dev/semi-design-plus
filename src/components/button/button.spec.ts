import { expect, test } from "@playwright/test";

// 在真实浏览器中验证 Button 的行为与视觉规格。
// 页面直接指向 Storybook 的 iframe(story 载体),绕过 manager UI。
const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe("Button E2E", () => {
    test("default: 渲染可点击的主按钮", async ({ page }) => {
        await page.goto(story("components-button--default"));
        const btn = page.getByRole("button", { name: "Click me" });
        await expect(btn).toBeVisible();
        await expect(btn).toHaveCSS("height", "32px");
        await btn.click();
        await expect(btn).toBeEnabled();
    });

    test("loading: 禁用交互 + aria-busy + 旋转图标", async ({ page }) => {
        await page.goto(story("components-button--loading"));
        const btn = page.getByRole("button", { name: "Saving…" });
        await expect(btn).toBeDisabled();
        await expect(btn).toHaveAttribute("aria-busy", "true");
        // 加载图标(svg)已追加,且带旋转动画类
        await expect(btn.locator("svg")).toHaveCount(1);
        await expect(btn.locator("svg")).toHaveClass(/animate-spin/);
    });

    test("disabled: 保留 not-allowed 光标(Semi 规格)", async ({ page }) => {
        await page.goto(story("components-button--disabled"));
        const btn = page.getByRole("button", { name: "Primary", exact: true });
        await expect(btn).toBeDisabled();
        await expect(btn).toHaveCSS("cursor", "not-allowed");
    });

    test("sizes: 真实渲染高度 24 / 32 / 40px,图标按钮为 32px 方形", async ({
        page,
    }) => {
        await page.goto(story("components-button--sizes"));
        await expect(page.getByRole("button", { name: "XS 24" })).toHaveCSS(
            "height",
            "24px",
        );
        await expect(
            page.getByRole("button", { name: "Default 32" }),
        ).toHaveCSS("height", "32px");
        await expect(page.getByRole("button", { name: "Large 40" })).toHaveCSS(
            "height",
            "40px",
        );
        const iconBox = await page
            .getByRole("button", { name: "Add" })
            .boundingBox();
        expect(iconBox).toMatchObject({ width: 32, height: 32 });
    });

    test("variants: 各视觉风格落到关键 token 类", async ({ page }) => {
        await page.goto(story("components-button--variants"));
        await expect(page.getByRole("button", { name: "Primary" })).toHaveClass(
            /bg-primary/,
        );
        await expect(page.getByRole("button", { name: "Outline" })).toHaveClass(
            /border-border/,
        );
        await expect(page.getByRole("button", { name: "Danger" })).toHaveClass(
            /bg-destructive/,
        );
        await expect(page.getByRole("button", { name: "Link" })).toHaveClass(
            /text-primary/,
        );
    });

    test("keyboard: Enter 与 Space 都触发 click", async ({ page }) => {
        await page.goto(story("components-button--default"));
        const btn = page.getByRole("button", { name: "Click me" });
        await btn.focus();
        // 挂监听计数,验证键盘激活走的是真实 click 事件
        await page.evaluate(() => {
            (window as unknown as Record<string, number>).__clicks = 0;
            document
                .querySelector('[data-slot="button"]')
                ?.addEventListener("click", () => {
                    const w = window as unknown as Record<string, number>;
                    w.__clicks = (w.__clicks ?? 0) + 1;
                });
        });
        await page.keyboard.press("Enter");
        await page.keyboard.press("Space");
        const clicks = await page.evaluate(
            () => (window as unknown as Record<string, number>).__clicks,
        );
        expect(clicks).toBe(2);
    });

    test("icon 按钮: aria-label 可访问名", async ({ page }) => {
        await page.goto(story("components-button--sizes"));
        const icon = page.getByRole("button", { name: "Add" });
        await expect(icon).toHaveAttribute("aria-label", "Add");
        await expect(icon).toBeVisible();
    });
});
