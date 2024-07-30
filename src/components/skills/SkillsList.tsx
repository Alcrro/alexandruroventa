export default function SkillsList({ skills }: { skills: string[] }) {
  return (
    <>
      
      <ul>
        {skills.map((skill: any) => (
          <li key={skill.id}>{skill.skillName}</li>
        ))}
      </ul>
    </>
  );
}
