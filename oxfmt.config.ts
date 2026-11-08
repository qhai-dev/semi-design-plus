import { defineConfig } from "oxfmt";

export default defineConfig({
    ignorePatterns: ["dist", "node_modules"],
    semi: true,
    printWidth: 80,
    tabWidth: 4,
    sortImports: {
        groups: [
            "type",
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
        ],
    },
});
