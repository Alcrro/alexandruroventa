"use client";
import React from "react";
import "./experienceContent.scss";
import { useExperienceContext } from "@/context/experienceContext/ExperienceContext";
export default function ExperienceContent({ company }: { company: any }) {
  const { compId } = useExperienceContext();
  return (
    <div
      className={`text-content ${
        compId === company.idIncNumber ? " show-more" : ""
      } text`}
    >
      {company.descriptionMore}
    </div>
  );
}
