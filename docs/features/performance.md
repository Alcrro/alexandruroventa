# Performance (Knowledge Tracker)

## PRD

Tracker personal de cunoștințe tehnice organizat pe categorii (limbaje/tehnologii). Permite înregistrarea cursurilor și proiectelor cu cod asociat vizualizat în Monaco Editor.

- Listă categorii pe `/performance`
- Per categorie: tabel cu înregistrări (curs / proiect), filtrare + sortare via query params
- Detalii înregistrare cu Monaco Editor pentru vizualizare cod cu versiuni
- Adăugare conținut protejată cu autentificare

---

## Tech Spec

### Fișiere

```
src/features/performance/
├── PerformanceList.tsx         # Lista categorii
├── CategoryTable.tsx           # Tabel înregistrări per categorie
├── ContentDetail.tsx           # Detalii + Monaco Editor
├── AddContent.tsx              # Formular adăugare — protejat cu auth
└── performance.scss

src/components/codEditor/
├── CodeEditorComponent.tsx     # Monaco Editor wrapper (fără Chakra UI în v2)
└── LanguageSelector.tsx

src/app/performance/
├── page.tsx                    # Lista categorii
└── [category]/
    ├── page.tsx                # Tabel înregistrări
    └── [slug]/page.tsx         # Detalii cu editor

src/app/api/performance/route.ts            # GET categorii, POST categorie nouă
src/app/api/performance/[...filter]/route.ts  # înlocuit de query params în v2

src/_lib/languageSkill/
├── getLanguageSkill.ts
└── getModule.ts

src/models/languageSkill/
├── LanguageSkill.ts            # Schema categorie
├── LanguageSkillContent.ts     # Schema înregistrare
└── LanguageSkillCodeVersion.ts # Schema versiune cod
```

### Scheme MongoDB

**LanguageSkill (categorii):**
```typescript
{ skillName: String, link: String }
```

**LanguageSkillContent (înregistrări):**
```typescript
{
  category: String,
  languageType: "course" | "project",
  uniqueNumberByCategory: Number,
  unique_id: String,            // 7 caractere random uppercase
  contentTitle: String,
  contentDescription: String,
  slug: String,                 // title-description-UNIQUEID
  versionCode_id: ObjectId,
}
```

**LanguageSkillCodeVersion:**
```typescript
{ code: String, versionCode: String, date: Date, title_id: ObjectId }
```

### Cum funcționează

1. `/performance` → lista de categorii ca link-uri
2. `/performance/[category]` → tabel cu înregistrări, filtrare + sortare via query params
3. `/performance/[category]/[slug]` → vizualizare cu Monaco Editor

### Filtrare cu query params (v2)

```
/performance/JavaScript?type=course&sort=date&order=asc&page=2
```

Server Component citește `searchParams` → construiește query MongoDB → returnează date filtrate.

---

## TODO

- [x] Filtrare cu query params — `?type=course&sort=desc&page=2`, filtrele se păstrează în URL
- [x] Înlocuiește Chakra UI cu wrapper simplu pentru Monaco Editor (`MonacoEditor.tsx` fără Chakra)
- [x] Sistem rating funcțional cu salvare în DB — `POST /api/performance/[category]/[slug]/rate`, câmpuri `ratingSum`/`ratingCount` în model, UI wire-up complet
- [x] Rename intern: `languageSkill` → `knowledgeEntry` — modele în `models/knowledgeEntry/`, lib în `_lib/knowledgeEntry/`, tip `iKnowledgeCategoryGet`
- [x] Șterge `LanguageContent.ts` (model nefolosit — șters)
- [x] UI tabel responsive — media query la 600px, coloane Description și Version ascunse pe mobil
- [x] Cleanup: `algorithmParamsAPI.ts`, `slugAlgorithm.ts`, `RatingExplanation.tsx` șterse
