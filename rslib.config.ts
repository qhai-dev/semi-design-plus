import { defineConfig } from "@rslib/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
    bundle: true,
    dts: true,
    output: {
        target: "web",
    },
    plugins: [pluginReact()],
});
