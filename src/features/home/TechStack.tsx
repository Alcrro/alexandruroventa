"use client";
import { motion } from "framer-motion";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Framer Motion",
  "Docker",
  "AWS",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function TechStack() {
  return (
    <motion.section
      className="tech-stack-section"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="home-section-title">Core Stack</h2>
      <motion.ul
        className="tech-stack-list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stack.map((tech) => (
          <motion.li key={tech} variants={tagVariants}>
            <motion.span
              className="tech-stack-tag"
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {tech}
            </motion.span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
