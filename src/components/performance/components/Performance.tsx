import Link from "next/link";
import React from "react";
import "./performance.scss";
import getLanguageSkill from "@/_lib/languageSkill/getLanguageSkill";
import { iLanguageSkillGet } from "@/types";

export default async function Performance() {
  const performance: iLanguageSkillGet = await getLanguageSkill();

  return (
    <div className="performance-inner">
      <ul>
        {performance.languagesSkills.map((perform, key) => (
          <li key={key}>
            <Link href={`/performance/${perform.link}`}>
              {perform.skillName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
