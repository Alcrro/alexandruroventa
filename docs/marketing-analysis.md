# Portfolio Marketing Analysis

## Ce funcționează

- **CV page** cu toggle tehnic/corporate + EN/RO — diferențiator real, puțini au asta
- **3D tilt** pe FeaturedProjectCard — detaliu de calitate
- **Foto în hero** — personalizează, bine

---

## Probleme reale de marketing

### 1. Hero-ul e prea generic
`"Full Stack Developer"` îl spun toți. Formularea corectă există deja în `resume.json`:
> `"Full-Stack Developer · SaaS Products · AI Integration"`
Nu e folosită în hero.

### 2. "Open CV" duce la PDF pe S3, nu la `/cv`
Cea mai mare ratare. CV-ul interactiv cu toggle tehnic/corporate și EN/RO e mult mai impresionant decât un PDF static. Vizitatorii care ajung la `/cv` văd că ești atent la detalii. PDF-ul nu arată asta.

**Fix:** CTA-ul din hero → `/cv` în loc de link S3.

### 3. About se termină slab
> *"I'm open to new opportunities as a software developer"*

Pasiv, generic, sună a CV din 2015. Rulezi două SaaS-uri active independent — asta e poziționarea, nu „open to opportunities".

### 4. Lipsește un mesaj clar de valoare
Home-ul spune cine ești, dar nu spune *ce poți face pentru vizitator* — recrutor, client freelance, partener. Nu există un hook care să răspundă la „de ce eu și nu altcineva".

---

## web-services-platform — merită adăugat în projects?

**Da.** Stack-ul diferit (Prisma, PostgreSQL, Claude AI, TanStack) față de restul proiectelor MERN arată breadth real. Relevant în special pentru clienți B2B sau roluri care cer experiență cu tooling modern.

---

## Prioritate fix-uri

| # | Fix | Impact |
|---|-----|--------|
| 1 | Hero subtitle: `"Full Stack Developer"` → label din resume.json | Ridicat |
| 2 | CTA „Open CV" → `/cv` în loc de PDF S3 | Ridicat |
| 3 | Rewrite finalul din About | Mediu |
| 4 | Adaugă web-services-platform în projects grid | Mediu |
