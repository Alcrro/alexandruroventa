import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:           "var(--bg)",
        surface:      "var(--bg-surface)",
        elevated:     "var(--bg-elevated)",
        border:       "var(--border)",
        accent:       "var(--accent)",
        "accent-bg":  "var(--accent-bg)",
        primary:      "var(--text-primary)",
        secondary:    "var(--text-secondary)",
        muted:        "var(--text-muted)",
      },
      fontSize: {
        xs:    ["var(--text-xs)",   { lineHeight: "1rem" }],
        sm:    ["var(--text-sm)",   { lineHeight: "1.25rem" }],
        base:  ["var(--text-base)", { lineHeight: "1.5rem" }],
        lg:    ["var(--text-lg)",   { lineHeight: "1.75rem" }],
        xl:    ["var(--text-xl)",   { lineHeight: "1.75rem" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "2rem" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "2.25rem" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "2.5rem" }],
        "5xl": ["var(--text-5xl)", { lineHeight: "1" }],
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
    },
  },
  plugins: [],
};

export default config;
