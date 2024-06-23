"use client";
import React, { SetStateAction } from "react";

export default function ExperienceMoreContent({
  company,
  compId,
  setCompId,
}: {
  company: any;
  compId: number | null;
  setCompId: React.MouseEventHandler<any>;
}) {
  return (
    <div className="more block text-right" onClick={setCompId}>
      {compId !== company.idIncNumber ? (
        <span className="">more</span>
      ) : (
        <span className="">less</span>
      )}
    </div>
  );
}
