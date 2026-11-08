import { defineConfig } from "oxlint";

export default defineConfig({
    plugins: ["typescript", "react", "react-hooks"],
    ignorePatterns: [
        "dist",
        "node_modules",
        "coverage",
        "public",
        "storybook-static",
    ],
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
