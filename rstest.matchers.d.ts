// jest-dom 断言类型接入 @rstest/core（rstest.setup.ts 运行时已 expect.extend，
// 这里补上类型层的接口合并，让 toHaveClass 等匹配器在测试里有类型）。
// 空接口 + any 是该增强惯用法的固定形态（与 jest-dom 自带 vitest.d.ts 相同）。
/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any */
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "@rstest/core" {
    interface Assertion<T = any>
        extends TestingLibraryMatchers<any, T> {}
    interface AsymmetricMatchersContaining
        extends TestingLibraryMatchers<any, any> {}
}
