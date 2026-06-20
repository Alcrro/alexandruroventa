# Layout & Globals

## PRD

Root layout-ul wrappează întreaga aplicație și oferă:

- Font consistent (Inter) pe toate paginile
- Providers în ordinea corectă (teme, context)
- Navbar + Footer pe toate paginile
- Slot `@modal` pentru parallel routes (contact, certificate)
- Metadata globală (fallback pentru paginile fără metadata proprie)
- Security headers și CORS via middleware
- `sitemap.ts` și `robots.ts` generate automat

---

## Tech Spec

### Fișiere

```
src/app/
├── layout.tsx          # Root layout
├── default.tsx         # Fallback slot @modal
├── globals.scss        # Stiluri globale + CSS variables teme
└── layout.scss         # Stiluri container .main.root

src/middleware.ts       # Security headers + CORS
src/config/mongoDB.ts   # connectDB()
tailwind.config.ts
src/types.ts            # TypeScript interfaces globale
```

### Structura Root Layout

```
RootLayout
└── <html lang="ro">
    └── <body className={inter.className}>
        └── DarkThemeProvider
            └── <main> (max-width: 96rem, margin: auto)
                ├── Navbar
                ├── <div className="main root">
                │   ├── {children}      ← pagina curentă
                │   └── {modal}         ← @modal slot
                └── Footer
        └── <Toaster position="top-right" />
```

Context providers (`ExperienceContextProvider`, `NavbarFilterProvider`) mutați în layout-urile specifice feature-urilor lor, nu în root.

### Font

```typescript
// layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

### Metadata globală (fallback)

```typescript
export const metadata: Metadata = {
  title: { default: "Alexandru Roventa", template: "%s — Alexandru Roventa" },
  description: "Portfolio personal — Full Stack Developer.",
  icons: { icon: "/eu.png" },
};
```

### Middleware (`src/middleware.ts`)

Aplicat pe `/:path*`. Setează:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security`
- CORS: `Access-Control-Allow-Origin: https://alexandru-roventa.ro`

### MongoDB config

```typescript
// src/config/mongoDB.ts
export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;  // singleton
  await mongoose.connect(process.env.MONGO_URI!);
};
```

---

## TODO

- [ ] Font: Inter în loc de Roboto (+ `variable: "--font-inter"` pentru SCSS)
- [ ] Fix metadata icon path: `"/public/eu.png"` → `"/eu.png"`
- [ ] Metadata globală cu `template: "%s — Alexandru Roventa"` pentru paginile fără titlu propriu
- [ ] Mută `ExperienceContextProvider` în `src/app/experience/layout.tsx`
- [ ] Mută `NavbarFilterProvider` în `src/app/performance/layout.tsx`
- [ ] `sitemap.ts` și `robots.ts` în `src/app/` (generate automat de Next.js)
- [ ] CSP mai restrictiv: elimină `unsafe-inline`, `unsafe-eval`, `default-src *`
- [ ] MongoDB singleton: guard `readyState >= 1` înainte de `connect()`
- [ ] Elimină `dynamic = "force-dynamic"` din layout (setează per-page, nu global)
