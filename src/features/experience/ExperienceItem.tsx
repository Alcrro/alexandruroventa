"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { iExperience } from "@/types";

const iconMap: Record<string, string> = {
  school: "bi-mortarboard-fill",
  job: "bi-briefcase-fill",
  google: "bi-google",
  amazon: "bi-amazon",
  facebook: "bi-facebook",
};

function formatDuration(item: iExperience): string {
  const start = new Date(item.startYear);
  const end = item.endYear ? new Date(item.endYear) : new Date(item.currentYear!);

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);

  return parts.length ? `(${parts.join(", ")})` : "";
}

export default function ExperienceItem({
  item,
  index,
}: {
  item: iExperience;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const icon = iconMap[item.className] ?? "bi-building";
  const startYear = new Date(item.startYear).getFullYear();
  const endLabel =
    item.currentYear !== null ? "present" : new Date(item.endYear!).getFullYear().toString();
  const duration = formatDuration(item);

  return (
    <motion.div
      className="exp-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.18, ease: "easeOut" }}
    >
      <div className="exp-dot">
        {item.companyLogo ? (
          <img src={item.companyLogo} alt={item.titleDescription} className="exp-logo-img" />
        ) : (
          <i className={`bi ${icon}`} />
        )}
      </div>

      <div className="exp-body">
        <div className="exp-header">
          <h2 className="exp-title">{item.titleDescription}</h2>
          <span className="exp-years">
            {startYear} – {endLabel}
            {duration && <span className="exp-duration">{duration}</span>}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="exp-description"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ul>
                {item.descriptionMore
                  .split("\n")
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <li key={i}>{line.trim()}</li>
                  ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {item.descriptionMore && (
          <button
            className="exp-toggle"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? (
              <>Less <i className="bi bi-chevron-up" /></>
            ) : (
              <>More <i className="bi bi-chevron-down" /></>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
