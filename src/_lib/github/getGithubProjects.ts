import { IGithubProject, IRoadmapFeature } from "@/types";

const GITHUB_USER = "Alcrro";
const PORTFOLIO_TOPIC = "portfolio";
const WIP_TOPIC = "portfolio-wip";
const BACKEND_SUFFIXES = ["-api", "-backend", "-server", "-be"] as const;

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

async function getRepoRoadmap(repoName: string, branch: string): Promise<IRoadmapFeature[] | undefined> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/${branch}/roadmap.json`,
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { next: { revalidate: 300 } }
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    if (!Array.isArray(data)) return undefined;
    return data as IRoadmapFeature[];
  } catch {
    return undefined;
  }
}

async function getRepoLanguages(repoName: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repoName}/languages`,
      { headers, next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const langs: Record<string, number> = await res.json();
    return Object.keys(langs);
  } catch {
    return [];
  }
}

function isBackendRepo(name: string): boolean {
  return BACKEND_SUFFIXES.some((s) => name.endsWith(s));
}

function getRepoStatus(topics: string[]): "live" | "wip" {
  if (topics.includes(PORTFOLIO_TOPIC)) return "live";
  return "wip";
}

function mapRepo(
  repo: any,
  mainLangs: string[],
  backendRepo: any | null,
  backendLangs: string[],
  roadmap?: IRoadmapFeature[],
): IGithubProject {
  const branch: string = repo.default_branch ?? "main";
  const topics = repo.topics as string[];
  const nonPortfolioTopics = topics.filter(
    (t) => t !== PORTFOLIO_TOPIC && t !== WIP_TOPIC
  );

  const combinedLangs =
    mainLangs.length > 0 || backendLangs.length > 0
      ? [...mainLangs, ...backendLangs.filter((l) => !mainLangs.includes(l))]
      : repo.language
      ? [repo.language, ...nonPortfolioTopics]
      : nonPortfolioTopics;

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
    screenshotUrl: `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/${branch}/preview.png`,
    ogImageUrl: `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`,
    status: getRepoStatus(topics),
    updatedAt: repo.updated_at,
    ...(roadmap && { roadmap }),
  };
}

function buildProjects(portfolioRepos: any[]) {
  const backendRepos = portfolioRepos.filter((r) => isBackendRepo(r.name));
  const mainRepos = portfolioRepos.filter((r) => !isBackendRepo(r.name));

  const backendMap = new Map<string, any>();
  for (const be of backendRepos) {
    const suffix = BACKEND_SUFFIXES.find((s) => be.name.endsWith(s))!;
    const frontendName = be.name.slice(0, -suffix.length);
    if (mainRepos.some((m) => m.name === frontendName)) {
      backendMap.set(frontendName, be);
    }
  }

  const pairedBackendNames = new Set(
    Array.from(backendMap.values()).map((b) => b.name)
  );
  const unpairedBackends = backendRepos.filter(
    (b) => !pairedBackendNames.has(b.name)
  );

  return { mainRepos, backendMap, unpairedBackends };
}

export async function getGithubProjects(): Promise<IGithubProject[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    { headers, next: { revalidate: 300 } }
  );
  if (!res.ok) return [];

  const allRepos: any[] = await res.json();
  const portfolioRepos = allRepos.filter(
    (r) =>
      r.topics?.includes(PORTFOLIO_TOPIC) || r.topics?.includes(WIP_TOPIC)
  );

  const { mainRepos, backendMap, unpairedBackends } =
    buildProjects(portfolioRepos);

  return Promise.all(
    [...mainRepos, ...unpairedBackends].map(async (repo) => {
      const backendRepo = backendMap.get(repo.name) ?? null;
      const [mainLangs, backendLangs, roadmap] = await Promise.all([
        getRepoLanguages(repo.name),
        backendRepo ? getRepoLanguages(backendRepo.name) : Promise.resolve([]),
        getRepoRoadmap(repo.name, repo.default_branch ?? "main"),
      ]);
      return mapRepo(repo, mainLangs, backendRepo, backendLangs, roadmap);
    })
  );
}

export async function getGithubProject(
  slug: string
): Promise<IGithubProject | null> {
  const backendCandidates = await Promise.all(
    BACKEND_SUFFIXES.map(async (suffix) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${slug}${suffix}`,
          { headers, next: { revalidate: 300 } }
        );
        if (!res.ok) return null;
        const r = await res.json();
        return r.topics?.includes(PORTFOLIO_TOPIC) ||
          r.topics?.includes(WIP_TOPIC)
          ? r
          : null;
      } catch {
        return null;
      }
    })
  );
  const backendRepo = backendCandidates.find(Boolean) ?? null;

  const [repoRes, mainLangs, backendLangs] = await Promise.all([
    fetch(`https://api.github.com/repos/${GITHUB_USER}/${slug}`, {
      headers,
      next: { revalidate: 300 },
    }),
    getRepoLanguages(slug),
    backendRepo ? getRepoLanguages(backendRepo.name) : Promise.resolve([]),
  ]);

  if (!repoRes.ok) return null;
  const repo = await repoRes.json();
  if (
    !repo.topics?.includes(PORTFOLIO_TOPIC) &&
    !repo.topics?.includes(WIP_TOPIC)
  )
    return null;

  const roadmap = await getRepoRoadmap(slug, repo.default_branch ?? "main");

  return mapRepo(repo, mainLangs, backendRepo, backendLangs, roadmap);
}
