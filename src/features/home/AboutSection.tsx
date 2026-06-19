"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="about-title">About Me</h2>
      <div className="about-content">
        <p>
          My passion for technology began at the age of 12, when I had my
          first interactions with a computer. By 14, I took my first steps
          into web development, modifying HTML and CSS in Adobe Dreamweaver,
          experimenting with scripts and templates for Counter-Strike 1.6
          servers. This early curiosity taught me how to combine creativity
          with logic and the importance of attention to detail in every
          project.
        </p>
        <p>
          I attended the High School of Electrotechnics and Electronics,
          where I deepened my technical foundations, and later the Faculty
          of Automation and Applied Informatics, where I studied C++ and
          Oracle, developing my programming skills and understanding of
          complex systems.
        </p>
        <p>
          After a few years working in a different field, I decided to fully
          commit to programming and enrolled in a coding bootcamp where I
          learned full-stack web development. My core stack is React,
          Next.js, Node.js and MongoDB, and I&apos;m also comfortable with
          TypeScript, SQL and Tailwind. What I enjoy most is watching each
          component of a project take shape and become something genuinely
          useful — and the satisfaction of finally cracking a tough problem.
        </p>
        <p>
          Outside of coding, I stay active at the gym and spend time with
          my dog and cat. I&apos;m always looking to grow — currently
          exploring System Design concepts — and I&apos;m open to new
          opportunities as a software developer.
        </p>
      </div>
    </motion.section>
  );
}
