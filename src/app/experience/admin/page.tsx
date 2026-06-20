import type { Metadata } from "next";
import getExperience from "@/_lib/experience/getExperience";
import ExperienceAdmin from "@/features/experience/ExperienceAdmin";
import "@/features/experience/experience.scss";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Experience",
  robots: "noindex, nofollow",
};

export default async function ExperienceAdminPage() {
  const data = await getExperience();
  const experiences = (data?.experiences ?? []).sort(
    (a: any, b: any) => new Date(b.startYear).getTime() - new Date(a.startYear).getTime()
  );

  return <ExperienceAdmin experiences={experiences} />;
}
