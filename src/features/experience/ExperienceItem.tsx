"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { iExperience } from "@/types";
import {
  BsMortarboardFill, BsBriefcaseFill, BsGoogle, BsAmazon,
  BsFacebook, BsBuilding, BsChevronUp, BsChevronDown,
} from "react-icons/bs";

const iconMap: Record<string, React.ReactNode> = {
  school: <BsMortarboardFill />,
  job: <BsBriefcaseFill />,
  google: <BsGoogle />,
  amazon: <BsAmazon />,
  facebook: <BsFacebook />,
};

function formatDuration(item: iExperience): string {
  const start = new Date(item.startYear);
  const end = item.endYear ? new Date(item.endYear) : new Date(item.currentYear!);

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);

  return parts.length ? `${parts.join(", ")}` : "";
}

export default function ExperienceItem({
  item,
  index,
}: {
  item: iExperience;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const icon = iconMap[item.className] ?? <BsBuilding />;
  const startYear = new Date(item.startYear).getFullYear();
  const endLabel =
    item.currentYear !== null ? "Present" : new Date(item.endYear!).getFullYear().toString();
  const duration = formatDuration(item);

  const chips = item.descriptionMore
    ? item.descriptionMore.split("\n").map((l) => l.trim()).filter(Boolean)
    : [];

  return (
    <motion.div
      className="exp-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
    >
      <div className="exp-dot">
        {item.companyLogo ? (
          <Image src={item.companyLogo} alt={item.titleDescription} className="exp-logo-img" width={22} height={22} unoptimized />
        ) : (
          icon
        )}
      </div>

      <motion.div
        className="exp-card"
        whileHover={{ y: -3, rotateX: 1 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="exp-card-top">
          <div className="exp-card-left">
            <h2 className="exp-title">{item.titleDescription}</h2>
            {duration && <span className="exp-duration-badge">{duration}</span>}
          </div>
          <span className="exp-years">
            {startYear} — {endLabel}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {expanded && chips.length > 0 && (
            <motion.div
              className="exp-chips-wrap"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
            >
              <div className="exp-chips">
                {chips.map((chip, i) => (
                  <motion.span
                    key={i}
                    className="exp-chip"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {chips.length > 0 && (
          <button
            className={`exp-toggle${expanded ? " exp-toggle--open" : ""}`}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Collapse" : "Show details"}</span>
            {expanded ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
