import Link from "next/link";
import { getGithubProjects } from "@/_lib/github/getGithubProjects";
import FeaturedProjectCard from "./FeaturedProjectCard";

export default async function FeaturedProjects() {
  const projects = await getGithubProjects();
  const featured = projects.filter((p) => p.status === "live").slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="home-section-title">Featured Projects</h2>
        <Link href="/projects" className="see-all-link">
          See all <i className="bi bi-arrow-right" />
        </Link>
      </div>
      <div className="featured-grid">
        {featured.map((project, i) => (
          <FeaturedProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
