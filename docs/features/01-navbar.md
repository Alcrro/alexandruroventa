# Navbar

## v1 — Starea actuală

### Ce face

Navbar-ul este un Server Component care preia datele meniului din baza de date (MongoDB) și le randează ca o listă de link-uri de navigare. Include și un toggle pentru dark/light mode.

### Fișiere implicate

```
src/components/navbar/
├── Navbar.tsx                  # Server Component — preia datele, randează nav
├── navbar.scss                 # Stiluri navbar
└── menu/
    ├── NavbarMenu.tsx          # Client Component — meniu + ThemeSwitch
    ├── ListItem.tsx            # Item individual din meniu
    ├── LiModal.tsx             # Item cu comportament modal (intercept route)
    └── navbarMenu.scss         # Stiluri meniu

src/app/api/navbar/menu/
└── route.ts                    # GET /api/navbar/menu → returnează itemele meniului

src/_lib/navbar/
├── getNavbar.ts                # fetch() către /api/navbar/menu
└── menu.ts                     # Date statice fallback / structura meniului
```

### Cum funcționează

1. `Navbar.tsx` (Server Component) apelează `getNavbar()` la build/request time
2. `getNavbar()` face fetch la `/api/navbar/menu` cu `revalidate: 0`
3. API-ul returnează lista de pagini din baza de date
4. `NavbarMenu.tsx` (Client Component) primește datele și randează link-urile
5. `ThemeSwitch` este înglobat în `NavbarMenu`

### Probleme cunoscute (v1)

- Meniul este stocat în MongoDB, dar conținutul este practic static (nu se schimbă des) → overhead inutil de DB pentru fiecare request
- `revalidate: 0` înseamnă că datele nu sunt cached deloc
- Nu există stare activă vizibilă pe link-ul curent (active state)
- Nu există hamburger menu / meniu responsive pentru mobile
- ThemeSwitch folosește CSS `::before` cu icon Bootstrap — not accessible
- Nicio animație la deschidere/închidere

---

## v2 — Plan

### Ce se schimbă față de v1

|                        | v1                                          | v2                                              |
| ---------------------- | ------------------------------------------- | ----------------------------------------------- |
| Sursa datelor meniului | MongoDB (fetch la fiecare request)          | Fișier static `config/navigation.ts`            |
| Active link            | Nu există                                   | Highlight pe link-ul curent via `usePathname()` |
| Mobile                 | Meniu vizibil mereu, se rupe pe ecrane mici | Hamburger menu cu toggle                        |
| ThemeSwitch            | `<div><span onClick>` + CSS `::before`      | `<button>` proper cu `aria-label`               |

---

### 1. Meniu static — elimină MongoDB din navbar

**Problema în v1:** Navbar-ul face fetch la MongoDB la fiecare request (`revalidate: 0`), deși itemele meniului nu se schimbă niciodată în practică. Adaugă latență și o dependență inutilă de DB pentru date statice.

**Soluție v2:** Mută itemele meniului într-un fișier de configurare TypeScript.

**Fișier nou:** `src/config/navigation.ts`

```typescript
export const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Skills", href: "/skills" },
	{ label: "Projects", href: "/projects" },
	{ label: "Certificates", href: "/certificates" },
	{ label: "Experience", href: "/experience" },
	{ label: "Performance", href: "/performance" },
	{ label: "Contact", href: "/contact" },
] as const;
```

**Fișiere modificate:**

- `src/components/navbar/Navbar.tsx` — nu mai e `async`, nu mai apelează `getNavbar()`, importă direct `navLinks`
- `src/components/navbar/menu/NavbarMenu.tsx` — primește `navLinks` sau îl importă direct

**Fișiere eliminate:**

- `src/app/api/navbar/menu/route.ts` — API route șters
- `src/_lib/navbar/getNavbar.ts` — funcția de fetch ștearsă

**Notă:** `src/_lib/navbar/menu.ts` trebuie verificat dacă e folosit și în altă parte înainte de ștergere.

---

### 2. Active link styling

**Problema în v1:** Nu există nicio indicație vizuală pentru pagina curentă — utilizatorul nu știe unde se află.

**Soluție v2:** În `ListItem.tsx` (sau `NavbarMenu.tsx`) folosim `usePathname()` pentru a compara path-ul curent cu `href`-ul fiecărui link și aplicăm o clasă CSS de activ.

