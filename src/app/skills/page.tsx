export const dynamic = "force-dynamic";
import React from "react";
import "./skills.scss";
import { Metadata } from "next/types";
import SkillsList from "@/components/skills/SkillsList";
import getSkillsList from "@/_lib/skills/getSkills";
import AddButtons from "@/components/buttons/AddButtons";

export const metadata: Metadata = {
  title: "Alexandru Roventa - My skills",
  description: "Home",
};

export default async function page() {
  const skillList = await getSkillsList();

  return (
    <div className="skills-container">
      <div className="skill-add-container mb-4">
        <AddButtons description="add-skill" />
      </div>
      <div className="skills-inner">
        <SkillsList skills={skillList.skills} />
      </div>
    </div>
  );
}
