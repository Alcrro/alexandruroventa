import { IGithubProject } from "@/types";

const GITHUB_USER = "Alcrro";
const PORTFOLIO_TOPIC = "portfolio";
const BACKEND_SUFFIXES = ["-api", "-backend", "-server", "-be"] as const;

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

async function getRepoLanguages(repoName: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repoName}/languages`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const langs: Record<string, number> = await res.json();
    return Object.keys(langs); // sortate desc după bytes de GitHub
  } catch {
    return [];
  }
}

function isBackendRepo(name: string): boolean {
  return BACKEND_SUFFIXES.some((s) => name.endsWith(s));
}

function mapRepo(
  repo: any,
  mainLangs: string[],
  backendRepo: any | null,
  backendLangs: string[]
): IGithubProject {
  const combinedLangs =
    mainLangs.length > 0 || backendLangs.length > 0
      ? [...mainLangs, ...backendLangs.filter((l) => !mainLangs.includes(l))]
      : repo.language
      ? [repo.language, ...(repo.topics as string[]).filter((t: string) => t !== PORTFOLIO_TOPIC)]
      : (repo.topics as string[]).filter((t: string) => t !== PORTFOLIO_TOPIC);

  const title = (repo.name as string)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return {
    id: repo.id,
    title,
    slug: repo.name,
    description: repo.description ?? "",
    link: repo.homepage ?? "",
    gitRepository: repo.html_url,
    ...(backendRepo && { backendRepository: backendRepo.html_url }),
    languagesUsed: combinedLangs,
    screenshotUrl: `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/main/preview.png`,
    ogImageUrl: `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`,
    updatedAt: repo.updated_at,
  };
}

export async function getGithubProjects(): Promise<IGithubProject[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];

  const allRepos: any[] = await res.json();
  const portfolioRepos = allRepos.filter((r) =>
    r.topics?.includes(PORTFOLIO_TOPIC)
  );

  const backendRepos = portfolioRepos.filter((r) => isBackendRepo(r.name));
  const mainRepos = portfolioRepos.filter((r) => !isBackendRepo(r.name));

  // map: frontendName → backendRepo
  const backendMap = new Map<string, any>();
  for (const be of backendRepos) {
    const suffix = BACKEND_SUFFIXES.find((s) => be.name.endsWith(s))!;
    const frontendName = be.name.slice(0, -suffix.length);
    if (mainRepos.some((m) => m.name === frontendName)) {
      backendMap.set(frontendName, be);
    }
  }

  // backend-uri fără frontend pereche → card separat
  const pairedBackendNames = new Set(Array.from(backendMap.values()).map((b) => b.name));
  const unpairedBackends = backendRepos.filter(
    (b) => !pairedBackendNames.has(b.name)
  );

  return Promise.all(
    [...mainRepos, ...unpairedBackends].map(async (repo) => {
      const backendRepo = backendMap.get(repo.name) ?? null;
      const [mainLangs, backendLangs] = await Promise.all([
        getRepoLanguages(repo.name),
        backendRepo ? getRepoLanguages(backendRepo.name) : Promise.resolve([]),
      ]);
      return mapRepo(repo, mainLangs, backendRepo, backendLangs);
    })
  );
}

export async function getGithubProject(
  slug: string
): Promise<IGithubProject | null> {
  // Verifică dacă există repo backend pereche
  const backendCandidates = await Promise.all(
    BACKEND_SUFFIXES.map(async (suffix) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${slug}${suffix}`,
          { headers, next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        const r = await res.json();
        return r.topics?.includes(PORTFOLIO_TOPIC) ? r : null;
      } catch {
        return null;
      }
    })
  );
  const backendRepo = backendCandidates.find(Boolean) ?? null;

  const [repoRes, mainLangs, backendLangs] = await Promise.all([
    fetch(`https://api.github.com/repos/${GITHUB_USER}/${slug}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    getRepoLanguages(slug),
    backendRepo ? getRepoLanguages(backendRepo.name) : Promise.resolve([]),
  ]);

  if (!repoRes.ok) return null;
  const repo = await repoRes.json();
  if (!repo.topics?.includes(PORTFOLIO_TOPIC)) return null;

  return mapRepo(repo, mainLangs, backendRepo, backendLangs);
}
