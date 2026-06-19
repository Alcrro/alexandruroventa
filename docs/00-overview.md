# Proiect: alexandruroventa — Overview

## Stack tehnic (v1)

| Categorie | Tehnologie | Versiune |
|---|---|---|
| Framework | Next.js | 14.2.3 |
| Runtime UI | React | 18 |
| Limbaj | TypeScript | 5.5.3 |
| Styling | Tailwind CSS + SCSS + Bootstrap | 3.4.1 / 5.3.3 |
| UI Components | Chakra UI | 2.8.2 |
| Animații | Framer Motion | 11.2.10 (instalat, nefolosit) |
| Bază de date | MongoDB (via Mongoose) | 8.4.1 |
| Email | Resend | 3.2.0 |
| Editor cod | Monaco Editor | 4.6.0 |
| Teme | next-themes | 0.3.0 |
| Font | Roboto (Google Fonts) | — |
| Notificări | react-hot-toast | 2.4.1 |
| Deploy | AWS Amplify | — |

## Structura aplicației

```
src/
├── app/                    # Next.js App Router (pagini + API routes)
│   ├── api/                # REST API endpoints
│   ├── about/
│   ├── certificates/
│   ├── contact/
│   ├── experience/
│   ├── knowledge/
│   ├── performance/
│   ├── projects/
│   ├── skills/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Componente reutilizabile
├── _lib/                   # Funcții fetch / utilitare
├── models/                 # Mongoose schemas
├── config/                 # Conexiune MongoDB
├── context/                # React Context providers
└── types.ts                # TypeScript interfaces
```

## Pagini existente (v1)

| Rută | Descriere |
|---|---|
| `/` | Homepage: profil + about me |
| `/about` | Pagina about extinsă |
| `/skills` | Listă skill-uri |
| `/projects` | Proiecte personale |
| `/certificates` | Certificări cu filtrare și paginare |
| `/experience` | Timeline experiență profesională |
| `/performance/[category]` | Tracker algoritmi / cursuri per limbaj |
| `/contact` | Formular contact |
| `/contact/me` | Formular contact (modal intercept) |

## Probleme cunoscute (v1)

- Mix de 3 sisteme de styling (Tailwind + SCSS + Bootstrap) care se suprapun
- Chakra UI folosit doar pentru editorul de cod, overhead mare
- Framer Motion instalat dar nefolosit
- Metadata SEO minimală (title + description generic pe toate paginile)
- `dynamic = "force-dynamic"` pe mai multe pagini fără necesitate clară
- CSS variables cu prefix triplu `---` (non-standard)
- `build` script hardcodat pentru Windows (`set NODE_ENV=production`)
- Copyright footer scrie `20023-2024` (typo)

## Documente

### Features
- [Navbar](./features/01-navbar.md)
- [Home & Profile](./features/02-home.md)
- [About](./features/03-about.md)
- [Skills](./features/04-skills.md)
- [Projects](./features/05-projects.md)
- [Certificates](./features/06-certificates.md)
- [Experience](./features/07-experience.md)
- [Performance](./features/08-performance.md)
- [Contact](./features/09-contact.md)
- [Footer](./features/10-footer.md)
- [Theme (Dark/Light)](./features/11-theme.md)
- [Layout & Globals](./features/12-layout-globals.md)

### Analize
- [De ce Next.js? — Tech Stack Decision](./tech-stack-decision.md)
