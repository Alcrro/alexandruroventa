import React from "react";
import "./experienceContent.scss";
export default function ExperienceContent({ company }: { company: any }) {
  return <div className="text-content text">{company.descriptionMore}</div>;
}
