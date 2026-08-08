import getExperience from "@/_lib/experience/getExperience";
import ExperienceContainer from "./ExperienceContainer";
import ExperienceHeader from "./ExperienceHeader";
import "./experience.scss";

export default async function ExperienceTimeline() {
  const data = await getExperience();
  const experiences: any[] = data?.experiences ?? [];

  const sorted = [...experiences].sort(
    (a, b) => new Date(b.startYear).getTime() - new Date(a.startYear).getTime()
  );

  return (
    <section className="experience-section">
      <div className="exp-orb exp-orb--1" aria-hidden />
      <div className="exp-orb exp-orb--2" aria-hidden />
      <div className="exp-orb exp-orb--3" aria-hidden />
      <ExperienceHeader experiences={sorted} />
      <ExperienceContainer items={sorted} />
    </section>
  );
}
