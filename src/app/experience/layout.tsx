import React from "react";
import "./experience.scss";
import "@/components/experience/addExperience/modal/addExperienceModal.scss";
export default function layout({
  addExperience,
  mainExperience,
}: {
  addExperience: React.ReactNode;
  mainExperience: React.ReactNode;
}) {
  return (
    <div className="experience-container min-h-[675.5px]">
      {mainExperience}
      {addExperience}
    </div>
  );
}
