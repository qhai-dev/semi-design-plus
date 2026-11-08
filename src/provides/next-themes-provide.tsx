import type { ThemeProviderProps } from "next-themes";

import { ThemeProvider } from "next-themes";

export function NextThemesProvider({
    children,
    ...props
}: { children: React.ReactNode } & ThemeProviderProps) {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
