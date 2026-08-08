import { getGithubProjects } from "@/_lib/github/getGithubProjects";
import ProjectsGrid from "./ProjectsGrid";
import ProjectsHero from "./ProjectsHero";
import "./projects.scss";

export default async function ProjectsPage() {
  const projects = await getGithubProjects();

  return (
    <>
      <ProjectsHero count={projects.length} />
      <section className="projects-section">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
