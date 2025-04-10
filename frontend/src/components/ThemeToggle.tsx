"use client";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="group fixed right-4 top-4">
      <div className="flex flex-col items-center justify-center">
        <button className="transition-all dark:hover:text-theme-yellow dark:text-theme-yellow/60 hover:text-theme-dark text-theme-dark/60 bg-theme-yellow z-10 dark:bg-theme-gray-dark cursor-pointer rounded-full p-2 shadow-xs shadow-theme-dark dark:shadow-theme-light">
          <Icon
            icon={theme === "dark" ? "circum:dark" : "circum:light"}
            width="24"
            height="24"
          />
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="transition-color transition-transform duration-300 dark:hover:text-theme-yellow dark:text-theme-yellow/60 hover:text-theme-dark text-theme-dark/60 z-0 absolute group-hover:translate-y-10  translate-y-0 cursor-pointer"
        >
          <Icon
            icon={theme === "dark" ? "circum:light" : "circum:dark"}
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
  );
}
