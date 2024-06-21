import React from "react";

export default function ExperienceContent({ company }: { company: any }) {
  return (
    <div
      className="text h-[100%]"
      dangerouslySetInnerHTML={{
        __html: `${company.descriptionMore}`,
      }}
    ></div>
  );
}
