export const dynamic = "force-dynamic";
import { Metadata } from "next/types";
import Projects from "../../components/projects/Projects";
import React from "react";
import getProjects from "@/_lib/projects/getProjects";

export const metadata: Metadata = {
  title: "Alexandru Roventa - My Projects",
  description: "Home",
};

export default async function page() {
  const projects = await getProjects();

  return (
    <div className="projects-container">
      <Projects projects={projects.projects} />
    </div>
  );
}
