# About

## v1 — Starea actuală

### Ce face
Pagina `/about` afișează un text extins despre Alexandru Roventa. Folosește aceeași componentă `AboutMeContent` ca și homepage-ul, dar cu o clasă CSS diferită (`second-layer` în loc de `main-layer`).

### Fișiere implicate

```
src/app/about/
└── page.tsx                    # Pagina /about

src/components/home/aboutMe/
├── AboutMe.tsx                 # Container cu clasa about-me-container
├── AboutMeContent.tsx          # Conținut text (partajat cu homepage)
└── aboutMe.scss                # Stiluri
```

### Cum funcționează

- `page.tsx` randează `<AboutMe />` care la rândul lui randează `<AboutMeContent />`
- `AboutMeContent` detectează path-ul cu `usePathname()`:
  - pe `/` → aplică clasa `main-layer`
  - pe `/about/me` (modal) → aplică clasa `second-layer`
- Conținutul text este identic în ambele cazuri — diferă doar stilizarea

### Probleme cunoscute (v1)

- Textul este hardcodat direct în JSX — nu e editabil fără cod
- Reutilizarea componentei cu `usePathname()` pentru a distinge contextul este fragil și confuz
- Pagina nu are metadata SEO proprie (moștenește din layout)
- Nu există structurare vizuală (skills vizuale, timeline, etc.)
- Nu există o pagină `/about` dedicată cu conținut distinct față de homepage

---

## v2 — Plan

### Ce se schimbă față de v1

| | v1 | v2 |
|---|---|---|
| Componentă | Partajată cu homepage (`AboutMeContent`) | Componentă proprie dedicată paginii `/about` |
| Conținut | Un singur bloc de text | Secțiuni distincte: intro, educație, experiență scurtă, tehnologii |
| Metadata | Moștenită din layout (generică) | Title + description specifice pentru `/about` |
| Animații | Nicio animație | Framer Motion `whileInView` per secțiune |

---

### 1. Component separat de Homepage

**Problema în v1:** `AboutMeContent` este partajat între homepage și `/about`, distingând contextul prin `usePathname()` intern — logică fragilă și confuză. Pagina `/about` nu are conținut distinct față de homepage.

**Soluție v2:** Componentă proprie pentru pagina `/about`, independentă de homepage.

**Structură nouă:**
```
src/app/about/
└── page.tsx                        # Pagina /about — importă AboutPage

src/components/about/               # Folder nou, separat de /home
├── AboutPage.tsx                   # Componentă root a paginii
├── AboutIntro.tsx                  # Paragraful introductiv (text scurt, rezumat)
├── AboutEducation.tsx              # Secțiunea Educație
├── AboutExperienceSummary.tsx      # Rezumat experiență (ani, domenii)
├── AboutTech.tsx                   # Tehnologii folosite (fără nivele — asta e la /skills)
└── about.scss                      # Stiluri comune
```

**Ce se întâmplă cu `AboutMeContent.tsx`:**
- Rămâne în `src/components/home/aboutMe/` și este folosit **doar pe homepage**
- Primește prop `variant` (planificat în Home v2) în loc de `usePathname()`
- Nu mai este importat în `/about/page.tsx`

**Fișiere noi:**
- `src/components/about/AboutPage.tsx`
- `src/components/about/AboutIntro.tsx`
- `src/components/about/AboutEducation.tsx`
- `src/components/about/AboutExperienceSummary.tsx`
- `src/components/about/AboutTech.tsx`
- `src/components/about/about.scss`

**Fișiere modificate:**
- `src/app/about/page.tsx` — importă `<AboutPage />` în loc de `<AboutMe />`

---

### 2. Secțiuni distincte

**Problema în v1:** Pagina `/about` afișează același text ca homepage-ul — nu adaugă nicio valoare în plus față de ce vede utilizatorul pe Home.

**Soluție v2:** Pagina `/about` devine o pagină completă cu 4 secțiuni distincte.

