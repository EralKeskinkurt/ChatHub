"use client";
import { Comfortaa } from "next/font/google";
import "../globals.css";
import Provider from "@/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa-sans",
  subsets: ["latin"],
});

export default function InterfaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${comfortaa.variable} antialiased dark:bg-theme-dark bg-theme-light relative`}
      >
        <Provider>
          {children}
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="top-right"
          />
        </Provider>
      </body>
    </html>
  );
}
