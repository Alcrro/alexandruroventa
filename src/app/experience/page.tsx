import type { Metadata } from "next";
import ExperienceTimeline from "@/features/experience/ExperienceTimeline";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alexandru Roventa — Journey",
  description: "My journey as a developer — from university to building SaaS products independently.",
};

export default function ExperiencePage() {
  return <ExperienceTimeline />;
}
