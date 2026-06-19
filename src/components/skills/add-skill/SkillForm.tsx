import { redirect } from "next/navigation";
import { addSkill } from "@/_lib/skills/getSkills";

export default function SkillForm() {
  const setData = async (formData: FormData) => {
    "use server";
    const skillName = formData.get("skillName") as string;
    const category = formData.get("category") as string;
    const level = formData.get("level") as string;
    const icon = formData.get("icon") as string;

    await addSkill({ skillName, category, level, icon });
    redirect("/skills");
  };

  return (
    <form action={setData} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <div>
        <label htmlFor="skillName">Skill name</label>
        <input type="text" id="skillName" name="skillName" placeholder="e.g. React" required />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select id="category" name="category" required>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="DevOps">DevOps</option>
          <option value="Tools">Tools</option>
        </select>
      </div>

      <div>
        <label htmlFor="level">Level</label>
        <select id="level" name="level" defaultValue="intermediate" required>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label htmlFor="icon">Bootstrap Icon class (optional)</label>
        <input type="text" id="icon" name="icon" placeholder="e.g. bi-react" />
      </div>

      <button type="submit">Add skill</button>
    </form>
  );
}
