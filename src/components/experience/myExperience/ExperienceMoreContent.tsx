"use client";
import { useExperienceContext } from "@/context/experienceContext/ExperienceContext";
import React, { Dispatch, SetStateAction } from "react";

export default function ExperienceMoreContent({
  company,
  setCompId,
}: {
  company: any;
  setCompId: (number: number) => void;
}) {
  const { compId } = useExperienceContext();

  return (
    <div
      className="more block text-right"
      onClick={() => setCompId(company.idIncNumber)}
    >
      {compId !== company.idIncNumber ? (
        <span className="">more</span>
      ) : (
        <span className="">less</span>
      )}
    </div>
  );
}
