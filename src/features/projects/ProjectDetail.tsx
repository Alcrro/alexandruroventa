import Link from "next/link";
import { IGithubProject } from "@/types";
import TechBadge from "./TechBadge";
import ProjectImage from "./ProjectImage";
import "./projects.scss";

export default function ProjectDetail({ project }: { project: IGithubProject }) {
  return (
    <article className="project-detail">
      <div className="project-detail-back">
        <Link href="/projects" className="btn-secondary">
          <i className="bi bi-arrow-left" /> Back to projects
        </Link>
      </div>

      <h1 className="project-detail-title">{project.title}</h1>

      <div className="project-detail-thumb">
        <ProjectImage
          screenshotUrl={project.screenshotUrl}
          ogImageUrl={project.ogImageUrl}
          alt={project.title}
          width={1200}
          height={675}
          className="project-detail-img"
          priority
        />
      </div>

      {project.description && (
        <p className="project-detail-description">{project.description}</p>
      )}

      <div className="project-detail-tech">
        {project.languagesUsed.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>

      <div className="project-detail-actions">
        {project.backendRepository ? (
          <>
            <Link
              href={project.gitRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="bi bi-github" /> Frontend
            </Link>
            <Link
              href={project.backendRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="bi bi-github" /> Backend
            </Link>
          </>
        ) : (
          <Link
            href={project.gitRepository}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <i className="bi bi-github" /> GitHub
          </Link>
        )}
        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <i className="bi bi-box-arrow-up-right" /> Live site
          </Link>
        )}
      </div>
    </article>
  );
}
