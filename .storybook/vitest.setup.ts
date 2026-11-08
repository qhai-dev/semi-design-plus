import { setProjectAnnotations } from "@storybook/react-vite";

import * as projectAnnotations from "./preview";

// 运行 stories 测试时应用正确的项目注解
// https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([projectAnnotations]);
