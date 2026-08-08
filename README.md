<div align="center">

<img src="./preview.png" alt="Alexandru Roventa — Portfolio" width="100%" style="border-radius: 12px;" />

# Alexandru Roventa — Portfolio

**Full-Stack Developer · React · Node.js · TypeScript**

[![Live](https://img.shields.io/badge/Live-alexandru--roventa.ro-0284c7?style=flat-square&logo=vercel)](https://alexandru-roventa.ro)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?style=flat-square&logo=mongodb)](https://mongoosejs.com)

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
| Deployment | AWS Amplify |

---

## Features

- **Experience** — timeline with animations, roles, and company details
- **Skills** — categorized tech stack display
- **Certificates** — filterable, paginated certificate gallery with search
- **Performance / Knowledge** — curated learning log with community rating
- **Contact** — email form with validation
- **CV** — print-ready CV page generated from structured data
- **Dark / Light mode** — persistent theme via `next-themes`

---

## Security

The application has gone through a dedicated security audit focused on API abuse, database integrity, and cost-generating attack vectors.

Key measures in place:

- **Rate limiting** — Upstash Redis sliding window on all public endpoints
- **Input validation** — server-side validation and schema-level constraints on all write operations
- **Authentication** — all database write routes require authorization
- **Security headers** — CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **NoSQL protection** — regex input escaping on all database queries
- **IP spoofing mitigation** — trusted IP extraction compatible with AWS CloudFront

---

## Environment Variables

```env
MONGO_URI=               # MongoDB connection string
NEXTAUTH_URL=            # Public URL (e.g. https://alexandru-roventa.ro)
RESEND_API_KEY=          # Resend API key for email
CONTACT_EMAIL=           # Email destination for contact form
UPSTASH_REDIS_REST_URL=  # Upstash Redis URL
UPSTASH_REDIS_REST_TOKEN=# Upstash Redis token
ADMIN_SECRET=            # Secret for protected admin API routes
```

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
```
