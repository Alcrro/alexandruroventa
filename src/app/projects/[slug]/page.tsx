import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getProject from "@/_lib/projects/getProject";
import ProjectDetail from "@/features/projects/ProjectDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getProject(params.slug);
  if (!data?.project) return { title: "Project — Alexandru Roventa" };
  return {
    title: `${data.project.title} — Alexandru Roventa`,
    description: data.project.moreDescription || `Project: ${data.project.title}`,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const data = await getProject(params.slug);
  if (!data?.project) notFound();
  return <ProjectDetail project={data.project} />;
}
