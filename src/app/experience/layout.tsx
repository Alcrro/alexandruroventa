import React from "react";

export default function layout({
  addExperience,
  mainExperience,
}: {
  addExperience: React.ReactNode;
  mainExperience: React.ReactNode;
}) {
  return (
    <div className="experience-container relative">
      {addExperience}
      {mainExperience}
    </div>
  );
}
