import React, { FormEvent } from "react";
import { addSkill } from "@/_lib/skills/getSkills";
import { redirect } from "next/navigation";

export default function SkillForm() {
  const setData = async (formData: FormData) => {
    "use server";
    const skillNameData: string = formData.get("skillName") as string;
    console.log(skillNameData);

    const data = await addSkill(skillNameData);

    console.log(data.success === true);

    redirect("/skills");
  };

  return (
    <form action={setData}>
      <div className="label-group">
        <label htmlFor="skillName">Add a skill</label>
        <input type="text" placeholder="Add a skill" name="skillName" />
      </div>

      <div className="add-skill-button">
        <button>Add</button>
      </div>
    </form>
  );
}
