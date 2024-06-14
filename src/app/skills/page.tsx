import React from "react";
import "./skills.scss";
import { GetStaticProps, Metadata } from "next/types";
import SkillsList from "@/components/skills/SkillsList";
import getSkillsList from "@/_lib/skills/getSkills";

export const metadata: Metadata = {
  title: "Alexandru Roventa - My skills",
  description: "Home",
};

export default async function page() {
  const skillList = await getSkillsList();

  return (
    <div className="skills-container">
      <div className="skills-inner">
        <SkillsList skills={skillList} />
      </div>
    </div>
  );
}
