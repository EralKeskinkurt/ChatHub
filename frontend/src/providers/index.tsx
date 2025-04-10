"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "./query-provider";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}

export default Provider;
