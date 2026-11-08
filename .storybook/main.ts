import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    framework: "@storybook/react-vite",
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: [
        "@storybook/addon-docs",
        "@storybook/addon-themes",
        "@storybook/addon-a11y",
        "@storybook/addon-mcp",
        "@storybook/addon-vitest",
    ],
    // react-docgen-typescript 解析 props 更完整(AI 最佳实践推荐);
    // 比 react-docgen 慢,manifest 生成过慢时可降回 "react-docgen"
    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
    viteFinal: async (config) => {
        const tailwindcss = (await import("@tailwindcss/vite")).default;
        config.plugins = [...(config.plugins || []), tailwindcss()];
        return config;
    },
};

export default config;
