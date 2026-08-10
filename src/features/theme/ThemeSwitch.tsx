"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import "./theme.scss";
import { BsSun, BsMoonStars } from "react-icons/bs";

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
      {isDark ? <BsSun /> : <BsMoonStars />}
    </button>
  );
}
