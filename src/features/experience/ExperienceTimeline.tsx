import getExperience from "@/_lib/experience/getExperience";
import ExperienceContainer from "./ExperienceContainer";
import "./experience.scss";

export default async function ExperienceTimeline() {
  const data = await getExperience();
  const experiences: any[] = data?.experiences ?? [];

  const sorted = [...experiences].sort(
    (a, b) => new Date(b.startYear).getTime() - new Date(a.startYear).getTime()
  );

  return (
    <section className="experience-section">
      <h1 className="experience-title">Experience</h1>
      <ExperienceContainer items={sorted} />
    </section>
  );
}
