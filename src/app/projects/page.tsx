import type { Metadata } from "next";
import ProjectsPage from "@/features/projects/ProjectsPage";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Alexandru Roventa — Projects",
  description: "Personal projects — web development, automation and more.",
};

export default function ProjectsRoute() {
  return <ProjectsPage />;
}
