export default function SkillsList({ skills }: { skills: any }) {
  return (
    <ul>
      {skills.map((skill: any) => (
        <li key={skill.id}>{skill.skillName}</li>
      ))}
    </ul>
  );
}
