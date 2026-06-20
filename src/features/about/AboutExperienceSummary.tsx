"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const domains = ["Full Stack Web Development", "Next.js / React", "Node.js / MongoDB", "TypeScript"];

export default function AboutExperienceSummary() {
  return (
    <motion.section
      className="about-experience-summary"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="about-section-title">Experience</h2>
      <div className="experience-summary-body">
        <p className="experience-summary-text">
          3+ years building full-stack applications, with a background in
          operations and technical support that sharpened my eye for detail and
          problem-solving under pressure.
        </p>
        <ul className="experience-domains">
          {domains.map((d) => (
            <li key={d} className="experience-domain-tag">
              {d}
            </li>
          ))}
        </ul>
        <Link href="/experience" className="about-cta-link">
          View full experience →
        </Link>
      </div>
    </motion.section>
  );
}
