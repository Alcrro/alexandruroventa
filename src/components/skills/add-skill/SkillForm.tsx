"use client";
import addExperienceAction from "@/components/actions/addExperienceAction";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import AddSkillAction from "./AddSkillAction";

export default function SkillForm() {
  const router = useRouter();
  async function setData(setData: FormData) {
    const skillName = setData.get("skillName");
    console.log(skillName);

    try {
      const response = await AddSkillAction(setData);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        router.push("/skills");
      }
    } catch (error: any) {
      console.log(error);
    }
  }
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
