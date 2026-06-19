import type { Metadata } from "next";
import SkillsPage from "@/features/skills/SkillsPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alexandru Roventa — Skills",
  description: "Technical skills — Frontend, Backend, Database, DevOps and Tools.",
};

export default function SkillsRoute() {
  return <SkillsPage />;
}
