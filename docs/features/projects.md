# Projects

## PRD

Pagina `/projects` prezintă proiectele personale ca o galerie cu card-uri vizuale. Sursa de date este **GitHub** — orice repo marcat cu topic-ul `portfolio` apare automat pe site.

- Grid de card-uri: screenshot/preview + titlu + badge-uri tech + link-uri
- Sursă de date: GitHub API (topic `portfolio`) — fără MongoDB
- Limbaje detectate automat din GitHub Languages API
- Screenshot din repo (`preview.png`), fallback la OG image GitHub
- Filtru client-side după tehnologie
- Pagină de detalii per proiect (`/projects/[slug]`)
- ISR cu revalidare la 5 minute
- Animații staggered + re-animare la schimbare filtru

**Proiect simplu** (un repo):
1. Adaugă topic `portfolio` pe repo din interfața GitHub
2. Apare pe site în maxim 5 minute

**Proiect WIP** (în lucru):
1. Adaugă topic `portfolio-wip` pe repo
2. Apare ca un card estompat cu badge "In Progress" în maxim 5 minute
3. Nu afișează butonul Live
4. Când proiectul e gata, înlocuiești `portfolio-wip` cu `portfolio`

**Proiect cu frontend + backend separat** (un card, două link-uri GitHub):
1. Ambele repo-uri au topic `portfolio` (sau `portfolio-wip`)
2. Backend-ul se numește `{frontend-name}-api` / `-backend` / `-server` / `-be`
3. Cardul afișează `[Frontend]` și `[Backend]` separat, tehnologiile se combină

**Screenshot custom:**
- Adaugă `preview.png` în rădăcina repo-ului (branch `main`)
- Dacă lipsește → fallback automat la OG image generată de GitHub

**Roadmap features:**
- Adaugă `roadmap.json` în rădăcina repo-ului (branch `main`)
- Apare automat pe pagina de detalii ca listă de features cu status vizual
- Statusuri disponibile: `done` (verde), `in-progress` (albastru), `not-started` (gri)
- Dacă fișierul lipsește, secțiunea nu apare

---

## Tech Spec

### Fișiere

```
src/features/projects/
├── ProjectsGrid.tsx        # Grid + filtru — "use client"
├── ProjectCard.tsx         # Card: screenshot, titlu, tech, butoane, WIP state
├── ProjectDetail.tsx       # Pagina de detalii /projects/[slug]
├── ProjectImage.tsx        # "use client" — încearcă screenshotUrl, fallback la ogImageUrl
├── TechBadge.tsx           # Badge colorat per tehnologie
├── techColors.ts           # Map culori: { bg, text } per limbaj
└── projects.scss

src/app/projects/
├── page.tsx                # export revalidate = 300, randează ProjectsPage
└── [slug]/page.tsx         # generateStaticParams + generateMetadata, ISR

src/_lib/github/
└── getGithubProjects.ts    # getGithubProjects() + getGithubProject(slug)

next.config.mjs             # remotePatterns: opengraph.githubassets.com, raw.githubusercontent.com
roadmap.json                # roadmap-ul acestui repo (portfolio site)
```

### `IGithubProject` + `IRoadmapFeature` (src/types.ts)

```typescript
export type RoadmapStatus = "done" | "in-progress" | "not-started";

export interface IRoadmapFeature {
  name: string;
  status: RoadmapStatus;
}

export interface IGithubProject {
  id: number;
  title: string;            // repo.name convertit din kebab-case în Title Case
  slug: string;             // repo.name (as-is — folosit în URL)
  description: string;      // repo.description
  link: string;             // repo.homepage (live site)
  gitRepository: string;    // repo.html_url (frontend GitHub)
  backendRepository?: string; // html_url al repo-ului backend pereche (dacă există)
  languagesUsed: string[];  // din Languages API — frontend + backend combinate
  screenshotUrl: string;    // raw.githubusercontent.com/{repo}/main/preview.png
  ogImageUrl: string;       // opengraph.githubassets.com/1/Alcrro/{repo}
  status: "live" | "wip";  // "live" dacă are topic portfolio, "wip" dacă are portfolio-wip
  updatedAt: string;
  roadmap?: IRoadmapFeature[]; // din roadmap.json în root-ul repo-ului
}
```

### `getGithubProjects.ts`

**Constants:**
```typescript
const GITHUB_USER = "Alcrro";
const PORTFOLIO_TOPIC = "portfolio";
const WIP_TOPIC = "portfolio-wip";
const BACKEND_SUFFIXES = ["-api", "-backend", "-server", "-be"];
```

**`getRepoRoadmap(repoName)`** — fetch `raw.githubusercontent.com/Alcrro/{repo}/main/roadmap.json`, returnează `IRoadmapFeature[]` sau `undefined` dacă fișierul lipsește.

**`getRepoLanguages(repoName)`** — apelează `/repos/Alcrro/{repo}/languages`, returnează array de string-uri sortate descendent după bytes (ordinea GitHub).

**`getRepoStatus(topics)`** — returnează `"live"` dacă topics include `portfolio`, altfel `"wip"`.

