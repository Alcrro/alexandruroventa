import getProjects from "@/_lib/projects/getProjects";
import ProjectsGrid from "./ProjectsGrid";
import "./projects.scss";

export default async function ProjectsPage() {
  const data = await getProjects();
  const projects = data?.projects ?? [];

  return (
    <section className="projects-section">
      <h1 className="projects-title">Projects</h1>
      <ProjectsGrid projects={projects} />
    </section>
  );
}
