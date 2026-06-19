"use client";
import { motion } from "framer-motion";
import SkillCard, { Skill } from "./SkillCard";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SkillCategory({
  category,
  skills,
}: {
  category: string;
  skills: Skill[];
}) {
  return (
    <div className="skill-category">
      <h2 className="skill-category-title">{category}</h2>
      <motion.div
        className="skill-cards-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {skills.map((skill) => (
          <motion.div key={skill._id} variants={card}>
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
