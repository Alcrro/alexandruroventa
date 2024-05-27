import Link from "next/link";
import React from "react";
import { experience } from "@/_lib/experience/experience";
import "./experience.scss";

export default function page() {
  return (
    <div className="experience-container">
      <div className="experience-inner">
        <ul>
          {experience.map((skill) => (
            <li key={skill.id}>
              <Link href={`/experience/${skill.link}`} className={skill.link}>
                {skill.skillName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
