"use client";
import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const stats = [
  { value: "3+", label: "years building" },
  { value: "12+", label: "projects shipped" },
  { value: "3", label: "SaaS products" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const word = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const statContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const statItem = {
  hidden: { opacity: 0, scale: 0.82, filter: "blur(5px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.42, ease: EASE },
  },
};

export default function AboutIntro() {
  return (
    <section className="about-intro">
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.div className="about-eyebrow" variants={fadeUp}>
          <span className="about-eyebrow-dot" />
          Full-Stack Developer · SaaS Products · AI Integration
        </motion.div>

        <h1 className="about-page-title">
          {["About", "Me"].map((w) => (
            <motion.span
              key={w}
              variants={word}
              style={{ display: "inline-block", marginRight: "0.22em" }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div className="about-stats" variants={statContainer}>
          {stats.map((s) => (
            <motion.div key={s.label} className="about-stat" variants={statItem}>
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="about-intro-content">
          <motion.p className="about-lead" variants={fadeUp}>
            My passion for technology began at the age of 12. By 14, I was
            already modifying HTML and CSS — experimenting with scripts and
            templates, learning how to combine creativity with logic.
          </motion.p>

          <motion.p variants={fadeUp}>
            I studied at the{" "}
            <span className="about-kw">High School of Electrotechnics and Electronics</span>{" "}
            and later the{" "}
            <span className="about-kw">Faculty of Automation and Applied Informatics</span>{" "}
            where I worked with C++ and Oracle, building a solid foundation
            in systems thinking and computational logic.
          </motion.p>

          <motion.p variants={fadeUp}>
            After pivoting fully into programming, I completed a{" "}
            <span className="about-kw">Full-Stack bootcamp</span> and have been
            building ever since. My core stack is{" "}
            <span className="about-kw">React, Next.js, Node.js and MongoDB</span>.
            I&apos;m comfortable with TypeScript, SQL and Tailwind — and I
            enjoy the satisfaction of watching a tough problem finally crack.
          </motion.p>

          <motion.p variants={fadeUp}>
            Outside of code, I stay active at the gym and spend time with my
            dog and cat. Currently deep in{" "}
            <span className="about-kw">System Design</span> and{" "}
            <span className="about-kw">AI integration</span> — applying both
            directly to the SaaS products I build and run independently.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
