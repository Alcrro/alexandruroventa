"use client";
import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const tech = [
  "React", "Next.js", "TypeScript", "Node.js",
  "MongoDB", "Tailwind CSS", "SCSS", "SQL",
  "Framer Motion", "Mongoose", "REST APIs", "Git",
];

const section = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const heading = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

const tag = {
  hidden: { opacity: 0, scale: 0.75, filter: "blur(6px)", y: 10 },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
    transition: { duration: 0.38, ease: EASE },
  },
};

export default function AboutTech() {
  return (
    <motion.section
      className="about-tech"
      variants={section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.h2 className="about-section-title" variants={heading}>
        Technologies
      </motion.h2>
      <motion.ul
        className="tech-grid"
        variants={tagContainer}
      >
        {tech.map((name) => (
          <motion.li key={name} className="tech-tag" variants={tag}>
            {name}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
