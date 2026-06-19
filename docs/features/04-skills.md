# Skills

## v1 — Starea actuală

### Ce face
Pagina `/skills` afișează o listă simplă de skill-uri tehnice stocate în MongoDB. Există și o pagină admin (`/skills/add-skill`) pentru adăugarea de skill-uri noi.

### Fișiere implicate

```
src/app/skills/
├── page.tsx                        # Pagina publică /skills
├── add-skill/
│   └── page.tsx                    # Pagina admin /skills/add-skill
└── skills.scss                     # Stiluri pagina skills

src/components/skills/
├── SkillsList.tsx                  # Lista de skill-uri (ul/li simplu)
└── add-skill/
    ├── AddSkill.tsx                # Formularul de adăugare skill
    ├── AddSkillAction.ts           # Server Action pentru POST
    ├── LabelGroup.tsx              # Input label refolosibil
    ├── SkillForm.tsx               # Form wrapper
    └── addSkill.scss               # Stiluri form

src/app/api/skills/
├── route.tsx                       # GET /api/skills, POST /api/skills
└── activator/
    └── route.tsx                   # (nefolosit aparent)

src/_lib/skills/
├── getSkills.tsx                   # fetch() GET /api/skills
└── skills.ts                       # (utilitare / tipuri locale)

src/models/skills/
└── Skills.ts                       # Mongoose schema: { skillName: String }
```

### Schema MongoDB

```typescript
{
  skillName: String  // required, unique
}
```

### Cum funcționează

1. `page.tsx` apelează `getSkills()` → fetch la `/api/skills`
2. API-ul face `Skills.find()` și returnează lista
3. `SkillsList` randează un `<ul>` simplu cu `{skill.skillName}` pentru fiecare
4. `/skills/add-skill` are un formular cu un input `skillName` + Server Action
5. Server Action-ul face POST la `/api/skills` → `Skills.create()`

### Probleme cunoscute (v1)

- UI extrem de simplu — `<ul><li>` fără nicio stilizare sau vizualizare
- Nu există categorii sau grupare a skill-urilor (frontend, backend, tools, etc.)
- Nu există nivele de competență (beginner / intermediate / advanced)
- Pagina `/skills/add-skill` nu este protejată cu autentificare
- `activator/route.tsx` există dar pare nefolosit
- Schema MongoDB are doar `skillName` — nicio informație adițională

---

## v2 — Plan

### Ce se schimbă față de v1

| | v1 | v2 |
|---|---|---|
| UI | `<ul><li>` simplu, fără stilizare | Card-uri vizuale cu icon și nivel |
| Structură | Listă plată, fără categorii | Grupat pe categorii (Frontend, Backend, etc.) |
| Schema MongoDB | `{ skillName }` | `{ skillName, category, level, icon }` |
| Animații | Nicio animație | Framer Motion staggered per card |

---

### 1. Categorii + schema extinsă

**Problema în v1:** Toate skill-urile sunt o listă plată fără nicio grupare. Schema MongoDB conține doar `skillName` — nicio informație despre domeniu, nivel sau icon.

#### Schema MongoDB v2

```typescript
// src/models/skills/Skills.ts
{
  skillName: String,    // required, unique — ex: "React"
  category: String,     // required — ex: "Frontend"
  level: String,        // required — enum: ["beginner", "intermediate", "advanced"]
  icon: String,         // optional — ex: "bi-react" sau URL SVG
}
```

**Categorii posibile** (hardcodate ca enum în schemă):
- `Frontend`
- `Backend`
- `Database`
- `DevOps`
- `Tools`

#### Cum se grupează în UI

API-ul returnează toate skill-urile. Gruparea pe categorii se face **client-side** cu `reduce` — nu e nevoie de query separat per categorie:

```typescript
const grouped = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);
```

Rezultat: un obiect `{ Frontend: [...], Backend: [...], Tools: [...] }` iterat pentru a randa câte un grup per categorie.

**Fișiere modificate:**
- `src/models/skills/Skills.ts` — adaugă `category`, `level`, `icon`
- `src/app/api/skills/route.tsx` — GET returnează toate câmpurile noi; POST acceptă câmpurile noi
- `src/components/skills/add-skill/AddSkill.tsx` — adaugă select pentru `category` și `level`
- `src/app/api/skills/activator/route.tsx` — **eliminat** (nefolosit)

---

### 2. Skill cards vizuale

**Problema în v1:** `SkillsList.tsx` randează `<ul><li>{skill.skillName}</li></ul>` — zero vizualizare.

**Soluție v2:** Card-uri grupate pe categorii, cu icon și nume.

