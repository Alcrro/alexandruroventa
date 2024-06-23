"use client";
import React, { useState } from "react";
import ExperienceMoreContent from "./ExperienceMoreContent";
import "./myExperienceContainer.scss";
export default function ExperienceContainer({
  company,
  children,
}: {
  company: any;
  children: React.ReactNode;
}) {
  const [compId, setCompId] = useState<number | null>(null);

  const handlerMore = (id: number | null) => {
    if (compId === null) {
      setCompId(id);
    } else {
      setCompId(null);
    }
  };

  return (
    <div
      className={`experience-container text-box${
        compId === company.idIncNumber ? " collapse-in" : " collapse-out"
      }`}
    >
      {children}
      <ExperienceMoreContent
        company={company}
        compId={compId}
        setCompId={() => handlerMore(company.idIncNumber)}
      />
    </div>
  );
}
