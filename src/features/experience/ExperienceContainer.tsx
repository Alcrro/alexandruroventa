"use client";
import { motion } from "framer-motion";
import ExperienceItem from "./ExperienceItem";
import { iExperience } from "@/types";

export default function ExperienceContainer({ items }: { items: iExperience[] }) {
  return (
    <div className="experience-timeline">
      <motion.div
        className="exp-line"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      {items.map((item, index) => (
        <ExperienceItem key={item.idIncNumber} item={item} index={index} />
      ))}
    </div>
  );
}
