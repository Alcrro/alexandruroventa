# Tech Spec — Portfolio Alexandru Roventa

## Stack

| Categorie | Tehnologie | Versiune |
|---|---|---|
| Framework | Next.js (App Router) | 14 |
| Runtime UI | React | 18 |
| Limbaj | TypeScript | 5 |
| Styling | Tailwind CSS + SCSS | — |
| Animații | Framer Motion | 11 |
| Bază de date | MongoDB via Mongoose | 8 |
| Email | Resend | 3 |
| Teme | next-themes | 0.3 |
| Font | Inter (next/font/google) | — |
| Deploy | AWS Amplify / Docker | — |

---

## Arhitectură

### Structura folderelor

```
src/
├── features/               ← tot codul specific unui feature
│   ├── navbar/
│   ├── home/
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── certificates/
│   ├── experience/
│   ├── performance/
│   ├── contact/
│   ├── footer/
│   └── theme/
├── components/             ← UI generic reutilizabil cross-feature
├── app/                    ← pages (page.tsx, layout.tsx, loading.tsx)
│   └── api/                ← API routes
├── _lib/                   ← funcții fetch / utilitare server-side
├── models/                 ← Mongoose schemas
├── config/                 ← mongoDB.ts, navigation.ts
├── context/                ← React Context providers
└── types.ts                ← TypeScript interfaces globale
```

### Reguli de organizare

- Componentă nouă pentru un feature → `src/features/[feature]/ComponentName.tsx`
- Stiluri → `src/features/[feature]/feature.scss` (un fișier scss per feature)
- Componentă folosită în 2+ feature-uri → `src/components/`
- Pagina (`page.tsx`) → `src/app/`, importă din `src/features/`
- API routes → `src/app/api/`
- Fetch functions → `src/_lib/`
- Nu se creează subfoldere per componentă în `features/`

---

## Flux de date

Paginile nu accesează MongoDB direct. Fluxul este:

```
page.tsx / _lib/*.ts  →  fetch(NEXTAUTH_URL/api/...)  →  app/api/route.ts  →  connectDB() + Mongoose model
```

- `src/config/mongoDB.ts` — `connectDB()`, apelată la începutul fiecărui API route
- `src/models/` — scheme Mongoose
- `src/_lib/` — funcții fetch server-side (`next: { revalidate: 86400 }` sau `cache: "no-cache"`)
- `src/app/api/` — API routes GET/POST

### `export const dynamic = "force-dynamic"`

Setat în `src/app/layout.tsx` și repetat în fiecare `page.tsx` cu date dinamice. Obligatoriu pe pagini noi cu date din MongoDB.

---

## Patterns arhitecturale

### Modal cu intercept + parallel routes

Contact și Certificate folosesc același pattern:

```
Click pe link → intercept route (@modal) → modal pe desktop
Acces direct la URL → pagina full pe mobile
```

**Contact:**
- `src/app/@modal/(.)contact/me/page.tsx` — intercepting route modal
- `src/app/default.tsx` — fallback slot `@modal`

**Certificate:**
- `src/app/certificates/@modal/(..)certificates/[slug]/page.tsx`

### Server Components + Client Components

- Server Components: fetch date, nu au interactivitate
- Client Components (`"use client"`): stare, event handlers, hooks (usePathname, useRouter, etc.)
- Pattern: Server Component preia date → le pasează ca props la Client Component

### Filtrare cu query params (pattern v2)

```
/certificates?org=Udemy&sort=date&order=desc&page=1
```

Server Component citește `searchParams` → pasează la fetch → API construiește query MongoDB.
Client Component (`CertificatesFilter`) folosește `useRouter` + `useSearchParams` pentru a actualiza URL-ul fără page reload.

---

## Design System

### Variabile CSS (definite în `globals.scss`, expuse în `tailwind.config.ts`)

| Tailwind class | Token CSS | Light | Dark |
|---|---|---|---|
| `bg-bg` | `--bg` | `#f5f0eb` | `#0d1117` |
| `bg-surface` | `--bg-surface` | `#fffefb` | `#161b22` |
| `bg-elevated` | `--bg-elevated` | `#ede8e3` | `#21262d` |
| `text-primary` | `--text-primary` | `#111827` | `#f1f5f9` |
| `text-secondary` | `--text-secondary` | `#6b7280` | `#94a3b8` |
| `text-muted` | `--text-muted` | `#9ca3af` | `#64748b` |
| `text-accent` / `bg-accent` | `--accent` | `#0284c7` | `#38bdf8` |

### Tipografie

- **Font:** Inter (via `next/font/google`, variabila `--font-inter`)
- **Mărimi:** `text-sm` · `text-base` · `text-lg` · `text-xl` · `text-2xl` · `text-3xl` · `text-4xl` · `text-5xl`

### Border radius

`rounded-sm` (4px) · `rounded-md` (8px) · `rounded-lg` (16px) · `rounded-xl` (24px) · `rounded-full`

### Reguli de utilizare

- **Features noi:** folosește `var(--token)` în SCSS sau clasele Tailwind din tabel — nu hardcoda `#hex`
- **Culori vechi** (`---background-color` etc.) — doar în `src/components/` pentru backward compat, nu în `src/features/`
- **Teme:** `next-themes` cu `attribute="class"`, dark mode via `darkMode: "class"` în Tailwind

---

## Animații — Framer Motion

### Pattern stagger (pentru grile de carduri)

```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
};
```

### Pattern scroll-triggered (pentru secțiuni)

```typescript
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

`once: true` — animația se joacă o singură dată, nu la fiecare scroll.

---

## Variabile de mediu

```
MONGO_URI          # MongoDB connection string
NEXTAUTH_URL       # URL-ul public al aplicației (ex: https://alexandru-roventa.ro)
RESEND_API_KEY     # API key Resend pentru email
```

Fișierul `.env.local` nu există în repo — se generează la build (vezi `amplify.yml`).

---

## Deploy

- **AWS Amplify**: build via `amplify.yml`, variabile de mediu setate în consola Amplify
- **Docker**: Dockerfile disponibil, build cu `npm run build`
- **Build script**: `next build` (cross-platform — fără `set NODE_ENV=production`)

---

## Middleware (`src/middleware.ts`)

Aplicat pe toate rutele. Setează:
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `HSTS`
- CORS: `Access-Control-Allow-Origin` → `https://alexandru-roventa.ro`
- Cache: `s-maxage=86700`

CSP target: restrictiv (elimină `unsafe-inline` și `unsafe-eval` unde posibil).

---

## MongoDB — Pattern conexiune

```typescript
// src/config/mongoDB.ts
export const connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI!);
};
```

Apelată la începutul fiecărui API route. Target v2: singleton cu connection pooling corect.
