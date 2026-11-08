import { defineConfig } from "oxlint";

export default defineConfig({
    ignorePatterns: ["dist", "node_modules"],
    plugins: ["typescript", "react", "react-hooks", "import"],
    rules: {
        // 类型一律独立 import type 导入,禁止 import { x, type Y } 内联写法:
        // consistent-type-imports 管"纯 type 导入未用 import type",
        // consistent-type-specifier-style 管"内联 type specifier 混在 value 导入里"
        "typescript/consistent-type-imports": [
            "error",
            { prefer: "type-imports", fixStyle: "separate-type-imports" },
        ],
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    },
    globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
    },
    overrides: [
        {
            // Vendored sources keep their original shape; lint noise here is not actionable.
            files: ["src/internal/**"],
            rules: {
                "typescript/no-explicit-any": "off",
                "no-unused-vars": "off",
                "react-hooks/exhaustive-deps": "off",
                "react-hooks/rules-of-hooks": "off",
                "no-useless-assignment": "off",
                "react/refs": "off",
                "react/set-state-in-effect": "off",
                "react/immutability": "off",
            },
        },
        {
            // Upstream shadcn carousel wiring calls setter props inside effects by design.
            files: ["src/components/carousel/**"],
            rules: {
                "react-hooks/exhaustive-deps": "off",
                "react/set-state-in-effect": "off",
            },
        },
        {
            files: [
                "src/**/*.test.tsx",
                "src/**/*.test.ts",
                "src/**/*.stories.tsx",
            ],
            rules: {
                "typescript/no-non-null-assertion": "off",
                "react-hooks/rules-of-hooks": "off",
            },
        },
    ],
});