#### Secțiunea 1 — Intro
Text scurt de prezentare (2-3 propoziții), mai direct decât cele 4 paragrafe din v1. Scopul: cine ești și ce faci în maximum 5 secunde de citit.

```
Alexandru Roventa
Full Stack Developer cu peste 10 ani experiență în web development.
Specializat în Next.js, React și Node.js.
```

#### Secțiunea 2 — Educație

Structură tabelară sau card-uri pentru:

| Instituție | Perioadă | Domeniu |
|---|---|---|
| Facultatea de Automatică și Informatică Aplicată | 2013–2017 | Informatică Aplicată |
| Liceul de Electrotehnică și Electronică | 2009–2013 | Electronică |

Conținut hardcodat în componentă (nu e date care se schimbă des).

#### Secțiunea 3 — Experiență scurtă

Număr de ani de experiență + domeniile principale. Nu lista completă (aia e pe `/experience`), ci un rezumat de tipul:

```
10+ ani experiență în web development
Frontend: React, Next.js, TypeScript
Backend: Node.js, MongoDB, REST APIs
```

Link CTA la finalul secțiunii: `→ Vezi experiența completă` → `/experience`

#### Secțiunea 4 — Tehnologii

Grid cu tehnologiile principale (fără nivele de competență — asta e responsabilitatea paginii `/skills`). Scopul e vizualizare rapidă a stack-ului.

```
[ Next.js ]  [ React ]  [ TypeScript ]
[ Node.js ]  [ MongoDB ] [ Tailwind ]
[ Git ]      [ Docker ]  [ AWS ]
```

Implementare: array de stringuri sau obiecte `{ name, icon }` hardcodate în `AboutTech.tsx`.

**Notă:** Conținutul tuturor secțiunilor rămâne hardcodat în componentele respective (nu CMS, nu MongoDB) — datele despre educație și experiență nu se schimbă des și nu justifică un sistem de editare.

---

### 3. Metadata SEO proprie

**Problema în v1:** Pagina `/about` nu are `export const metadata` propriu — moștenește din `layout.tsx` titlul generic `"Alexandru Roventa - Home"` și description `"Home"`.

**Soluție v2:** Adaugă metadata specifică în `src/app/about/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: "About — Alexandru Roventa",
  description: "Află mai multe despre Alexandru Roventa — Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
  openGraph: {
    title: "About — Alexandru Roventa",
    description: "Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
    url: "https://alexandru-roventa.ro/about",
    type: "profile",
  },
};
```

**Fișiere modificate:**
- `src/app/about/page.tsx` — adaugă `export const metadata`

---

### 4. Animații scroll-triggered

**Problema în v1:** Pagina este complet statică, fără nicio tranziție sau animație.

**Soluție v2:** Framer Motion `whileInView` pe fiecare din cele 4 secțiuni — apar progresiv pe măsură ce utilizatorul scrollează.

**Pattern folosit (consistent cu Home v2):**
```typescript
<motion.section
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

`viewport={{ once: true }}` — animația se joacă o singură dată per sesiune, nu la fiecare scroll.

**Stagger pentru grid-ul de tehnologii** din `AboutTech`:
```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 }
};
```

**Fișiere modificate:**
- `src/components/about/AboutPage.tsx` — `"use client"`, `motion.section` pe fiecare secțiune
- `src/components/about/AboutTech.tsx` — stagger pe badge-urile de tehnologii

---

### Fișiere afectate în total (v2)

| Fișier | Acțiune |
|---|---|
| `src/components/about/AboutPage.tsx` | **Nou** |
| `src/components/about/AboutIntro.tsx` | **Nou** |
| `src/components/about/AboutEducation.tsx` | **Nou** |
| `src/components/about/AboutExperienceSummary.tsx` | **Nou** |
| `src/components/about/AboutTech.tsx` | **Nou** |
| `src/components/about/about.scss` | **Nou** |
| `src/app/about/page.tsx` | Modificat — importă `AboutPage`, adaugă `metadata` |
| `src/components/home/aboutMe/AboutMeContent.tsx` | Modificat — nu mai folosește `usePathname()` (aliniat cu Home v2) |
