import React from "react";
import SkillForm from "./SkillForm";
import "./addSkill.scss";
export default function AddSkill() {
  return (
    <div className="add-skill-content">
      <div className="add-skill">
        <SkillForm />
      </div>
    </div>
  );
}
