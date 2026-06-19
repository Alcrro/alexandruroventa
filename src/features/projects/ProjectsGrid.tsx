"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IProjectsSchema } from "@/types";
import ProjectCard from "./ProjectCard";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ProjectsGrid({ projects }: { projects: IProjectsSchema[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allTechs = Array.from(new Set(projects.flatMap((p) => p.languagesUsed))).sort();
  const filtered = activeFilter
    ? projects.filter((p) => p.languagesUsed.includes(activeFilter))
    : projects;

  const toggleFilter = (tech: string) =>
    setActiveFilter((prev) => (prev === tech ? null : tech));

  return (
    <div>
      {allTechs.length > 0 && (
        <div className="projects-filter">
          <button
            className={`filter-btn${activeFilter === null ? " active" : ""}`}
            onClick={() => setActiveFilter(null)}
          >
            All
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              className={`filter-btn${activeFilter === tech ? " active" : ""}`}
              onClick={() => toggleFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter ?? "all"}
          variants={container}
          initial="hidden"
          animate="visible"
          className="projects-grid"
        >
          {filtered.map((project) => (
            <motion.div key={project._id} variants={card}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
