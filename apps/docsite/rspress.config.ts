import * as path from "node:path";
import { pluginTailwindcss } from "@rsbuild/plugin-tailwindcss";
import { defineConfig } from "@rspress/core";

export default defineConfig({
    root: path.join(__dirname, "docs"),
    globalStyles: path.join(__dirname, "tailwind.css"),
    builderConfig: {
        plugins: [pluginTailwindcss()],
    },
});
