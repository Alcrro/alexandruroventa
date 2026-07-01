import Link from "next/link";
import { IGithubProject } from "@/types";
import TechBadge from "./TechBadge";
import ProjectImage from "./ProjectImage";
import FlowDiagram from "./FlowDiagram";
import "./projects.scss";

export default function ProjectDetail({ project }: { project: IGithubProject }) {
  const isWip = project.status === "wip";

  const done = project.roadmap?.filter((f) => f.status === "done") ?? [];
  const inProgress = project.roadmap?.filter((f) => f.status === "in-progress") ?? [];
  const notStarted = project.roadmap?.filter((f) => f.status === "not-started") ?? [];
  const total = project.roadmap?.length ?? 0;
  const progress = total > 0 ? Math.round((done.length / total) * 100) : 0;

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

      {total > 0 && (
        <div className="project-roadmap">
          <div className="project-roadmap-header">
            <h2 className="project-roadmap-title">Features</h2>
            <div className="project-roadmap-stats">
              <span className="roadmap-stat roadmap-stat--done">{done.length} shipped</span>
              {inProgress.length > 0 && (
                <span className="roadmap-stat roadmap-stat--progress">{inProgress.length} in progress</span>
              )}
              {notStarted.length > 0 && (
                <span className="roadmap-stat roadmap-stat--planned">{notStarted.length} planned</span>
              )}
            </div>
          </div>

          <div className="project-roadmap-bar">
            <div className="project-roadmap-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="project-roadmap-board">
            {done.length > 0 && (
              <div className="roadmap-col roadmap-col--done">
                <h3 className="roadmap-col-title">
                  <span className="roadmap-col-dot" />
                  Shipped
                  <span className="roadmap-col-count">{done.length}</span>
                </h3>
                <ul className="roadmap-col-list">
                  {done.map((f) => (
                    <li key={f.name} className="roadmap-feature">{f.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {inProgress.length > 0 && (
              <div className="roadmap-col roadmap-col--progress">
                <h3 className="roadmap-col-title">
                  <span className="roadmap-col-dot" />
                  In Progress
                  <span className="roadmap-col-count">{inProgress.length}</span>
                </h3>
                <ul className="roadmap-col-list">
                  {inProgress.map((f) => (
                    <li key={f.name} className="roadmap-feature">{f.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {notStarted.length > 0 && (
              <div className="roadmap-col roadmap-col--planned">
                <h3 className="roadmap-col-title">
                  <span className="roadmap-col-dot" />
                  Planned
                  <span className="roadmap-col-count">{notStarted.length}</span>
                </h3>
                <ul className="roadmap-col-list">
                  {notStarted.map((f) => (
                    <li key={f.name} className="roadmap-feature">{f.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {project.schema && (
        <div className="flow-diagram-section">
          <p className="flow-diagram-heading">Database schema</p>
          <FlowDiagram schema={project.schema} />
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
        {project.isDeployed && project.link && (
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
