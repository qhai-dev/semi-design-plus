import { ThemeProvider, ThemeProviderProps } from 'next-themes';

export function NextThemesProvider({ children, ...props }: { children: React.ReactNode } & ThemeProviderProps) {
  return (
    <ThemeProvider
        {...props}
    >
      {children}
    </ThemeProvider>
  );
}