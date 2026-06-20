import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PerformanceList from "@/features/performance/PerformanceList";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  return { title: `${params.category} — Knowledge Tracker · Alexandru Roventa` };
}

async function getEntries(category: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/performance/${encodeURIComponent(category)}`,
    { cache: "no-cache" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.entries ?? null;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const entries = await getEntries(params.category);
  if (!entries) notFound();

  return (
    <Suspense>
      <PerformanceList entries={entries} category={params.category} />
    </Suspense>
  );
}
