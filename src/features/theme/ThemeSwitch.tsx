"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import "./theme.scss";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
    >
      <i className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"}`} />
    </button>
  );
}
