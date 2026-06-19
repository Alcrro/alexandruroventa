# Performance (Knowledge Tracker)

## v1 — Starea actuală

### Ce face
Secțiunea `/performance` este un tracker personal de cunoștințe tehnice — organizat pe limbaje/tehnologii (`/performance/[category]`), cu înregistrări de tip "curs" sau "proiect", fiecare cu versiuni de cod (Monaco Editor), filtrare, sortare și paginare.

### Fișiere implicate

```
src/app/performance/
├── page.tsx                                        # Lista categorii /performance
└── [category]/
    ├── page.tsx                                    # Lista înregistrări pe categorie
    ├── [slug]/
    │   └── page.tsx                                # Detalii înregistrare cu cod editor
    ├── add-content/
    │   └── page.tsx                                # Formular adăugare înregistrare
    └── (filter)/[...filter]/
        ├── layout.tsx
        ├── page.tsx
        ├── @filter/page.tsx                        # Slot filtru activ
        └── @main/page.tsx                          # Slot tabel filtrat

src/components/performance/
├── components/
│   ├── Performance.tsx                             # Lista categorii (links)
│   ├── Navbar.tsx                                  # Navbar intern performance
│   ├── NoRecords.tsx                               # Empty state
│   ├── algorithmTest.ts                            # Utilitar test algoritm
│   ├── navbar.scss
│   └── performance.scss
├── content/
│   └── ContentLink.tsx                             # Link individual la înregistrare
├── main/
│   ├── Main.tsx                                    # Tabel principal cu înregistrări
│   ├── contentList.scss
│   ├── LinkTableContent.tsx
│   ├── tableHeader/
│   │   ├── TableHeader.tsx                         # Header tabel sortabil
│   │   ├── LinkHeader.tsx
│   │   ├── LinkAction.ts
│   │   └── tableHeader.scss
│   ├── orderBy/
│   │   ├── OrderBy.tsx
│   │   └── NameLink.tsx
│   ├── addContent/
│   │   ├── AddContent.tsx                          # Formular adăugare
│   │   ├── addContent.scss
│   │   ├── addContentButton/
│   │   │   └── AddContentButton.tsx
│   │   ├── header/
│   │   │   ├── Header.tsx
│   │   │   ├── header.scss
│   │   │   ├── labels/InputLabels.tsx
│   │   │   └── versionAndDate/VersionAndDate.tsx
│   │   ├── contentCode/
│   │   │   ├── ContentCode.tsx
│   │   │   └── contentCode.scss
│   │   └── action/
│   │       └── headerAction.ts
│   └── modal/module/
│       └── ContentWrapper.tsx
├── navbar/
│   ├── alreadyFiltered/
│   │   ├── AlreadyFiltered.tsx
│   │   └── alreadyFiltered.scss
│   └── modal/
│       ├── categoryFilter/CategoryFilter.tsx
│       ├── currentFIlter/
│       │   ├── CurrentFilter.tsx
│       │   └── currentFilter.scss
│       ├── filterList/
│       │   ├── FilterList.tsx
│       │   └── filterList.scss
│       └── itemsPerPage/ItemsPerPage.tsx
└── slugContent/
    └── header/
        ├── Header.tsx
        └── header.scss

src/components/codEditor/                           # Monaco Editor wrapper
├── CodEditor.tsx
├── CodeEditorComponent.tsx
├── ChakraProvider.tsx                              # Chakra UI wraper pentru Monaco
├── LanguageSelector.tsx
├── editorTheme.ts
├── editor-container.scss
├── navbarContent/
│   ├── NavbarContentComponent.tsx
│   └── navbarContent.scss
└── rating/
    ├── RatingEditor.tsx
    ├── RatingExplanation.tsx
    ├── RatingModal.tsx
    ├── SetRatingModal.tsx
    ├── rating.scss
    └── setRatingModal.scss

src/app/api/performance/
├── route.ts                                        # GET (lista categorii), POST (categorie nouă)
└── [...filter]/
    └── route.ts                                    # GET cu filtre + paginare, POST conținut nou

src/app/api/knowledge/content/[contentID]/
└── route.ts                                        # GET conținut specific cu cod

src/_lib/languageSkill/
├── getLanguageSkill.ts                             # fetch() lista categorii
├── getModule.ts                                    # fetch() înregistrări pe categorie
├── getModuleParamsAlgorithm.ts                     # Parseaza params URL
├── algorithmParamsAPI.ts                           # Construiește query string
├── headerArray.ts                                  # Definiție coloane tabel
├── slugAlgorithm.ts                                # Parseaza slug URL
└── slugModuleAlgorith.ts                           # Generare ID unic

src/_lib/performance/
├── filter.ts                                       # Logică filtrare MongoDB
├── pagination.ts                                   # Logică paginare
└── sortPerformance.ts                              # Logică sortare

src/models/languageSkill/
├── LanguageSkill.ts                                # Schema categorie (ex: "JavaScript")
├── LanguageSkillContent.ts                         # Schema înregistrare (curs/proiect)
├── LanguageSkillCodeVersion.ts                     # Schema versiune de cod
└── LanguageContent.ts                              # (nefolosit aparent)

src/context/navbarFilterContext/
└── NavbarFilterContext.tsx                         # Context filtre active
```

