# Theme (Dark / Light Mode)

## v1 — Starea actuală

### Ce face
Aplicația suportă dark mode și light mode, gestionat prin `next-themes`. Toggle-ul este în navbar. Tema este aplicată ca clasă pe `<html>` (`html.dark` / `html.light`) și stilurile sunt definite cu CSS custom properties.

### Fișiere implicate

```
src/app/
├── DarkThemeProvider.tsx               # Wrapper ThemeProvider (next-themes)
├── ThemeSwitch.tsx                     # Buton toggle dark/light
└── globals.scss                        # CSS variables pentru teme

src/components/darkTheme/
├── ImageDarkSpan.tsx                   # Span cu icon dark (Bootstrap)
├── ImageLightSpan.tsx                  # Span cu icon light (Bootstrap)
├── imageSpan.scss                      # Stiluri pentru span-uri
└── themeSwitch.scss                    # Stiluri pentru butonul toggle
```

### Cum funcționează

1. `DarkThemeProvider.tsx` wrappează întreaga aplicație cu `ThemeProvider` din `next-themes`
   - `attribute="class"` → aplică `dark`/`light` ca clasă pe `<html>`
   - `defaultTheme="light"` → tema implicită este light
2. `ThemeSwitch.tsx` (Client Component):
   - Folosește `useTheme()` pentru a citi și seta tema
   - `mounted` state → evită hydration mismatch
   - Randează icon diferit în funcție de tema curentă
3. CSS variables definite în `globals.scss`:
   ```scss
   :root.light {
     ---background-color: #e7e7e7;
     ---text-color: #000;
     ...
   }
   :root.dark {
     ---background-color: #1b2538;
     ---text-color: #fff;
     ...
   }
   ```
4. Tailwind dark mode configurat cu `darkMode: "class"` în `tailwind.config.ts`

### Probleme cunoscute (v1)

- CSS variables folosesc **3 cratime** (`---`) în loc de 2 (`--`) — non-standard, funcționează dar e o ciudățenie
- `ImageDarkSpan.tsx` și `ImageLightSpan.tsx` există dar nu sunt folosite în `ThemeSwitch` actual
- Tema nu este **persistată în localStorage** dacă utilizatorul nu are cookie/storage (next-themes face asta automat, dar `defaultTheme="light"` ignoră preferința sistemului)
- Toggle-ul folosește `::before` cu unicode Bootstrap Icons — not accessible (lipsă `aria-label`, nu e `<button>`)
- Nu există tranziție smooth la schimbarea temei (flash of unstyled content)
- Există comentarii dezactivate pentru `data-darkreader-scheme` — cod mort

### Idei v2

- [ ] Fix CSS variables: `---` → `--` (2 cratime standard)
- [ ] Respectă `prefers-color-scheme` din sistem (`defaultTheme="system"`)
- [ ] Tranziție CSS smooth la schimbare temă (`transition: background-color 0.2s, color 0.2s`)
- [ ] Toggle accesibil: `<button aria-label="Switch to dark mode">`
- [ ] Șterge `ImageDarkSpan.tsx` și `ImageLightSpan.tsx` dacă sunt nefolosite
- [ ] Elimină comentariile dezactivate pentru Dark Reader
- [ ] Paletă de culori mai rafinată (nu `#e7e7e7` gri plat)
