# Footer

## PRD

Footer persistent pe toate paginile cu informații de contact și link-uri sociale.

- Contact: email business + email personal
- Proiecte: link-uri site-uri principale
- Social media: LinkedIn + GitHub (cu `aria-label`)
- Copyright dinamic cu anul curent
- Design minimal, consistent cu design system-ul

---

## Tech Spec

### Fișiere

```
src/features/footer/
├── Footer.tsx              # Wrapper — importat direct în layout.tsx
├── FooterComponent.tsx     # Conținut: 3 coloane (contact, projects, social)
└── footer.scss
```

### Conținut (hardcodat în componentă)

**Contact:** `business@alexandru-roventa.ro` · `alex.roventa94@gmail.com`

**Projects:** `alexandru-roventa.ro` · `lucruri-utile.ro` · `alcrro.ro`

**Social:**
```tsx
const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/alexandru-roventa", icon: "bi-linkedin" },
  { label: "GitHub",   href: "https://github.com/Alcrro",                 icon: "bi-github"   },
];
```

### Copyright dinamic

```tsx
<span>© {new Date().getFullYear()} Alexandru Roventa</span>
```

### Responsive

- ≥ 470px: 3 coloane orizontale
- < 470px: coloană verticală (stacked)

---

## TODO

- [ ] Fix typo copyright: `20023-2024` → `new Date().getFullYear()`
- [ ] Adaugă GitHub în social links (lângă LinkedIn)
- [ ] `aria-label` pe toate link-urile sociale
- [ ] Înlocuiește icon LinkedIn via CSS `::before` Unicode cu `<i className="bi bi-linkedin" />`
- [ ] Șterge dead code: `AuxFooter.tsx`, `ProjectsAuxFooter.tsx`
- [ ] Design mai minimal: aliniați cu design system (`text-muted`, `bg-elevated`, etc.)
