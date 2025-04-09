"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/providers/theme-provider";
import ThemeToggle from "./ThemeToggle";
export default function TopArea() {
  const [condition, setCondition] = useState(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (theme === "dark") {
      setCondition(true);
    } else {
      setCondition(false);
    }
  }, [theme]);
  return (
    <div className="w-full flex items-center justify-between p-5">
      <Image
        src={condition ? "/images/light-logo.png" : "/images/dark-logo.png"}
        alt="chat hub logo"
        width={70}
        height={70}
        className="z-10"
      />
      <ThemeToggle />
    </div>
  );
}
