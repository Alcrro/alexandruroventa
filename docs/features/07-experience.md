# Experience

## v1 — Starea actuală

### Ce face
Pagina `/experience` afișează un timeline al experienței profesionale. Include și un sistem de adăugare a experiențelor noi protejat de un mecanism de activare cu cheie secretă.

### Fișiere implicate

```
src/app/experience/
├── page.tsx                                        # Pagina /experience
├── layout.tsx                                      # Layout cu parallel routes
├── experience.scss
├── @mainExperience/
│   ├── page.tsx                                    # Slot lista experiențe
│   └── default.tsx
└── @addExperience/
    ├── page.tsx                                    # Slot buton add
    ├── default.tsx
    └── add-experience/
        ├── page.tsx                                # Formular adăugare
        ├── layout.tsx
        ├── default.tsx
        └── @activate/
            ├── page.tsx                            # Slot activare cheie
            ├── default.tsx
            └── activate/
                └── page.tsx                        # Introducere cheie de activare

src/components/experience/
├── Experience.tsx                                  # Timeline principal
├── myExperience.scss
├── YearCount.tsx                                   # Calculează ani de experiență
├── myExperience/
│   ├── ExperienceContainer.tsx                     # Container item timeline
│   ├── ExperienceContent.tsx                       # Conținut item
│   ├── ExperienceMoreContent.tsx                   # Expand cu mai mult conținut
│   ├── experienceContent.scss
│   └── myExperienceContainer.scss
├── addExperience/
│   ├── AddExperience.tsx                           # Form adăugare
│   ├── addExperience.scss
│   ├── addExperiencebutton/
│   │   ├── AddExperienceButton.tsx                 # Buton show/hide form
│   │   └── addExperienceButton.scss
│   ├── labelGroup/
│   │   └── LabelGroup.tsx
│   ├── modal/
│   │   ├── AddExperienceModal.tsx
│   │   ├── addExperienceModal.scss
│   │   └── AddTextContent/
│   │       ├── AddContentForm.tsx
│   │       ├── AddTextContent.tsx
│   │       ├── addTextContent.scss
│   │       └── DateCalc.ts                         # Calcul durate date
│   └── typeOfExperience/
│       ├── TypeOfExperience.tsx
│       ├── TypeOfExperienceModal.tsx
│       └── whatStarted.scss
└── activator/
    ├── ActionSend.ts                               # Server Action activare cheie
    ├── ActivatorLayout.tsx
    ├── activatorButton/
    │   └── ActivatorButton.tsx
    ├── activatorForm/
    │   └── ActivatorForm.tsx
    └── activatorLabel/
        └── ActivatorLabel.tsx

src/app/api/experience/
├── route.ts                                        # GET /api/experience
└── add-experience/
    ├── route.ts                                    # POST /api/experience/add-experience
    └── randomString.ts                             # Generator cheie secretă

src/_lib/experience/
└── getExperience.ts                                # fetch() GET /api/experience

src/models/experience/
├── Experience.ts                                   # Schema experiență
└── ActivationKey.ts                                # Schema cheie activare

src/components/actions/
└── addExperienceAction.ts                          # Server Action adăugare

src/context/experienceContext/
└── ExperienceContext.tsx                           # Context global experiențe
```

### Schema MongoDB — Experience

```typescript
{
  idIncNumber: Number,          // număr ordine
  startYear: Date,
  currentYear: Date | null,     // null dacă jobul e încheiat
  endYear: Date | null,         // null dacă jobul e curent
  isEnded: Boolean,
  className: String,            // clasă CSS pentru logo companie
  titleDescription: String,     // titlu job + companie
  descriptionMore: String       // descriere extinsă
}
```

### Schema MongoDB — ActivationKey

```typescript
{
  key: String,    // cheie secretă one-time
  used: Boolean
}
```

### Cum funcționează

1. `/experience` afișează timeline-ul cu `Experience.tsx`
2. Fiecare item are: logo companie (icon din CSS class), titlu, ani de experiență (`YearCount`)
3. Click pe item → expand cu `ExperienceMoreContent`
4. Adăugare experiență nouă: necesită activare cu cheie secretă generată server-side
5. Fluxul de activare: `AddExperienceButton` → navigare la `/experience/add-experience` → introducere cheie → `ActivatorForm` → POST la API → sesiune activată → formular adăugare

### Probleme cunoscute (v1)

- Logourile companiilor sunt clase CSS (ex: `logo-company firma-x`) care trebuie adăugate manual în SCSS
- Sistemul de activare cu cheie one-time este complex și custom — ar putea fi înlocuit cu autentificare standard
- Structura de rute nested cu parallel routes este greu de urmărit (`@addExperience/@activate`)
- `ExperienceContext` există dar nu este clar ce date gestionează global
- Timeline-ul nu are design grafic atrăgător
- Nu există posibilitate de editare/ștergere a experiențelor

### Idei v2

- [ ] Autentificare reală în loc de cheia secretă
- [ ] Design timeline mai vizual (linie verticală, dots, animații)
- [ ] Logourile companiilor din imagini reale, nu clase CSS
- [ ] Edit/delete experiențe din admin
- [ ] Animații scroll-triggered pe fiecare item din timeline
- [ ] Calcul automat ani total experiență afișat în hero
