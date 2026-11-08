import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "happy-dom",
        // happy-dom 环境较重,vmThreads 让每个 worker 只创建一次(保留文件级隔离)
        pool: "vmThreads",
        setupFiles: ["./vitest.setup.ts"],
    },
});
