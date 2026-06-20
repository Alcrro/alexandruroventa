import Link from "next/link";
import { IGithubProject } from "@/types";
import TechBadge from "./TechBadge";
import ProjectImage from "./ProjectImage";
import "./projects.scss";

export default function ProjectDetail({ project }: { project: IGithubProject }) {
  const isWip = project.status === "wip";

  return (
    <article className="project-detail">
      <div className="project-detail-back">
        <Link href="/projects" className="btn-secondary">
          <i className="bi bi-arrow-left" /> Back to projects
        </Link>
      </div>

      <h1 className="project-detail-title">
        {project.title}
        {isWip && <span className="project-wip-badge" style={{ position: "static", transform: "none", marginLeft: "1rem", display: "inline-block", verticalAlign: "middle" }}>In Progress</span>}
      </h1>

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

      {project.roadmap && project.roadmap.length > 0 && (
        <div className="project-roadmap">
          <h2 className="project-roadmap-title">Features</h2>
          <ul className="project-roadmap-list">
            {project.roadmap.map((feature) => (
              <li key={feature.name} className={`project-roadmap-item project-roadmap-item--${feature.status}`}>
                <span className="project-roadmap-icon" />
                {feature.name}
              </li>
            ))}
          </ul>
        </div>
      )}

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
        {!isWip && project.link && (
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
