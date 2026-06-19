export interface Skill {
  _id: string;
  skillName: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  icon?: string;
}

const levelLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skill-card">
      <div className="skill-icon">
        {skill.icon ? (
          <i className={`bi ${skill.icon}`} />
        ) : (
          <span className="skill-initial">{skill.skillName[0].toUpperCase()}</span>
        )}
      </div>
      <span className="skill-name">{skill.skillName}</span>
      {skill.level && (
        <span className={`skill-level level-${skill.level}`}>
          {levelLabel[skill.level] ?? skill.level}
        </span>
      )}
    </div>
  );
}