**Structură componente v2:**
```
src/components/skills/
├── SkillsPage.tsx              # Componentă root — primește skills grupate
├── SkillCategory.tsx           # Un grup de card-uri (ex: "Frontend")
├── SkillCard.tsx               # Card individual: icon + skillName + nivel
├── SkillsList.tsx              # Eliminat sau repurposed
└── skills.scss                 # Stiluri actualizate
```

**`SkillCard.tsx` — structură propusă:**
```tsx
<div className="skill-card">
  <i className={`bi ${skill.icon}`} />        {/* icon Bootstrap sau SVG */}
  <span className="skill-name">{skill.skillName}</span>
  <span className={`skill-level level-${skill.level}`}>{skill.level}</span>
</div>
```

**`SkillCategory.tsx` — structură propusă:**
```tsx
<section className="skill-category">
  <h2 className="category-title">{category}</h2>
  <div className="skill-cards-grid">
    {skills.map(skill => <SkillCard key={skill._id} skill={skill} />)}
  </div>
</section>
```

**Layout grid:** CSS Grid cu `repeat(auto-fill, minmax(120px, 1fr))` — se adaptează automat la orice număr de skill-uri și orice dimensiune de ecran.

**Fișiere noi:**
- `src/components/skills/SkillsPage.tsx`
- `src/components/skills/SkillCategory.tsx`
- `src/components/skills/SkillCard.tsx`

**Fișiere modificate:**
- `src/components/skills/skills.scss` — stiluri card, grid, category title
- `src/app/skills/page.tsx` — importă `SkillsPage` în loc de `SkillsList`

**Fișiere eliminate:**
- `src/components/skills/SkillsList.tsx` — înlocuit de `SkillsPage` + `SkillCard`

---

### 3. Nivel de competență

**Problema în v1:** Nu există niciun indicator de nivel — utilizatorul nu poate înțelege cât de bine stăpânești un skill.

**Soluție v2:** Badge pe fiecare card cu 3 niveluri vizual diferențiate prin culoare.

**Niveluri și reprezentare vizuală:**

| Level | Label | Culoare badge |
|---|---|---|
| `beginner` | Beginner | gri / neutru |
| `intermediate` | Intermediate | albastru / accent |
| `advanced` | Advanced | verde / pozitiv |

**Implementare ca CSS classes:**
```scss
.skill-level {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 4px;

  &.level-beginner     { background: #e5e7eb; color: #6b7280; }
  &.level-intermediate { background: #dbeafe; color: #1d4ed8; }
  &.level-advanced     { background: #dcfce7; color: #15803d; }
}
```

**Dark mode:** culorile badge-urilor se ajustează via CSS variables sau clase `html.dark`.

**Fișiere modificate:**
- `src/components/skills/SkillCard.tsx` — include badge-ul cu clasa dinamică
- `src/components/skills/skills.scss` — stiluri `.skill-level` + variantele de nivel

---

### 4. Animații staggered

**Problema în v1:** Pagina se încarcă static, fără nicio tranziție.

**Soluție v2:** Framer Motion — categoriile apar pe rând (`whileInView`), iar card-urile din fiecare categorie apar cu stagger.

**Pattern stagger (consistent cu About v2 — `AboutTech`):**
```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
};
```

**Structura animată:**
```tsx
// SkillCategory.tsx — "use client"
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
  className="skill-cards-grid"
>
  {skills.map(skill => (
    <motion.div key={skill._id} variants={cardVariants}>
      <SkillCard skill={skill} />
    </motion.div>
  ))}
</motion.div>
```

Fiecare categorie se animează independent când intră în viewport — nu toate odată.

**Fișiere modificate:**
- `src/components/skills/SkillCategory.tsx` — devine `"use client"`, adaugă `motion.div`

---

### Fișiere afectate în total (v2)

| Fișier | Acțiune |
|---|---|
| `src/models/skills/Skills.ts` | Modificat — adaugă `category`, `level`, `icon` |
| `src/app/api/skills/route.tsx` | Modificat — GET + POST cu câmpurile noi |
| `src/components/skills/SkillsPage.tsx` | **Nou** |
| `src/components/skills/SkillCategory.tsx` | **Nou** — `"use client"`, stagger animation |
| `src/components/skills/SkillCard.tsx` | **Nou** — card cu icon + level badge |
| `src/components/skills/skills.scss` | Modificat — stiluri card, grid, badge niveluri |
| `src/app/skills/page.tsx` | Modificat — importă `SkillsPage` |
| `src/components/skills/add-skill/AddSkill.tsx` | Modificat — select `category` + `level` |
| `src/components/skills/SkillsList.tsx` | **Eliminat** |
| `src/app/api/skills/activator/route.tsx` | **Eliminat** (nefolosit) |
