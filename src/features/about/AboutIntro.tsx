"use client";
import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <motion.section
      className="about-intro"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="about-page-title">About Me</h1>
      <div className="about-intro-content">
        <p>
          I&apos;m Alexandru Roventa, a Full Stack Developer based in Romania.
          My passion for technology started at 12, and I&apos;ve been building
          for the web ever since — from early HTML experiments to production
          Next.js applications.
        </p>
        <p>
          My core stack is React, Next.js, Node.js and MongoDB, with TypeScript
          and Tailwind as everyday companions. I care about clean architecture,
          performance, and shipping things that actually work.
        </p>
      </div>
    </motion.section>
  );
}
