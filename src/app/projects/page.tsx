import { Metadata } from "next/types";
import Projects from "../../components/projects/Projects";
import React from "react";

export const metadata: Metadata = {
  title: "Alexandru Roventa - My Projects",
  description: "Home",
};

export default function page() {
  return (
    <div className="projects-container">
      <div className="projects-inner">
        <Projects />
      </div>
    </div>
  );
}
