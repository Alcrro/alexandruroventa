# Footer

## v1 — Starea actuală

### Ce face
Footer-ul afișează 3 coloane: informații de contact (emailuri), link-uri proiecte și un icon LinkedIn. Apare pe toate paginile via `layout.tsx`.

### Fișiere implicate

```
src/components/footer/
├── Footer.tsx                          # Wrapper component
├── footer.scss                         # Stiluri principale
├── Footer.test.tsx                     # Test (Jest)
├── footer/
│   └── FooterComponent.tsx             # Conținut efectiv
└── auxFooter/
    ├── AuxFooter.tsx                   # (nefolosit aparent)
    └── ProjectsAuxFooter.tsx           # (nefolosit aparent)
```

### Conținut actual (hardcodat)

**Contact:**
- `business@alexandru-roventa.ro`
- `alex.roventa94@gmail.com`

**Projects:**
- alexandru-roventa.ro
- lucruri-utile.ro
- alcrro.ro

**Social Media:**
- LinkedIn (icon Bootstrap `\F472`)

### Cum funcționează

- `Footer.tsx` este importat direct în `layout.tsx` și randat la baza paginii
- `footer-container` are `margin-top: auto` în `main` → stick la josul paginii
- Responsive: coloană verticală sub 470px, row orizontal peste 470px
- Icon LinkedIn via CSS `::before` cu codul unicode Bootstrap Icons

### Probleme cunoscute (v1)

- Copyright scrie `20023-2024` — **typo** (trebuie `2023-2024` sau dinamic cu `new Date().getFullYear()`)
- `AuxFooter.tsx` și `ProjectsAuxFooter.tsx` există dar nu sunt folosite nicăieri (dead code)
- Toate datele sunt hardcodate — nu pot fi editate fără a modifica codul
- Un singur link social media (LinkedIn)
- Icon social media nu are `aria-label` — not accessible
- Link-ul LinkedIn este hardcodat în componentă

### Idei v2

- [ ] Fix typo copyright → dinamic cu `new Date().getFullYear()`
- [ ] Șterge `AuxFooter.tsx` și `ProjectsAuxFooter.tsx` (dead code)
- [ ] Adaugă GitHub, Twitter/X în social links
- [ ] `aria-label` pe link-urile sociale
- [ ] Design mai minimal și curat
- [ ] Date configurate din `constants/` sau env, nu hardcodate
