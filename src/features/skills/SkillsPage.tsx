import { getSkillsList } from "@/_lib/skills/getSkills";
import SkillCategory from "./SkillCategory";
import { Skill } from "./SkillCard";
import "./skills.scss";

const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "DevOps", "Tools"];

export default async function SkillsPage() {
  const data = await getSkillsList();
  const skills: Skill[] = data?.skills ?? [];

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category ?? "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const sortedCategories = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <section className="skills-section">
      <h1 className="skills-title">Skills</h1>
      {sortedCategories.map((category) => (
        <SkillCategory key={category} category={category} skills={grouped[category]} />
      ))}
    </section>
  );
}
