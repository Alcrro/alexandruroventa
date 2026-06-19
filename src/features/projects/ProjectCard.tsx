import Image from "next/image";
import Link from "next/link";
import { IProjectsSchema } from "@/types";
import TechBadge from "./TechBadge";

function ensureHttps(url: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
}

function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ProjectCard({ project }: { project: IProjectsSchema }) {
  const slug = project.slug ?? toSlug(project.title);
  const liveUrl = ensureHttps(project.link);
  const gitUrl = ensureHttps(project.gitRepository);

  return (
    <div className="project-card">
      <Link href={`/projects/${slug}`} className="project-thumb">
        <Image
          src={`/projects/${project.thumbnailPhoto}`}
          alt={project.title}
          width={600}
          height={340}
          className="project-thumb-img"
        />
      </Link>

      <div className="project-card-body">
        <div className="project-card-header">
          <h2 className="project-card-title">
            <Link href={`/projects/${slug}`}>{project.title}</Link>
          </h2>
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-live-link"
          >
            {project.link.replace(/^https?:\/\//, "")}
            <i className="bi bi-box-arrow-up-right" />
          </Link>
        </div>

        {project.moreDescription && (
          <p className="project-description">{project.moreDescription}</p>
        )}

        <div className="project-tech">
          {project.languagesUsed.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        <div className="project-meta">
          {project.hosted && (
            <span className="project-hosted">
              <i className="bi bi-cloud" /> {project.hosted}
            </span>
          )}
        </div>

        <div className="project-actions">
          {project.gitRepository && (
            <Link
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="bi bi-github" /> GitHub
            </Link>
          )}
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <i className="bi bi-box-arrow-up-right" /> Live
          </Link>
        </div>
      </div>
    </div>
  );
}
