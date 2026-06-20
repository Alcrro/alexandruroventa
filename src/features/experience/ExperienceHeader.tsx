import { iExperience } from "@/types";

export default function ExperienceHeader({ experiences }: { experiences: iExperience[] }) {
  const minYear = Math.min(...experiences.map((e) => new Date(e.startYear).getFullYear()));
  const totalYears = new Date().getFullYear() - minYear;

  return (
    <div className="exp-page-header">
      <h1 className="experience-title">Experience</h1>
      <p className="exp-total-years">{totalYears}+ years of professional experience</p>
    </div>
  );
}
