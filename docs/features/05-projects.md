# Projects

## v1 — Starea actuală

### Ce face
Pagina `/projects` afișează o listă de proiecte personale preluate din MongoDB, cu imagine thumbnail, link live, tehnologii folosite, repository GitHub și hosting.

### Fișiere implicate

```
src/app/projects/
└── page.tsx                        # Pagina /projects

src/components/projects/
├── Projects.tsx                    # Componenta principală — mapare proiecte
└── project.scss                    # Stiluri

src/app/api/projects/
└── route.ts                        # GET /api/projects

src/_lib/projects/
└── getProjects.ts                  # fetch() GET /api/projects

src/models/projects/
└── Projects.ts                     # Mongoose schema

public/projects/
├── project.png
├── projects2.png
└── alexandruroventa.png            # Thumbnails proiecte
```

### Schema MongoDB

```typescript
{
  title: String,
  link: String,               // domeniu live (ex: "alcrro.ro")
  thumbnailPhoto: String,     // nume fișier din /public/projects/
  languagesUsed: [],          // array de stringuri
  gitRepository: String,      // URL GitHub (fără https://)
  hosted: String,             // ex: "AWS Amplify"
  moreDescription: String     // descriere opțională
}
```

### Cum funcționează

1. `page.tsx` apelează `getProjects()` → fetch la `/api/projects`
2. API-ul face `Projects.find()` și returnează lista
3. `Projects.tsx` mapează fiecare proiect și afișează:
   - Titlu + link live (cu underline)
   - Thumbnail (`<Image>`) care e și link
   - Listă `<ul>` cu: Language used, GitHub repository, Hosted on, More description

### Probleme cunoscute (v1)

- Thumbnailurile sunt fișiere statice în `/public/projects/` — nu există upload din admin
- Nu există pagina de detalii per proiect (`/projects/[slug]`)
- Nu există filtru după tehnologie folosită
- Layout-ul este o listă verticală simplă, fără card design
- Link-urile GitHub și live sunt stringuri fără `https://` în baza de date, dar componenta adaugă `https://` hardcodat — inconsistență dacă datele se schimbă
- Nu există nicio pagină admin pentru adăugat/editat proiecte
- `moreDescription` nu are validare de lungime în schema

---

## v2 — Plan

### Ce se schimbă față de v1

| | v1 | v2 |
|---|---|---|
| Layout | Listă verticală simplă | Card grid 2-3 coloane |
| Tehnologii | Text `<div>` per tehnologie | Badge-uri colorate |
| Filtrare | Nu există | Filtru client-side după tehnologie |
| Detalii proiect | Nu există pagină dedicată | `/projects/[slug]` cu conținut extins |
| Animații | Nicio animație | Framer Motion staggered |
| Schema | Fără `slug` | Adaugă câmp `slug` generat automat |

---

### 1. Card grid layout + badge-uri tech

**Problema în v1:** Proiectele sunt afișate vertical, unul sub altul, cu un `<ul>` de proprietăți — layout de listă, nu de portofoliu.

**Soluție v2:** Grid cu card-uri vizuale.

**Layout grid:**
```scss
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
```

**Structură card:**
```
┌─────────────────────────────┐
│  [Thumbnail imagine]        │
│─────────────────────────────│
│  Titlu proiect              │
│  alcrro.ro ↗               │
│                             │
│  [React] [Next.js] [Mongo] │  ← badge-uri tech
│                             │
│  Hosted: AWS Amplify        │
│  [GitHub ↗]  [Live ↗]      │  ← butoane
└─────────────────────────────┘
```

**Badge-uri tehnologii:**

Fiecare tehnologie din `languagesUsed` → badge cu culoare specifică. Culorile sunt definite într-un map în componentă:

```typescript
// src/components/projects/techColors.ts
export const techColors: Record<string, { bg: string; text: string }> = {
  "React":      { bg: "#dbeafe", text: "#1d4ed8" },
  "Next.js":    { bg: "#f3f4f6", text: "#111827" },
  "TypeScript": { bg: "#ede9fe", text: "#6d28d9" },
  "MongoDB":    { bg: "#dcfce7", text: "#15803d" },
  "Node.js":    { bg: "#dcfce7", text: "#166534" },
  "Tailwind":   { bg: "#e0f2fe", text: "#0369a1" },
};
// fallback pentru tehnologii neliste:
// bg: "#f3f4f6", text: "#374151"
```

**Structură componente v2:**
```
src/components/projects/
├── ProjectsGrid.tsx            # Grid container
├── ProjectCard.tsx             # Card individual
├── TechBadge.tsx               # Badge tehnologie
├── techColors.ts               # Map culori tehnologii
├── Projects.tsx                # Eliminat sau repurposed
└── project.scss                # Stiluri actualizate
```

**Schema MongoDB — adaugă `slug`:**
```typescript
{
  title: String,
  slug: String,             // generat automat din title: "alcrro-ro"
  link: String,
  thumbnailPhoto: String,
  languagesUsed: [String],
  gitRepository: String,
  hosted: String,
  moreDescription: String,
}
```

**Notă `https://`:** Toate URL-urile (`link`, `gitRepository`) se stochează **cu** `https://` în DB — elimină logica `https://` hardcoded din componentă.

**Fișiere noi:**
- `src/components/projects/ProjectsGrid.tsx`
- `src/components/projects/ProjectCard.tsx`
- `src/components/projects/TechBadge.tsx`
- `src/components/projects/techColors.ts`

