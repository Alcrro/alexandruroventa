# Home

## PRD

Prima pagină văzută de vizitator. Trebuie să comunice în sub 5 secunde: cine ești, ce faci, cum te contactează.

- Imagine de profil vizibilă imediat, deasupra fold-ului
- Titlu H1 cu numele + rol profesional (ex: Full Stack Developer)
- 2 CTA-uri: `Get in touch` → `/contact`, `See my projects` → `/projects`
- Link-uri social media: LinkedIn + GitHub
- Rezumat "About Me" fără navigare suplimentară
- Animații de intrare progresive (stagger)
- Open Graph metadata completă pentru share pe rețele sociale

---

## Tech Spec

### Fișiere

```
src/features/home/
├── Profile.tsx             # Container hero: imagine + titlu + CTA + social
├── AboutSection.tsx        # Secțiunea About Me
├── AboutMeContent.tsx      # Text (prop variant: "main" | "modal")
└── home.scss

src/app/page.tsx            # Randează Profile + AboutSection
```

### Cum funcționează

- `page.tsx` (Server Component) randează `<Profile />` și `<AboutSection />`
- `Profile` conține imaginea (`eu.png` din `/public`), info contact și social links
- `AboutMeContent` primește prop `variant` pentru context (homepage vs modal)
- Client Components animabile primesc datele ca props din Server Components parinte

### Pattern animații

**Hero — stagger la intrare (ordinea: imagine → titlu → rol → butoane → social):**
```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};
```

**About Me — scroll-triggered:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

### Social links

```typescript
const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alexandru-roventa/", icon: "bi-linkedin" },
  { label: "GitHub",   href: "https://github.com/Alcrro",                       icon: "bi-github"   },
];
```

---

## TODO

- [x] Hero: titlu H1 + rol + 2 CTA-uri structurate deasupra fold-ului
- [x] Framer Motion stagger pe hero (imagine → titlu → rol → butoane → social)
- [x] Framer Motion `whileInView` pe secțiunea About Me
- [x] GitHub în social links
- [x] Open Graph metadata completă în `src/app/page.tsx` + `og-image.png` în `/public`
- [x] Fix LCP: `priority` prop pe `<Image>` profil
- [x] `AboutMeContent`: prop `variant` în loc de `usePathname()` intern
- [x] Șterge dead code: `ProfileDescription.tsx`, `Spacing.tsx`, `spacing.scss`
