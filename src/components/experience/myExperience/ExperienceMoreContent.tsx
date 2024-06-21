import React from "react";

export default function ExperienceMoreContent({
  company,
  compId,
  addButtonHandler,
}: {
  company: any;
  compId: number | undefined;
  addButtonHandler: (param: number | undefined) => void;
}) {
  return (
    <div
      className="more block text-right"
      onClick={() => addButtonHandler(company.idIncNumber)}
    >
      {compId !== company.idIncNumber ? (
        <span className="">more</span>
      ) : (
        <span className="">less</span>
      )}
    </div>
  );
}
