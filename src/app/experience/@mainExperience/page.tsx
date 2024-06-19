import getExperience from "@/_lib/experience/getExperience";
import Experience from "@/components/experience/Experience";
import React from "react";

export default async function page() {
    const experiences = await getExperience();
  return <Experience experiences={experiences.experiences} />;
}
