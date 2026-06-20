"use client";
import { motion } from "framer-motion";

const education = [
  {
    institution: "Faculty of Automation and Applied Informatics",
    field: "Automation and Applied Informatics",
    period: "2013 – 2017",
    note: "Studied C++ and Oracle; did not graduate",
  },
  {
    institution: "High School of Electrotechnics and Electronics",
    field: "Electronics and Electrotechnics",
    period: "2009 – 2013",
  },
  {
    institution: "Full Stack Web Development Bootcamp",
    field: "React · Next.js · Node.js · MongoDB",
    period: "2022",
  },
];

export default function AboutEducation() {
  return (
    <motion.section
      className="about-education"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="about-section-title">Education</h2>
      <div className="education-list">
        {education.map((item) => (
          <div key={item.institution} className="education-card">
            <div className="education-header">
              <span className="education-institution">{item.institution}</span>
              <span className="education-period">{item.period}</span>
            </div>
            <span className="education-field">{item.field}</span>
            {item.note && <span className="education-note">{item.note}</span>}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
