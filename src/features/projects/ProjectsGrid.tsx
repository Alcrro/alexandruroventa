"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IGithubProject } from "@/types";
import ProjectCard from "./ProjectCard";
import { techIconMap, techCategories } from "./techIcons";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ProjectsGrid({ projects }: { projects: IGithubProject[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const usedTechs = new Set(projects.flatMap((p) => p.languagesUsed));

  const visibleCategories = techCategories
    .map((cat) => ({ ...cat, techs: cat.techs.filter((t) => usedTechs.has(t)) }))
    .filter((cat) => cat.techs.length > 0);

  const filtered = activeFilter
    ? projects.filter((p) => p.languagesUsed.includes(activeFilter))
    : projects;

  const activeCategoryLabel = activeFilter
    ? visibleCategories.find((c) => c.techs.includes(activeFilter))?.label ?? null
    : null;

  const clearFilter = () => {
    setActiveFilter(null);
    setOpenCategory(null);
  };

  const selectTech = (tech: string) => {
    setActiveFilter((prev) => (prev === tech ? null : tech));
    setOpenCategory(null);
  };

  const toggleCategory = (label: string) =>
    setOpenCategory((prev) => (prev === label ? null : label));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
      {visibleCategories.length > 0 && (
        <div className="tech-filter" ref={filterRef}>
          <button
            className={`tech-filter-all${!activeFilter ? " active" : ""}`}
            onClick={clearFilter}
          >
            All
          </button>

          <div className="tech-filter-sep" />

          {visibleCategories.map((cat) => {
            const isOpen = openCategory === cat.label;
            const hasActive = activeCategoryLabel === cat.label;

            return (
              <div key={cat.label} className="tech-filter-cat">
                <button
                  className={`tech-filter-cat-btn${hasActive ? " active" : ""}${isOpen ? " open" : ""}`}
                  onClick={() => toggleCategory(cat.label)}
                >
                  <span>{hasActive ? activeFilter : cat.label}</span>
                  <i className={`bi bi-chevron-${isOpen ? "up" : "down"} tech-filter-chevron`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="tech-filter-dropdown"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                    >
                      {cat.techs.map((tech) => {
                        const def = techIconMap[tech];
                        const Icon = def?.icon;
                        const abbrev = def?.abbrev ?? tech.slice(0, 2).toUpperCase();
                        const isSelected = activeFilter === tech;

                        return (
                          <button
                            key={tech}
                            className={`tech-filter-option${isSelected ? " selected" : ""}`}
                            onClick={() => selectTech(tech)}
                            style={{ "--tech-color": def?.color } as React.CSSProperties}
                          >
                            <span className="tech-filter-option-icon">
                              {Icon ? (
                                <Icon size={13} />
                              ) : (
                                <span className="tech-filter-abbrev">{abbrev}</span>
                              )}
                            </span>
                            <span className="tech-filter-option-label">{tech}</span>
                            {isSelected && (
                              <i className="bi bi-check2 tech-filter-option-check" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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
            <motion.div key={project.id} variants={card}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