**`getGithubProjects()`:**
1. Fetch toate repo-urile userului (`/users/Alcrro/repos?per_page=100&sort=updated`)
2. Filtrează după topic `portfolio` **sau** `portfolio-wip`
3. Separă în `mainRepos` și `backendRepos` după sufix
4. Construiește `backendMap: Map<frontendName, backendRepo>`
5. Backend-urile fără pereche → card separat
6. `Promise.all` pentru toate repo-urile: fetch `getRepoLanguages` + `getRepoRoadmap` în paralel
7. `mapRepo(repo, mainLangs, backendRepo, backendLangs, roadmap)` → `IGithubProject`

**`getGithubProject(slug)`:**
1. Încearcă toți BACKEND_SUFFIXES în paralel
2. Fetch repo principal + languages + roadmap în paralel cu căutarea backend-ului
3. Returnează `null` dacă repo nu există sau nu are topic `portfolio` / `portfolio-wip`

**`mapRepo(repo, mainLangs, backendRepo, backendLangs, roadmap?)`:**
- `languagesUsed` = `[...mainLangs, ...backendLangs.filter(l => !mainLangs.includes(l))]`
- Fallback dacă ambele liste sunt goale: `repo.language + topics` (fără `portfolio`/`portfolio-wip`)
- `title` = `repo.name.replace(/-/g, " ")` → Title Case
- `status` = `"live"` dacă `topics.includes("portfolio")`, altfel `"wip"`
- `roadmap` = atașat doar dacă `getRepoRoadmap` returnează date

### WIP cards

```tsx
// ProjectCard.tsx
const isWip = project.status === "wip";

<div className={`project-card${isWip ? " project-card--wip" : ""}`}>
  <Link className="project-thumb">          // position: relative pentru badge
    <ProjectImage className={`project-thumb-img${isWip ? " project-thumb-img--wip" : ""}`} />
    {isWip && <span className="project-wip-badge">In Progress</span>}
  </Link>
  {!isWip && project.link && <LiveLink />}  // butonul Live ascuns pentru WIP
</div>
```

CSS: `.project-card--wip` border dashed + opacity 0.85; `.project-thumb-img--wip` blur(2px) + grayscale(40%); `.project-wip-badge` absolute centrat pe thumbnail.

### Roadmap pe pagina de detalii

```tsx
// ProjectDetail.tsx
{project.roadmap && project.roadmap.length > 0 && (
  <div className="project-roadmap">
    <h2 className="project-roadmap-title">Features</h2>
    <ul className="project-roadmap-list">
      {project.roadmap.map((feature) => (
        <li className={`project-roadmap-item project-roadmap-item--${feature.status}`}>
          <span className="project-roadmap-icon" />
          {feature.name}
        </li>
      ))}
    </ul>
  </div>
)}
```

CSS: `.project-roadmap-item--done` icon verde `#22c55e`; `--in-progress` icon `var(--accent)`; `--not-started` icon `var(--bg-elevated)` cu border.

### `roadmap.json` schema

```json
[
  { "name": "Feature Name", "status": "done" },
  { "name": "Feature Name", "status": "in-progress" },
  { "name": "Feature Name", "status": "not-started" }
]
```

Fișierul se pune în root-ul repo-ului GitHub. Dacă lipsește, secțiunea Features nu apare pe pagina de detalii.

### `ProjectImage.tsx`

Client component cu fallback:
```tsx
const [src, setSrc] = useState(screenshotUrl);
<Image src={src} onError={() => setSrc(ogImageUrl)} ... />
```

### Butoane GitHub condiționale

```tsx
{project.backendRepository ? (
  <>
    <Link href={project.gitRepository}>Frontend</Link>
    <Link href={project.backendRepository}>Backend</Link>
  </>
) : (
  <Link href={project.gitRepository}>GitHub</Link>
)}
{!isWip && project.link && <Link href={project.link}>Live</Link>}
```

### Filtrare client-side (`ProjectsGrid`)

```typescript
const allTechs = Array.from(new Set(projects.flatMap(p => p.languagesUsed))).sort();
const [activeFilter, setActiveFilter] = useState<string | null>(null);
const filtered = activeFilter
  ? projects.filter(p => p.languagesUsed.includes(activeFilter))
  : projects;
```

### Animații (`AnimatePresence` la schimbare filtru)

```typescript
<AnimatePresence mode="wait">
  <motion.div key={activeFilter ?? "all"} variants={container} initial="hidden" animate="visible">
    {filtered.map(p => <motion.div key={p.id} variants={card}><ProjectCard /></motion.div>)}
  </motion.div>
</AnimatePresence>
```

### ISR

```typescript
export const revalidate = 300; // 5 minute — ambele pagini + fetch-uri GitHub
```

`[slug]/page.tsx` are și `generateStaticParams` (pre-build la deploy) + `generateMetadata` dinamic.

### Variabile de mediu

```
GITHUB_TOKEN    # opțional — rate limit 60 → 5000 req/oră (recomandat în producție)
```

---

## TODO

- [ ] Adaugă topic `portfolio` sau `portfolio-wip` pe repo-urile dorite din GitHub
- [ ] Adaugă `preview.png` în rădăcina repo-urilor pentru screenshot custom
- [ ] Adaugă `roadmap.json` în repo-urile care au features de afișat
- [ ] Adaugă `GITHUB_TOKEN` în env vars Amplify (recomandat pentru producție)
- [x] Șterge `src/app/api/projects/`, `src/models/projects/`, `src/_lib/projects/` (înlocuite, neutilizate)
