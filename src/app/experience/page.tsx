export const dynamic = "force-dynamic";
import React from "react";
import "./experience.scss";
import Experience from "@/components/experience/Experience";
import { Metadata } from "next/types";
import getExperience from "@/_lib/experience/getExperience";

export const metadata: Metadata = {
  title: "Alexandru Roventa - My experience",
  description: "Home",
};

export default async function page() {
  const experiences = await getExperience();
  return (
    <div className="experience-container">
      <Experience experiences={experiences} />
    </div>
  );
}
