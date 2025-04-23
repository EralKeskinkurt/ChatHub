"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "./query-provider";
import AuthProvider from "./auth-provider";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default Provider;
