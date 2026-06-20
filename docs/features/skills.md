# Skills

## PRD

Pagina `/skills` vizualizează competențele tehnice grupate pe domenii, cu nivel de competență vizibil per skill.

- Card vizual per skill: icon + nume + nivel (beginner / intermediate / advanced)
- Grupare pe categorii: Frontend · Backend · Database · DevOps · Tools
- Badge nivel cu culori diferite (gri / albastru / verde)
- Animații staggered per categorie la intrare în viewport

---

## Tech Spec

### Fișiere

```
src/features/skills/
├── SkillsPage.tsx          # Container root — iterează categoriile
├── SkillCategory.tsx       # Un grup de carduri (ex: "Frontend") — "use client"
├── SkillCard.tsx           # Card: icon + skillName + badge nivel
└── skills.scss

src/app/skills/page.tsx     # Fetch + randează SkillsPage
src/app/api/skills/route.ts # GET /api/skills, POST /api/skills
src/_lib/skills/getSkills.ts
src/models/skills/Skills.ts
```

### Schema MongoDB

```typescript
{
  skillName: String,    // required, unique — ex: "React"
  category: String,     // required — "Frontend" | "Backend" | "Database" | "DevOps" | "Tools"
  level: String,        // required — "beginner" | "intermediate" | "advanced"
  icon: String,         // optional — ex: "bi-react" sau URL SVG
}
```

### Cum funcționează

1. `page.tsx` apelează `getSkills()` → fetch `/api/skills` → returnează toate skill-urile
2. Gruparea pe categorii se face client-side cu `reduce`:
   ```typescript
   const grouped = skills.reduce((acc, skill) => {
     if (!acc[skill.category]) acc[skill.category] = [];
     acc[skill.category].push(skill);
     return acc;
   }, {} as Record<string, Skill[]>);
   ```
3. `SkillsPage` iterează categoriile → `SkillCategory` per categorie → `SkillCard` per skill

### Badge nivel

```scss
.skill-level {
  &.level-beginner     { background: #e5e7eb; color: #6b7280; }  /* gri */
  &.level-intermediate { background: #dbeafe; color: #1d4ed8; }  /* albastru */
  &.level-advanced     { background: #dcfce7; color: #15803d; }  /* verde */
}
```

### Pattern animații (stagger per categorie)

```typescript
// SkillCategory.tsx — "use client"
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
>
  {skills.map(skill => (
    <motion.div key={skill._id} variants={cardVariants}>
      <SkillCard skill={skill} />
    </motion.div>
  ))}
</motion.div>
```

---

## TODO

- [x] Extinde schema MongoDB: adaugă `category`, `level`, `icon`
- [x] Update API route: GET + POST acceptă câmpurile noi
- [x] Pagina admin `add-skill`: select pentru `category` și `level`
- [x] Componente noi: `SkillsPage`, `SkillCategory`, `SkillCard`
- [x] Badge nivel competență cu 3 variante vizuale (gri / albastru / verde)
- [x] Animații staggered cu `whileInView` per categorie
- [x] Șterge `SkillsList.tsx` (înlocuit) și `activator/route.tsx` (nefolosit)
