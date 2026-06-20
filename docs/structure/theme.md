# Theme (Dark / Light Mode)

## PRD

Aplicația suportă dark mode și light mode cu persistare și respectare preferință sistem.

- Toggle accesibil în navbar (`<button>` cu `aria-label`)
- Tema persistată în localStorage (via next-themes)
- Respectă `prefers-color-scheme` din sistem ca default
- Tranziție CSS smooth la schimbare temă
- Toate componentele și paginile adaptate la ambele teme

---

## Tech Spec

### Fișiere

```
src/features/theme/
├── DarkThemeProvider.tsx   # Wrapper ThemeProvider (next-themes) — importat în layout
└── ThemeSwitch.tsx         # Buton toggle (mutat în features/navbar/)

src/app/globals.scss        # CSS variables per temă
tailwind.config.ts          # darkMode: "class" + token-uri expuse
```

### Configurare next-themes

```tsx
// DarkThemeProvider.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"    // respectă preferința OS
  enableSystem
>
  {children}
</ThemeProvider>
```

### CSS variables (globals.scss)

```scss
:root, :root.light {
  --bg:           #f5f0eb;
  --bg-surface:   #fffefb;
  --bg-elevated:  #ede8e3;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted:   #9ca3af;
  --accent:       #0284c7;
}

:root.dark {
  --bg:           #0d1117;
  --bg-surface:   #161b22;
  --bg-elevated:  #21262d;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted:   #64748b;
  --accent:       #38bdf8;
}
```

### Tranziție smooth

```scss
// globals.scss
*, *::before, *::after {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
```

### Tailwind config

```typescript
// tailwind.config.ts
darkMode: "class",
theme: {
  extend: {
    colors: {
      bg:        "var(--bg)",
      surface:   "var(--bg-surface)",
      elevated:  "var(--bg-elevated)",
      primary:   "var(--text-primary)",
      secondary: "var(--text-secondary)",
      muted:     "var(--text-muted)",
      accent:    "var(--accent)",
    }
  }
}
```

---

## TODO

- [ ] Fix CSS variables: `---` (3 cratime) → `--` (2 cratime standard) în tot `globals.scss`
- [ ] `defaultTheme="system"` + `enableSystem` — respectă `prefers-color-scheme`
- [ ] Tranziție CSS smooth la schimbare temă
- [ ] Elimină comentariile dezactivate pentru Dark Reader din `globals.scss`
