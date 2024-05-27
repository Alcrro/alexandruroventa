import { skills } from "@/_lib/skills/skills";
import React from "react";
import "./skills.scss";
export default function page() {
  return (
    <div className="skills-container">
      <div className="skills-inner">
        <ul>
          {skills.map((skill) => (
            <li key={skill.id}>{skill.skillName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
