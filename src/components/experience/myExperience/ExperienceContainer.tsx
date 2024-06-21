"use client";
import React, { useState } from "react";
import ExperienceMoreContent from "./ExperienceMoreContent";

export default function ExperienceContainer({
  children,
  company,
}: {
  children: React.ReactNode;
  company: any;
}) {
  const [compId, setCompId] = useState<number | undefined>();
  return (
    <div
      className={`text-box flex flex-col justify-start${
        compId === company.idIncNumber ? " collapse-in" : " collapse-out"
      }`}
    >
      {children}
      <ExperienceMoreContent
        company={company}
        compId={compId}
        addButtonHandler={() => setCompId(undefined)}
      />
    </div>
  );
}
