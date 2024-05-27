"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import "../components/darkTheme/themeSwitch.scss";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  if (resolvedTheme === "dark") {
    return (
      <div className="dark-theme relative z-[999]">
        <span onClick={() => setTheme("light")}></span>
      </div>
    );
  }
  if (resolvedTheme === "light") {
    return (
      <div className="light-theme relative z-[999]">
        <span onClick={() => setTheme("dark")}></span>
      </div>
    );
  }
}
