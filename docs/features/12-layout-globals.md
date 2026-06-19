# Layout & Globals

## v1 — Starea actuală

### Ce face
Root layout-ul wrappează întreaga aplicație: font, providers, navbar, footer, modal slot. `globals.scss` definește stilurile globale și variabilele de temă. `layout.scss` definește spacing-ul pentru container-ul principal.

### Fișiere implicate

```
src/app/
├── layout.tsx              # Root layout — wrappează toată aplicația
├── globals.scss            # Stiluri globale + CSS variables teme
├── layout.scss             # Stiluri container .main.root
└── default.tsx             # Default slot pentru parallel routes

tailwind.config.ts          # Configurare Tailwind CSS
src/middleware.ts           # CORS + security headers
src/types.ts                # TypeScript interfaces globale
src/config/mongoDB.ts       # Conexiune MongoDB
```

### Root Layout (`layout.tsx`)

```
RootLayout
└── <html lang="en">
    └── <body className={roboto.className}>
        └── DarkThemeProvider
            └── <main> (max-width: 96rem, margin: auto)
                ├── Navbar
                ├── NavbarFilterProvider
                │   └── ExperienceContextProvider
                │       └── <div className="main root">
                │           ├── {children}      ← pagina curentă
                │           └── {modal}         ← @modal slot
                └── Footer
        └── <Toaster position="top-right" />
```

**Font:** Roboto (weight: 400, 700 — normal + italic)

**Metadata globală:**
```typescript
{
  title: "Alexandru Roventa - Home",
  description: "Home",
  icons: { icon: "/public/eu.png" }   // path greșit — ar trebui "/eu.png"
}
```

### Middleware (`middleware.ts`)

Aplicat pe toate rutele (`/:path*`). Setează:
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Strict-Transport-Security`
- CSP: `default-src * data: blob: 'unsafe-inline' 'unsafe-eval'` (permisiv)
- CORS: `Access-Control-Allow-Origin` doar pentru `https://alexandru-roventa.ro`
- Cache: `s-maxage=86700`

### MongoDB Config (`config/mongoDB.ts`)

```typescript
export const connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI!);
}
```
- `connectDB()` este apelat direct în fiecare API route (nu e singleton pattern clar)
- Connection events (`Connected`, `error`) sunt logați dar `process.exit()` la eroare este periculos în producție

### Probleme cunoscute (v1)

- **Metadata icon path greșit**: `"/public/eu.png"` → în Next.js calea corectă e `"/eu.png"` (public/ e implicit)
- `ExperienceContextProvider` este în root layout — wrappează toate paginile, dar e necesar doar pe `/experience`
- `NavbarFilterProvider` e în root layout dar probabil necesar doar pe `/performance`
- `dynamic = "force-dynamic"` setat în `layout.tsx` → dezactivează orice caching pentru toate paginile
- Tailwind config extinde doar `backgroundImage` — temele nu folosesc Tailwind tokens
- Build script hardcodat Windows: `"set NODE_ENV=production && next build"` → nu funcționează pe Linux/Mac
- CSP este prea permisiv (`unsafe-inline`, `unsafe-eval`, `default-src *`)
- `connectDB()` apelat de mai multe ori (una per route) — ar trebui connection pooling corect

### Idei v2

- [ ] Fix metadata icon: `"/public/eu.png"` → `"/eu.png"`
- [ ] Mută `ExperienceContextProvider` și `NavbarFilterProvider` în layout-urile specifice
- [ ] Font: Inter în loc de Roboto (mai modern)
- [ ] Metadata completă: Open Graph, Twitter Cards, canonical URL
- [ ] Fix build script pentru cross-platform: `"next build"` fără `set`
- [ ] CSP mai restrictiv
- [ ] Singleton MongoDB connection cu pattern corect
- [ ] `sitemap.ts` și `robots.ts` generate automat de Next.js
- [ ] Extinde Tailwind config cu design tokens (culori, spacing, tipografie)
