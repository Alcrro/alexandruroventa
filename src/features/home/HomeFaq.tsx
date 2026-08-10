"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { faqs } from "./faqData";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faq-section">
      {/* Orbs — plain divs, CSS keyframes (avoids Framer Motion + blur issue) */}
      <div className="faq-orb faq-orb--1" aria-hidden />
      <div className="faq-orb faq-orb--2" aria-hidden />
      <div className="faq-orb faq-orb--3" aria-hidden />

      <div className="faq-inner">
        {/* Left — sticky, auto 3D tilt */}
        <motion.div
          className="faq-left"
          animate={{ rotateX: [1.5, -1.5, 1.5], rotateY: [-2, 2, -2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformPerspective: 900 }}
        >
          <motion.span
            className="faq-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            FAQ
          </motion.span>

          <motion.h2
            className="faq-lead-title"
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            Got<br />questions?
          </motion.h2>

          <motion.p
            className="faq-lead-desc"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
          >
            Everything you need to know about working with me — stack,
            availability, timelines, and process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.34, ease: EASE }}
          >
            <Link href="/contact/me" className="faq-cta">
              Start a project <BsArrowRight />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — accordion */}
        <motion.div
          className="faq-right"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              className={`faq-item${open === i ? " is-open" : ""}`}
              variants={itemVariants}
            >
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="faq-q-text">{faq.q}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  aria-hidden
                >
                  <BsPlusLg />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    <p className="faq-answer-inner">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
