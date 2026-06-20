# Experience

## PRD

Pagina `/experience` afișează un timeline al experienței profesionale, în ordine cronologică inversă.

- Design grafic de timeline: linie verticală + dot per item
- Logo companie vizibil (imagini reale, nu clase CSS)
- Fiecare item expandabil cu detalii extinse
- Ani total experiență calculați automat și afișați în header
- Animații scroll-triggered per item
- Adăugare / editare / ștergere experiențe protejată cu autentificare

---

## Tech Spec

### Fișiere

```
src/features/experience/
├── Experience.tsx              # Timeline principal
├── ExperienceItem.tsx          # Item din timeline (expand/collapse)
├── ExperienceHeader.tsx        # Header cu ani total calculați
└── experience.scss

src/app/experience/page.tsx
src/app/api/experience/route.ts           # GET /api/experience
src/app/api/experience/add-experience/route.ts  # POST
src/_lib/experience/getExperience.ts
src/models/experience/Experience.ts
src/models/experience/ActivationKey.ts    # Schema cheie activare (înlocuită de auth în v2)
```

### Schema MongoDB — Experience

```typescript
{
  idIncNumber: Number,
  startYear: Date,
  currentYear: Date | null,
  endYear: Date | null,
  isEnded: Boolean,
  companyLogo: String,          // URL imagine logo (v2) — nu mai e className CSS
  titleDescription: String,     // titlu job + companie
  descriptionMore: String,
}
```

### Cum funcționează

1. `page.tsx` apelează `getExperience()` → fetch `/api/experience`
2. `ExperienceHeader` calculează ani total: `currentYear - min(startYear)`
3. `ExperienceItem` gestionează expand/collapse cu state local
4. Adăugare: protejată de autentificare (v2 — înlocuiește sistemul de cheie one-time)

### Ani total experiență

```typescript
const totalYears = new Date().getFullYear() - Math.min(...experiences.map(e => new Date(e.startYear).getFullYear()));
```

### Pattern animații (scroll-triggered per item)

```typescript
<motion.div
  initial={{ opacity: 0, x: -24 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
```

---

## TODO

- [x] Design timeline vizual: linie verticală + dot per item
- [ ] Logo companie din imagini reale (înlocuiește clase CSS hardcodate în SCSS)
- [ ] Adaugă câmp `companyLogo: String` (URL) în schema MongoDB
- [x] Header cu ani total experiență calculați automat
- [x] Animații scroll-triggered pe fiecare item
- [ ] Autentificare reală pentru adăugare experiență (înlocuiește cheia one-time)
- [ ] Edit / delete experiențe din admin
- [ ] Simplifică structura de rute (elimină parallel routes `@addExperience/@mainExperience`)
