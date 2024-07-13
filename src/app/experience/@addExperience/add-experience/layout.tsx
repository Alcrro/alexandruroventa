import React from "react";
import "@/components/experience/addExperience/modal/addExperienceModal.scss";

export default function layout({
  activate,
  children,
}: {
  activate: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {activate}
    </>
  );
}