**Logică:**

```typescript
const pathname = usePathname();
const isActive =
	pathname === href || (href !== "/" && pathname.startsWith(href));
```

**Stilizare activă** (propunere):

- Underline permanent pe link-ul activ
- sau font-weight bold
- sau o linie scurtă sub link (border-bottom cu accent color)

**Fișiere modificate:**

- `src/components/navbar/menu/ListItem.tsx` — devine Client Component (adaugă `"use client"`), folosește `usePathname()`
- `src/components/navbar/menu/navbarMenu.scss` — adaugă clasa `.active` cu stilul dorit

---

### 3. Hamburger menu pentru mobile

**Problema în v1:** Pe mobile, meniul este afișat mereu sau se comportă impredictibil — nu există un mecanism de collapse/expand.

**Soluție v2:** Buton hamburger vizibil pe mobile (< 768px), meniu ascuns implicit pe mobile și afișat la click.

**Comportament:**

- Desktop (≥ 768px): meniu vizibil orizontal, fără hamburger
- Mobile (< 768px): hamburgher vizibil, meniu ascuns → click → meniu apare (overlay sau dropdown)
- Click în afara meniului → închide meniul
- Navigare la o pagină nouă → închide meniul automat

**State management în `NavbarMenu.tsx`:**

```typescript
const [isOpen, setIsOpen] = useState(false);
const pathname = usePathname();

useEffect(() => {
	setIsOpen(false); // închide la schimbare rută
}, [pathname]);
```

**Structură HTML propusă:**

```tsx
<nav>
  <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
    {/* 3 linii SVG sau Bootstrap icon */}
  </button>
  <ul className={`nav-links ${isOpen ? "open" : ""}`}>
    {navLinks.map(...)}
  </ul>
</nav>
```

**Fișiere modificate:**

- `src/components/navbar/menu/NavbarMenu.tsx` — adaugă state + buton hamburger
- `src/components/navbar/menu/navbarMenu.scss` — stiluri mobile: ascunde `ul`, afișează hamburger, clasa `.open`

---

### 4. ThemeSwitch accesibil

**Problema în v1:** Toggle-ul de temă este un `<div>` cu un `<span onClick>` care afișează iconul via CSS `::before` cu unicode Bootstrap. Nu e un element interactiv real → nu e accesibil cu tastatura, nu are `aria-label`, screen reader-ele îl ignoră.

**Soluție v2:** Înlocuiește cu un `<button>` proper.

**Structură v2:**

```tsx
<button
	onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
	aria-label={
		resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
	}
	className="theme-toggle"
>
	{resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
</button>
```

**Iconițe:** SVG inline (fără dependențe extra) sau `<i className="bi bi-sun" />` / `<i className="bi bi-moon" />` cu Bootstrap Icons via className (nu `::before`).

**Fișiere modificate:**

- `src/app/ThemeSwitch.tsx` — rescris ca `<button>` cu `aria-label`
- `src/components/darkTheme/themeSwitch.scss` — stiluri actualizate pentru button
- `src/components/darkTheme/ImageDarkSpan.tsx` și `ImageLightSpan.tsx` — **eliminate** (dead code după v2)

---

### Fișiere afectate în total (v2)

| Fișier                                        | Acțiune                                       |
| --------------------------------------------- | --------------------------------------------- |
| `src/config/navigation.ts`                    | **Nou**                                       |
| `src/components/navbar/Navbar.tsx`            | Modificat — nu mai e async                    |
| `src/components/navbar/menu/NavbarMenu.tsx`   | Modificat — hamburger + close on route change |
| `src/components/navbar/menu/ListItem.tsx`     | Modificat — active state                      |
| `src/components/navbar/menu/navbarMenu.scss`  | Modificat — mobile + active styles            |
| `src/app/ThemeSwitch.tsx`                     | Modificat — `<button>` accesibil              |
| `src/components/darkTheme/themeSwitch.scss`   | Modificat                                     |
| `src/components/darkTheme/ImageDarkSpan.tsx`  | **Eliminat**                                  |
| `src/components/darkTheme/ImageLightSpan.tsx` | **Eliminat**                                  |
| `src/app/api/navbar/menu/route.ts`            | **Eliminat**                                  |
| `src/_lib/navbar/getNavbar.ts`                | **Eliminat**                                  |