**Fișiere modificate:**
- `src/models/projects/Projects.ts` — adaugă `slug`, pre-save hook pentru generare
- `src/app/api/projects/route.ts` — returnează `slug` în response
- `src/app/projects/page.tsx` — importă `ProjectsGrid`
- `src/components/projects/project.scss` — stiluri card + grid

**Fișiere eliminate:**
- `src/components/projects/Projects.tsx` — înlocuit de `ProjectsGrid` + `ProjectCard`

---

### 2. Filtru după tehnologie

**Problema în v1:** Nu există nicio modalitate de a filtra proiectele după tehnologia folosită.

**Soluție v2:** Filtru client-side — fără request nou la server, filtrare pe datele deja încărcate.

**UI filtru:**
```
[ Toate ] [ React ] [ Next.js ] [ MongoDB ] [ TypeScript ] ...
```
Butoane/pill-uri generate dinamic din toate tehnologiile unice din lista de proiecte.

**Logică în `ProjectsGrid.tsx`:**
```typescript
// extrage toate tehnologiile unice
const allTechs = [...new Set(projects.flatMap(p => p.languagesUsed))].sort();

const [activeFilter, setActiveFilter] = useState<string | null>(null);

const filtered = activeFilter
  ? projects.filter(p => p.languagesUsed.includes(activeFilter))
  : projects;
```

**Comportament:**
- Click pe o tehnologie → afișează doar proiectele care o folosesc
- Click pe același filtru activ → dezactivează filtrul (revine la toate)
- Filtrul activ are styling diferit (border / background mai intens)
- Nu se adaugă în URL (filtru local, nu persistent) — simplitate > complexitate

**Fișiere modificate:**
- `src/components/projects/ProjectsGrid.tsx` — devine `"use client"`, include logica de filtrare
- `src/components/projects/project.scss` — stiluri butoane filtru + stare activă

---

### 3. Pagină detalii `/projects/[slug]`

**Problema în v1:** Nu există pagină dedicată per proiect — tot conținutul e pe `/projects` într-un card.

**Soluție v2:** Rută `/projects/[slug]` cu conținut extins.

**Structură fișiere:**
```
src/app/projects/
├── page.tsx                        # Lista proiecte (neschimbat ca rută)
└── [slug]/
    └── page.tsx                    # Pagina detalii proiect

src/components/projects/
└── ProjectDetail.tsx               # Componenta paginii de detalii

src/app/api/projects/
└── [slug]/
    └── route.ts                    # GET /api/projects/[slug]

src/_lib/projects/
├── getProjects.ts                  # neschimbat
└── getProject.ts                   # fetch() GET /api/projects/[slug] — fișier nou
```

**Conținut pagină detalii:**
- Titlu proiect + link live
- Thumbnail mare (sau gallery de screenshots dacă schema e extinsă ulterior)
- Descriere completă (`moreDescription`)
- Badge-uri tehnologii (același `TechBadge` din card)
- Hosting info
- Butoane: `[← Back to Projects]` `[GitHub ↗]` `[Live site ↗]`

**Metadata per proiect:**
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProject(params.slug);
  return {
    title: `${project.title} — Alexandru Roventa`,
    description: project.moreDescription || `Proiect: ${project.title}`,
  };
}
```

**`generateStaticParams`** — pre-generează paginile la build time:
```typescript
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(p => ({ slug: p.slug }));
}
```

**Fișiere noi:**
- `src/app/projects/[slug]/page.tsx`
- `src/components/projects/ProjectDetail.tsx`
- `src/app/api/projects/[slug]/route.ts`
- `src/_lib/projects/getProject.ts`

---

### 4. Animații staggered

**Problema în v1:** Pagina se încarcă static, cardurile apar toate deodată.

**Soluție v2:** Framer Motion — cardurile apar cu stagger la încărcare și se re-animează la schimbarea filtrului.

**Stagger la încărcare inițială:**
```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};
```

**Re-animare la schimbare filtru** — folosind `AnimatePresence` pentru exit + enter:
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeFilter ?? "all"}       // key diferit → re-montare → re-animare
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="projects-grid"
  >
    {filtered.map(project => (
      <motion.div key={project._id} variants={cardVariants}>
        <ProjectCard project={project} />
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>
```

**Fișiere modificate:**
- `src/components/projects/ProjectsGrid.tsx` — adaugă `motion.div` + `AnimatePresence`

---

### Fișiere afectate în total (v2)

| Fișier | Acțiune |
|---|---|
| `src/models/projects/Projects.ts` | Modificat — adaugă `slug` + pre-save hook |
| `src/app/api/projects/route.ts` | Modificat — returnează `slug` |
| `src/app/api/projects/[slug]/route.ts` | **Nou** — GET proiect singular |
| `src/app/projects/page.tsx` | Modificat — importă `ProjectsGrid` |
| `src/app/projects/[slug]/page.tsx` | **Nou** — pagină detalii |
| `src/components/projects/ProjectsGrid.tsx` | **Nou** — grid + filtru + animații |
| `src/components/projects/ProjectCard.tsx` | **Nou** — card vizual |
| `src/components/projects/ProjectDetail.tsx` | **Nou** — pagină detalii |
| `src/components/projects/TechBadge.tsx` | **Nou** — badge reutilizabil |
| `src/components/projects/techColors.ts` | **Nou** — map culori tehnologii |
| `src/_lib/projects/getProject.ts` | **Nou** — fetch singular |
| `src/components/projects/project.scss` | Modificat — stiluri card, grid, filtru |
| `src/components/projects/Projects.tsx` | **Eliminat** |
