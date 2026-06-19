import Image from "next/image";
import Link from "next/link";
import { IProjectsSchema } from "@/types";
import TechBadge from "./TechBadge";
import "./projects.scss";

function ensureHttps(url: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
}

export default function ProjectDetail({ project }: { project: IProjectsSchema }) {
  const liveUrl = ensureHttps(project.link);
  const gitUrl = ensureHttps(project.gitRepository);

  return (
    <article className="project-detail">
      <div className="project-detail-back">
        <Link href="/projects" className="btn-secondary">
          <i className="bi bi-arrow-left" /> Back to projects
        </Link>
      </div>

      <h1 className="project-detail-title">{project.title}</h1>

      <div className="project-detail-thumb">
        <Image
          src={`/projects/${project.thumbnailPhoto}`}
          alt={project.title}
          width={1200}
          height={675}
          className="project-detail-img"
          priority
        />
      </div>

      {project.moreDescription && (
        <p className="project-detail-description">{project.moreDescription}</p>
      )}

      <div className="project-detail-tech">
        {project.languagesUsed.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>

      {project.hosted && (
        <p className="project-detail-hosted">
          <i className="bi bi-cloud" /> Hosted on <strong>{project.hosted}</strong>
        </p>
      )}

      <div className="project-detail-actions">
        {project.gitRepository && (
          <Link href={gitUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <i className="bi bi-github" /> GitHub
          </Link>
        )}
        <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <i className="bi bi-box-arrow-up-right" /> Live site
        </Link>
      </div>
    </article>
  );
}
