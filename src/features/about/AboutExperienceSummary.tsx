"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const domains = [
  "Full Stack Web Development",
  "Next.js / React",
  "Node.js / MongoDB",
  "TypeScript",
];

const section = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const heading = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const text = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const tag = {
  hidden: { opacity: 0, scale: 0.82, filter: "blur(4px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.35, ease: EASE },
  },
};

const cta = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function AboutExperienceSummary() {
  return (
    <motion.section
      className="about-experience-summary"
      variants={section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.h2 className="about-section-title" variants={heading}>
        Experience
      </motion.h2>
      <div className="experience-summary-body">
        <motion.p className="experience-summary-text" variants={text}>
          3+ years building full-stack applications, with a background in
          operations and technical support that sharpened my eye for detail and
          problem-solving under pressure.
        </motion.p>
        <motion.ul
          className="experience-domains"
          variants={tagContainer}
        >
          {domains.map((d) => (
            <motion.li key={d} className="experience-domain-tag" variants={tag}>
              {d}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div variants={cta}>
          <Link href="/experience" className="about-cta-link">
            View full experience →
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
