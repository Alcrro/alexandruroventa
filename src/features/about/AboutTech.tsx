"use client";
import { motion } from "framer-motion";

const tech = [
  "React", "Next.js", "TypeScript", "Node.js",
  "MongoDB", "Tailwind CSS", "SCSS", "SQL",
  "Framer Motion", "Mongoose", "REST APIs", "Git",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export default function AboutTech() {
  return (
    <motion.section
      className="about-tech"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="about-section-title">Technologies</h2>
      <motion.ul
        className="tech-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {tech.map((name) => (
          <motion.li key={name} className="tech-tag" variants={itemVariants}>
            {name}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
