"use client";
import React, { useState } from "react";
import ExperienceMoreContent from "./ExperienceMoreContent";
import "./myExperienceContainer.scss";
import { useExperienceContext } from "@/context/experienceContext/ExperienceContext";
export default function ExperienceContainer({
  company,
  children,
}: {
  company: any;
  children: React.ReactNode;
}) {
  const { compId, setCompId } = useExperienceContext();

  const handlerMore = (id: number | null) => {
    if (compId === null) {
      setCompId(id);
    } else {
      setCompId(null);
    }
  };

  return (
    <div
      className={`experience-container 1  text-box${
        compId === company.idIncNumber ? " collapse-in" : " collapse-out"
      }`}
    >
      {children}
      <ExperienceMoreContent
        company={company}
        setCompId={() => handlerMore(company.idIncNumber)}
      />
    </div>
  );
}
