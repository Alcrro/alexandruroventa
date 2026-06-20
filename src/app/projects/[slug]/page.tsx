import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getGithubProject,
  getGithubProjects,
} from "@/_lib/github/getGithubProjects";
import ProjectDetail from "@/features/projects/ProjectDetail";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getGithubProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getGithubProject(params.slug);
  if (!project) return { title: "Project — Alexandru Roventa" };
  return {
    title: `${project.title} — Alexandru Roventa`,
    description: project.description || `Project: ${project.title}`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getGithubProject(params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
