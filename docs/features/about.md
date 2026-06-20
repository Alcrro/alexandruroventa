# About

## PRD

Pagina `/about` trebuie să fie distinctă față de homepage — nu același text, ci o prezentare structurată pe secțiuni.

- **Intro**: text scurt 2-3 propoziții (cine ești, ce faci)
- **Educație**: instituții + perioade, format tabel sau card-uri
- **Experiență scurtă**: ani totali + domenii principale + CTA link → `/experience`
- **Tehnologii**: grid cu stack-ul principal (fără nivele — asta e la `/skills`)
- Metadata SEO proprie (nu moștenită din layout)
- Animații `whileInView` per secțiune

---

## Tech Spec

### Fișiere

```
src/features/about/
├── AboutPage.tsx               # Componentă root a paginii
├── AboutIntro.tsx              # Paragraful introductiv
├── AboutEducation.tsx          # Secțiunea Educație
├── AboutExperienceSummary.tsx  # Rezumat experiență + CTA link
├── AboutTech.tsx               # Grid tehnologii principale
└── about.scss

src/app/about/page.tsx          # Importă AboutPage + export metadata
```

### Cum funcționează

- `page.tsx` randează `<AboutPage />` și exportă `metadata` SEO
- Conținutul tuturor secțiunilor este hardcodat în componente (nu MongoDB) — datele nu se schimbă des
- `AboutMeContent` din Home rămâne separat și nu mai este importat în `/about`

### Metadata SEO

```typescript
export const metadata: Metadata = {
  title: "About — Alexandru Roventa",
  description: "Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
  openGraph: {
    title: "About — Alexandru Roventa",
    url: "https://alexandru-roventa.ro/about",
    type: "profile",
  },
};
```

### Pattern animații

**Secțiuni — scroll-triggered:**
```typescript
<motion.section
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

**Grid tehnologii — stagger:**
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

---

## TODO

- [x] `AboutPage.tsx` și componente secundare în `src/features/about/`
- [x] Secțiunea Intro: text scurt 2-3 propoziții
- [x] Secțiunea Educație: tabel cu instituții + perioade
- [x] Secțiunea Experiență scurtă: ani totali + domenii + CTA link `/experience`
- [x] Secțiunea Tehnologii: grid cu stack principal (hardcodat, fără nivele)
- [x] Metadata SEO proprie în `src/app/about/page.tsx`
- [x] Framer Motion `whileInView` per secțiune + stagger pe grid tehnologii
