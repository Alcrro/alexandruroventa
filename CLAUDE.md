# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comenzi frecvente

```bash
npm run dev       # dev server pe localhost:3000
npm run build     # build de producție (setează NODE_ENV=production)
npm run lint      # ESLint
npm test          # Jest (jsdom, ts-jest)
npm run coverage  # coverage 100% branches/functions/lines pentru src/components/
```

Testele vizează exclusiv `src/components/` (UI generic reutilizabil). Feature-urile din `src/features/` nu sunt acoperite de teste.

## Variabile de mediu

```
MONGO_URI          # MongoDB connection string
NEXTAUTH_URL       # URL-ul public al aplicației (ex: https://alexandru-roventa.ro)
RESEND_API_KEY     # API key Resend pentru email
CONTACT_EMAIL      # email destinatar pentru formular (fallback: alexandru@alexandru-roventa.ro)
```

Fișierul `.env.local` nu există în repo — se generează la build (vezi `amplify.yml`).

## Arhitectură

**Framework:** Next.js 14 (App Router), deployed pe AWS Amplify sau Docker.

### Flux de date

Paginile nu accesează MongoDB direct. Fluxul este:

```
page.tsx / _lib/*.ts  →  fetch(NEXTAUTH_URL/api/...)  →  app/api/route.ts  →  connectDB() + Mongoose model
```

- `src/config/mongoDB.ts` — `connectDB()`, apelată la începutul fiecărui API route
- `src/models/` — scheme Mongoose (`certificates/`, `experience/`, `projects/`, `skills/`, etc.)
- `src/_lib/` — funcții de fetch server-side care apelează propriile API routes (cu `next: { revalidate: 86400 }` sau `cache: "no-cache"`)
- `src/app/api/` — API routes (GET/POST), folosesc `connectDB()` + modele

### `export const dynamic = "force-dynamic"`

Setat la nivel de `src/app/layout.tsx` și repetat în fiecare `page.tsx` care are date dinamice. Nu se omite la pagini noi.

### Modal pattern (parallel + intercepting routes)

Contactul se deschide ca modal pe desktop și ca pagină separată pe mobile, folosind:
- `src/app/@modal/(.)contact/me/page.tsx` — intercepting route care randează modalul
- `src/app/default.tsx` — fallback pentru slotul `@modal`

Același pattern se aplică și la certificate: `src/app/certificates/@modal/(..)certificates/[slug]/`.

### Context

`ExperienceContextProvider` (din `src/context/experienceContext/`) este wrapuit în `layout.tsx` în jurul întregii aplicații. Middleware-ul (`src/middleware.ts`) adaugă headere de securitate și CORS (permite doar `https://alexandru-roventa.ro`).

## Structură foldere — Feature Folders

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
├── components/             ← DOAR UI generic reutilizabil cross-feature
├── config/                 ← mongoDB.ts, navigation.ts
├── app/                    ← DOAR pages (page.tsx, layout.tsx, loading.tsx)
│   └── api/                ← API routes
├── _lib/                   ← funcții fetch / utilitare server-side
├── models/                 ← Mongoose schemas
├── context/                ← React Context providers
└── types.ts                ← TypeScript interfaces globale
```

### Reguli

- **Componentă nouă pentru un feature** → `src/features/[feature]/ComponentName.tsx`
- **Stiluri** → `src/features/[feature]/feature.scss` (un fișier scss per feature, nu per componentă)
- **Componentă reutilizată în 2+ feature-uri** → mută în `src/components/`
- **Pagina (page.tsx)** → rămâne în `src/app/`, importă din `src/features/`
- **API routes** → rămân în `src/app/api/`
- **Fetch functions** → rămân în `src/_lib/`
- Nu se creează subfoldere per componentă în `features/`
- Nu se folosește atomic design (atoms/molecules/organisms)

## Design System

Variabilele CSS sunt definite în `src/app/globals.scss` și expuse în `tailwind.config.ts`.

### Culori (Tailwind classes)
| Class | Token | Light | Dark |
|---|---|---|---|
| `bg-bg` | `--bg` | `#f5f0eb` (warm ivory) | `#0d1117` (deep navy) |
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
- **Culori:** folosește întotdeauna `var(--token)` în SCSS sau clasele Tailwind din tabel — nu hardcoda `#hex`
- **Culori vechi** (`---background-color` etc.) — doar în fișierele din `src/components/` (backward compat), nu în `src/features/`
- **Teme:** `next-themes` cu `attribute="class"`, dark mode via `darkMode: "class"` în Tailwind

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + SCSS
- **Animații:** Framer Motion
- **DB:** MongoDB via Mongoose
- **Email:** Resend
- **Teme:** next-themes

## Docs

Documentația feature-urilor se află în `/docs/features/`. Fiecare feature are v1 (starea actuală) și v2 (planul de îmbunătățire) în același fișier.
