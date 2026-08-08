"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.11, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function ProjectsHero({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(rawY, [0, 1], [5, -5]), { stiffness: 100, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [0, 1], [-5, 5]), { stiffness: 100, damping: 28 });

  const orbX1 = useSpring(useTransform(rawX, [0, 1], [-50, 50]), { stiffness: 25, damping: 18 });
  const orbY1 = useSpring(useTransform(rawY, [0, 1], [-30, 30]), { stiffness: 25, damping: 18 });
  const orbX2 = useSpring(useTransform(rawX, [0, 1], [50, -50]), { stiffness: 20, damping: 22 });
  const orbY2 = useSpring(useTransform(rawY, [0, 1], [30, -30]), { stiffness: 20, damping: 22 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    rawX.set(0.5);
    rawY.set(0.5);
  }

  return (
    <div
      ref={ref}
      className="ph"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Orbs */}
      <div className="ph-bg" aria-hidden>
        <motion.div
          className="ph-orb ph-orb--1"
          style={{ x: orbX1, y: orbY1 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="ph-orb ph-orb--2"
          style={{ x: orbX2, y: orbY2 }}
          animate={{ scale: [1.06, 1, 1.06], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="ph-orb ph-orb--3"
          style={{ x: orbX2, y: orbY1 }}
          animate={{ scale: [1, 1.09, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Dot grid */}
      <div className="ph-grid" aria-hidden />

      {/* 3D content */}
      <motion.div
        className="ph-inner"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
      >
        <motion.span
          className="ph-eyebrow"
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
        >
          <span className="ph-dot" />
          Portfolio
        </motion.span>

        <motion.h1
          className="ph-title"
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
        >
          Things I&apos;ve{" "}
          <span className="ph-title-accent">built</span>
        </motion.h1>

        <motion.p
          className="ph-subtitle"
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
        >
          SaaS products, automation tools and experiments — crafted with
          React, Node.js and TypeScript.
        </motion.p>

        <motion.div
          className="ph-stats"
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
        >
          <div className="ph-stat">
            <span className="ph-stat-value">{count}+</span>
            <span className="ph-stat-label">projects</span>
          </div>
          <div className="ph-stat-sep" />
          <div className="ph-stat">
            <span className="ph-stat-value">3+</span>
            <span className="ph-stat-label">years</span>
          </div>
          <div className="ph-stat-sep" />
          <div className="ph-stat">
            <span className="ph-stat-value">15+</span>
            <span className="ph-stat-label">technologies</span>
          </div>
        </motion.div>

        <motion.div
          className="ph-cta"
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
        >
          <Link href="/contact" className="ph-btn-primary">
            Let&apos;s work together
          </Link>
          <a
            href="https://github.com/Alcrro"
            target="_blank"
            rel="noopener noreferrer"
            className="ph-btn-secondary"
          >
            <i className="bi bi-github" />
            GitHub
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
