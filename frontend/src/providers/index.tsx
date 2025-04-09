import QueryProvider from "./query-provider";
import ThemeProvider from "./theme-provider";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
}

export default Provider;
