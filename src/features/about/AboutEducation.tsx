"use client";
import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const education = [
  {
    institution: "Full Stack Web Development Bootcamp",
    field: "React · Next.js · Node.js · MongoDB",
    period: "2022",
    summary:
      "Self-paced bootcamp covering the full web development stack — from HTML/CSS and JavaScript through React, Node.js, Express, and MongoDB. The foundation that transitioned me into professional development.",
  },
  {
    institution: "Faculty of Automation and Applied Informatics",
    field: "Automation and Applied Informatics",
    period: "2014 – 2018",
    note: "Studied C++ and Oracle; did not graduate",
  },
  {
    institution: "High School of Electrotechnics and Electronics",
    field: "Electronics and Electrotechnics",
    period: "2010 – 2014",
  },
];

const section = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heading = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.52, ease: EASE },
  },
};

export default function AboutEducation() {
  return (
    <motion.section
      className="about-education"
      variants={section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.h2 className="about-section-title" variants={heading}>
        Education
      </motion.h2>
      <div className="education-list">
        {education.map((item) => (
          <motion.div key={item.institution} className="education-card" variants={card}>
            <div className="education-header">
              <span className="education-institution">{item.institution}</span>
              <span className="education-period">{item.period}</span>
            </div>
            <span className="education-field">{item.field}</span>
            {"summary" in item && item.summary && (
              <p className="education-summary">{item.summary}</p>
            )}
            {item.note && <span className="education-note">{item.note}</span>}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
