"use client";

import { ThemeProvider } from "next-themes";

export default function DarkThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="white">
      {children}
    </ThemeProvider>
  );
}
