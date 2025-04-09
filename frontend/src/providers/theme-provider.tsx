"use client";
import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

interface Props {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>(
    typeof window !== "undefined"
      ? localStorage?.getItem("theme") === "dark"
        ? "dark"
        : "light"
      : "light"
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage?.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
