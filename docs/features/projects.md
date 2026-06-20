# Projects

## PRD

Pagina `/projects` prezintă proiectele personale ca o galerie cu card-uri vizuale. Sursa de date este **GitHub** — orice repo marcat cu topic-ul `portfolio` apare automat pe site.

- Grid de card-uri: screenshot/preview + titlu + badge-uri tech + link-uri
- Sursă de date: GitHub API (topic `portfolio`) — fără MongoDB
- Limbaje detectate automat din GitHub Languages API (mai precis decât topics)
- Screenshot din repo (`preview.png`), fallback la OG image GitHub
- Filtru client-side după tehnologie
- Pagină de detalii per proiect (`/projects/[slug]`)
- ISR cu revalidare la 1 oră
- Animații staggered + re-animare la schimbare filtru

**Proiect simplu** (un repo):
1. Adaugă topic `portfolio` pe repo din interfața GitHub
2. Apare pe site în maxim 1 oră

**Proiect cu frontend + backend separat** (un card, două link-uri GitHub):
1. Ambele repo-uri au topic `portfolio`
2. Backend-ul se numește `{frontend-name}-api` / `-backend` / `-server` / `-be`
3. Card-ul afișează `[Frontend ↗]` și `[Backend ↗]` separat, tehnologiile se combină

**Screenshot custom:**
- Adaugă `preview.png` în rădăcina repo-ului (branch `main`)
- Dacă lipsește → fallback automat la OG image generată de GitHub

---

## Tech Spec

### Fișiere

```
src/features/projects/
├── ProjectsGrid.tsx        # Grid + filtru — "use client"
├── ProjectCard.tsx         # Card: screenshot, titlu, tech, butoane
├── ProjectDetail.tsx       # Pagina de detalii /projects/[slug]
├── ProjectImage.tsx        # "use client" — încearcă screenshotUrl, fallback la ogImageUrl
├── TechBadge.tsx           # Badge colorat per tehnologie
├── techColors.ts           # Map culori: { bg, text } per limbaj
└── projects.scss

src/app/projects/
├── page.tsx                # export revalidate = 3600, randează ProjectsPage
└── [slug]/page.tsx         # generateStaticParams + generateMetadata, ISR

src/_lib/github/
└── getGithubProjects.ts    # getGithubProjects() + getGithubProject(slug)

next.config.mjs             # remotePatterns: opengraph.githubassets.com, raw.githubusercontent.com
```

### `IGithubProject` (src/types.ts)

```typescript
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
  updatedAt: string;
}
```

### `getGithubProjects.ts`

**Constants:**
```typescript
const GITHUB_USER = "Alcrro";
const PORTFOLIO_TOPIC = "portfolio";
const BACKEND_SUFFIXES = ["-api", "-backend", "-server", "-be"];
```

**`getRepoLanguages(repoName)`** — apelează `/repos/Alcrro/{repo}/languages`, returnează array de string-uri sortate descendent după bytes (ordinea GitHub).

**`getGithubProjects()`:**
1. Fetch toate repo-urile userului (`/users/Alcrro/repos?per_page=100&sort=updated`)
2. Filtrează după topic `portfolio`
3. Separă în `mainRepos` (fără sufix backend) și `backendRepos` (cu sufix)
4. Construiește `backendMap: Map<frontendName, backendRepo>` — perechi detectate după sufix
5. Backend-urile fără pereche → card separat
6. `Promise.all` pentru toate repo-urile: fetch `getRepoLanguages` frontend + backend în paralel
7. `mapRepo(repo, mainLangs, backendRepo, backendLangs)` → `IGithubProject`

**`getGithubProject(slug)`:**
1. Încearcă toți BACKEND_SUFFIXES în paralel (`/repos/Alcrro/{slug}{suffix}`)
2. Fetch repo principal + languages în paralel cu căutarea backend-ului
3. Returnează `null` dacă repo nu există sau nu are topic `portfolio`

**`mapRepo(repo, mainLangs, backendRepo, backendLangs)`:**
- `languagesUsed` = `[...mainLangs, ...backendLangs.filter(l => !mainLangs.includes(l))]`
- Fallback dacă ambele liste sunt goale: `repo.language + topics` (fără `portfolio`)
- `title` = `repo.name.replace(/-/g, " ")` → Title Case
- `screenshotUrl` = `https://raw.githubusercontent.com/Alcrro/{name}/main/preview.png`
- `ogImageUrl` = `https://opengraph.githubassets.com/1/Alcrro/{name}`

### `ProjectImage.tsx`

Client component cu fallback:
```tsx
const [src, setSrc] = useState(screenshotUrl);
<Image src={src} onError={() => setSrc(ogImageUrl)} ... />
```

### Butoane GitHub condiționale

```tsx
// ProjectCard + ProjectDetail
{project.backendRepository ? (
  <>
    <Link href={project.gitRepository}>Frontend ↗</Link>
    <Link href={project.backendRepository}>Backend ↗</Link>
  </>
) : (
  <Link href={project.gitRepository}>GitHub ↗</Link>
)}
```

### Filtrare client-side (`ProjectsGrid`)

```typescript
const allTechs = Array.from(new Set(projects.flatMap(p => p.languagesUsed))).sort();
const [activeFilter, setActiveFilter] = useState<string | null>(null);
const filtered = activeFilter
  ? projects.filter(p => p.languagesUsed.includes(activeFilter))
  : projects;
const toggleFilter = (tech: string) =>
  setActiveFilter(prev => prev === tech ? null : tech);
```

### Animații (`AnimatePresence` la schimbare filtru)

```typescript
<AnimatePresence mode="wait">
  <motion.div key={activeFilter ?? "all"} variants={container} initial="hidden" animate="visible">
    {filtered.map(p => <motion.div key={p.id} variants={card}><ProjectCard /></motion.div>)}
  </motion.div>
</AnimatePresence>
```

### ISR (`src/app/projects/page.tsx` + `[slug]/page.tsx`)

```typescript
export const revalidate = 3600; // ambele pagini
```

`[slug]/page.tsx` are și `generateStaticParams` (pre-build la deploy) + `generateMetadata` dinamic.

### Variabile de mediu

```
GITHUB_TOKEN    # opțional — rate limit 60 → 5000 req/oră
```

---

## TODO

- [ ] Adaugă topic `portfolio` pe repo-urile dorite din GitHub
- [ ] Adaugă `preview.png` (screenshot) în rădăcina repo-urilor pentru imagine custom
- [ ] Adaugă `GITHUB_TOKEN` în env vars Amplify (recomandat pentru producție)
- [ ] Șterge `src/app/api/projects/` și `src/models/projects/` (înlocuite, neutilizate)
