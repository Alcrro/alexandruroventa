import type { Metadata } from "next";
import ExperienceTimeline from "@/features/experience/ExperienceTimeline";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alexandru Roventa — Experience",
  description: "Professional experience timeline — Full Stack Developer.",
};

export default function ExperiencePage() {
  return <ExperienceTimeline />;
}