### Schema MongoDB

**LanguageSkill** (categorii):
```typescript
{
  skillName: String,    // ex: "JavaScript"
  link: String          // generat automat: "JavaScript" → "JavaScript"
}
```

**LanguageSkillContent** (înregistrări):
```typescript
{
  category: String,                   // ex: "JavaScript"
  languageType: "course" | "project",
  uniqueNumberByCategory: Number,     // număr ordine per categorie
  unique_id: String,                  // 7 caractere random uppercase
  contentTitle: String,
  contentDescription: String,
  slug: String,                       // title-description-UNIQUEID
  versionCode_id: ObjectId            // ref la CodeVersion
}
```

**CodeVersion** (versiuni cod):
```typescript
{
  code: String,           // codul sursă
  versionCode: String,    // ex: "v1.0"
  date: Date,
  title_id: ObjectId      // ref la LanguageSkillContent
}
```

### Cum funcționează

1. `/performance` → lista de categorii (limbaje) ca link-uri simple
2. `/performance/[category]` → tabel cu toate înregistrările acelei categorii
3. Filtrare prin URL segments: `/performance/[category]/languageType/course/asc/...`
4. Sortare via click pe header coloană → modifică URL
5. Paginare via query param `?page=N`
6. `/performance/[category]/[slug]` → vizualizare cu Monaco Editor pentru cod
7. Adăugare înregistrare nouă: formular cu titlu, descriere, tip, cod și versiune

### Probleme cunoscute (v1)

- Filtrarea prin URL segments (`[...filter]`) cu parsare manuală este extrem de fragil — logica din `algorithmParamsAPI.ts`, `slugAlgorithm.ts`, `filterCategory.ts` este greu de urmărit și de debugging
- `LanguageContent.ts` model există dar pare nefolosit
- Chakra UI este importat **doar** pentru Monaco Editor — overhead mare de pachet
- Sistemul de rating (`RatingEditor`, `RatingModal`, `SetRatingModal`) există dar nu e clar cum se salvează
- Sortarea dublă în query (`$sort` de două ori în aggregation pipeline)
- Naming inconsistent: `languageSkill` vs `performance` (în URL e `/performance`, în cod e `languageSkill`)
- Nu există autentificare pentru adăugare conținut

### Idei v2

- [ ] Filtrare cu query params în loc de URL segments
- [ ] Înlocuiește Chakra UI cu un wrapper mai simplu pentru Monaco
- [ ] Autentificare pentru adăugare conținut
- [ ] Sistem rating funcțional cu salvare în DB
- [ ] Rename intern: `languageSkill` → `knowledgeEntry` pentru consistență cu URL-ul
- [ ] Cleanup: șterge `LanguageContent.ts` dacă e nefolosit
- [ ] UI tabel mai curat, responsive
