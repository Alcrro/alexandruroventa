import Link from "next/link";
import { IGithubProject } from "@/types";
import TechBadge from "./TechBadge";
import ProjectImage from "./ProjectImage";

export default function ProjectCard({ project }: { project: IGithubProject }) {
  const isWip = project.status === "wip";

  return (
    <div className={`project-card${isWip ? " project-card--wip" : ""}`}>
      <Link href={`/projects/${project.slug}`} className="project-thumb">
        <ProjectImage
          screenshotUrl={project.screenshotUrl}
          ogImageUrl={project.ogImageUrl}
          alt={project.title}
          width={600}
          height={340}
          className={`project-thumb-img${isWip ? " project-thumb-img--wip" : ""}`}
        />
        {isWip && (
          <span className="project-wip-badge">In Progress</span>
        )}
      </Link>

      <div className="project-card-body">
        <div className="project-card-header">
          <h2 className="project-card-title">
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </h2>
          {project.isDeployed && project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-live-link"
            >
              {project.link.replace(/^https?:\/\//, "")}
              <i className="bi bi-box-arrow-up-right" />
            </Link>
          )}
        </div>

        {project.description && (
          <p className="project-description">{project.description}</p>
        )}

        <div className="project-tech">
          {project.languagesUsed.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        <div className="project-actions">
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
          {project.isDeployed && project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <i className="bi bi-box-arrow-up-right" /> Live
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
