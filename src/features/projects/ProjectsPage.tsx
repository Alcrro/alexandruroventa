import { getGithubProjects } from "@/_lib/github/getGithubProjects";
import ProjectsGrid from "./ProjectsGrid";
import "./projects.scss";

export default async function ProjectsPage() {
  const projects = await getGithubProjects();

  return (
    <section className="projects-section">
      <h1 className="projects-title">Projects</h1>
      <ProjectsGrid projects={projects} />
    </section>
  );
}
