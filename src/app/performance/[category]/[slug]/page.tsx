import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PerformanceEntry from "@/features/performance/PerformanceEntry";

export const dynamic = "force-dynamic";

async function getEntry(category: string, slug: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/performance/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`,
    { cache: "no-cache" }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const data = await getEntry(params.category, params.slug);
  if (!data?.entry) return { title: "Knowledge Tracker — Alexandru Roventa" };
  return {
    title: `${data.entry.contentTitle} — ${params.category} · Alexandru Roventa`,
  };
}

export default async function EntryPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const data = await getEntry(params.category, params.slug);
  if (!data?.entry) notFound();

  return <PerformanceEntry entry={data.entry} codeVersion={data.codeVersion} />;
}
