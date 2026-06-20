# Navbar

## PRD

Navbar persistent pe toate paginile — navigare + toggle temă.

- Link-uri către toate paginile principale
- Link activ vizibil (highlight pe pagina curentă)
- Hamburger menu pe mobile (< 768px), meniu vizibil pe desktop
- Toggle dark/light mode accesibil (`<button>` cu `aria-label`)
- Date statice (nu MongoDB) — meniul nu se schimbă

---

## Tech Spec

### Fișiere

```
src/features/navbar/
├── Navbar.tsx              # Server Component — importă navLinks, randează nav
├── NavbarMenu.tsx          # Client Component — hamburger state + close on route change
├── ListItem.tsx            # Item meniu cu active state via usePathname()
├── ThemeSwitch.tsx         # <button> cu aria-label + icon SVG
└── navbar.scss

src/config/navigation.ts    # navLinks static (înlocuiește fetch MongoDB)
```

### navLinks static

```typescript
// src/config/navigation.ts
export const navLinks = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Skills",       href: "/skills" },
  { label: "Projects",     href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Experience",   href: "/experience" },
  { label: "Performance",  href: "/performance" },
  { label: "Contact",      href: "/contact" },
] as const;
```

### Active link

```typescript
// ListItem.tsx — "use client"
const pathname = usePathname();
const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
```

### Hamburger menu

```typescript
// NavbarMenu.tsx
const [isOpen, setIsOpen] = useState(false);
const pathname = usePathname();

useEffect(() => {
  setIsOpen(false);  // închide la schimbare rută
}, [pathname]);
```

Desktop (≥ 768px): meniu vizibil orizontal, fără hamburger.
Mobile (< 768px): hamburger vizibil, meniu ascuns → click → meniu apare.

### ThemeSwitch

```tsx
<button
  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
  aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
>
  {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
</button>
```

---

## TODO

- [ ] Meniu static din `src/config/navigation.ts` — șterge API route + `getNavbar.ts`
- [ ] Active link styling cu `usePathname()` în `ListItem.tsx`
- [ ] Hamburger menu pentru mobile cu close la schimbare rută
- [ ] `ThemeSwitch`: `<button aria-label>` cu SVG icon în loc de `<div>` + `::before` Bootstrap
- [ ] Șterge dead code: `src/app/api/navbar/menu/route.ts`, `src/_lib/navbar/getNavbar.ts`
- [ ] Șterge `ImageDarkSpan.tsx` și `ImageLightSpan.tsx` dacă sunt nefolosite
