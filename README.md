<div align="center">

<img src="./preview.png" alt="Alexandru Roventa — Portfolio" width="100%" style="border-radius: 12px;" />

# Alexandru Roventa — Portfolio

**Full-Stack Developer · React · Node.js · TypeScript**

[![Live](https://img.shields.io/badge/Live-alexandruroventa.vercel.app-0284c7?style=flat-square&logo=vercel)](https://alexandruroventa.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?style=flat-square&logo=mongodb)](https://mongoosejs.com)
[![Coverage](https://img.shields.io/badge/Coverage-100%25-22c55e?style=flat-square&logo=jest)](./src/components)

</div>

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + SCSS |
| Animations | Framer Motion |
| Database | MongoDB via Mongoose |
| Email | Resend |
| Deployment | Vercel |
| Testing | Jest + ts-jest (jsdom) |

---

## Features

### Experience
Interactive timeline with animated entrance, role descriptions, expandable detail chips, and company logos. Each item is driven by MongoDB data — no hardcoded content.

### Skills
Categorized tech stack display pulled from the database, with icon rendering and category grouping. Editable via a protected `/skills/add-skill` admin route.

### Projects
Full project gallery with tech filtering by category (dropdown menus with icon badges), animated card grid, and individual project detail pages. Each project supports multiple screenshots (carousel), a roadmap board (shipped / in-progress / planned), and a database schema visualizer.

### Certificates
Filterable, paginated certificate gallery. Filters by issuing platform and topic. Sort by date. Data fetched from MongoDB and cached for 24 hours.

### Performance / Knowledge Log
A curated index of solved algorithms and course exercises, organized by category. Each entry has a Monaco code editor (syntax-highlighted, read-only), version history, and a community star rating system stored in MongoDB.

### CV
Print-ready CV generated from a structured `resume.json` file — no manual HTML editing. Supports two themes (Technical / Corporate) and two languages (EN / RO), switchable at runtime. Renders correctly when printed via `window.print()`.

### Contact
Email form with server-side validation, honeypot spam protection, rate limiting, and toast feedback. Sends via Resend API. Includes animated 3D card tilt on hover.

### Theme
Persistent dark/light mode via `next-themes`, toggled via a navbar button. Theme is stored in a cookie and applied before first paint — no flash.

---

## Architecture

### Data Flow

Pages never access MongoDB directly. All data goes through internal API routes:

```
page.tsx / _lib/*.ts  →  fetch(NEXTAUTH_URL/api/...)  →  app/api/route.ts  →  connectDB() + Mongoose model
```

Server-side fetch functions in `_lib/` use `next: { revalidate: 86400 }` for cached data (skills, certificates, projects) or `cache: "no-cache"` for dynamic data.

### Folder Structure

```
src/
├── features/          # Feature-scoped components (one folder per page section)
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
├── components/        # Generic, reusable UI (used across 2+ features)
├── app/               # Next.js pages + API routes
│   └── api/
├── _lib/              # Server-side fetch utilities
├── models/            # Mongoose schemas
├── context/           # React Context providers
├── config/            # DB connection, navigation config
└── types.ts           # Global TypeScript interfaces
```

### Modal Pattern

Contact and certificate detail pages use Next.js parallel + intercepting routes:
- Desktop: opens as a modal overlay without a full page navigation
- Mobile: renders as a standalone page
- Implemented via `@modal` slot in `layout.tsx` and `(.)contact/me` intercepting route

---

## Security

Dedicated security audit across API abuse, database integrity, and cost-generating attack vectors.

| Measure | Implementation |
|---|---|
| Rate limiting | Upstash Redis sliding window on all public endpoints |
| Input validation | Server-side schema validation on all write operations |
| Authentication | All database write routes require `ADMIN_SECRET` header |
| Security headers | CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| NoSQL protection | Regex input escaping on all database queries |
| Spam protection | Honeypot field on contact form |
| IP spoofing | Trusted IP extraction compatible with AWS CloudFront |

---

## Testing

100% branch, function, and line coverage on all components in `src/components/`.

```bash
npm test              # run tests
npm run coverage      # coverage report
```

Tests use Jest with `ts-jest` and `jsdom`. Feature-specific code in `src/features/` is excluded from coverage requirements.

---

## Environment Variables

```env
MONGO_URI=                  # MongoDB connection string
NEXTAUTH_URL=               # Public URL (e.g. https://alexandru-roventa.ro)
RESEND_API_KEY=             # Resend API key for email
CONTACT_EMAIL=              # Email destination for contact form
UPSTASH_REDIS_REST_URL=     # Upstash Redis URL
UPSTASH_REDIS_REST_TOKEN=   # Upstash Redis token
ADMIN_SECRET=               # Secret for protected admin API routes
```

`.env.local` is not committed — it is generated at build time via `amplify.yml`.

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # ESLint
npm test          # Jest
```
