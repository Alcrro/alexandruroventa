"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "./home.scss";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexandru-roventa/",
    icon: "bi-linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/Alcrro",
    icon: "bi-github",
  },
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-inner"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-image" variants={item}>
          <Image
            src="https://alexandru-roventa.s3.eu-central-1.amazonaws.com/alexandru-roventa-image.png"
            alt="Alexandru Roventa"
            width={200}
            height={200}
            priority
            className="profile-image"
          />
        </motion.div>

        <div className="hero-content">
          <motion.h1 className="hero-name" variants={item}>
            Alexandru Roventa
          </motion.h1>

          <motion.p className="hero-role" variants={item}>
            Full Stack Developer
          </motion.p>

          <motion.div className="hero-cta" variants={item}>
            <Link href="/contact" className="btn-primary">
              Contact me
            </Link>
            <Link href="/projects" className="btn-secondary">
              See projects
            </Link>
            <Link
              href="https://alexandru-roventa.s3.eu-central-1.amazonaws.com/CV-Alexandru-Roventa-web-developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="bi bi-file-earmark-person" />
              Open CV
            </Link>
          </motion.div>

          <motion.div className="hero-social" variants={item}>
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="social-link"
              >
                <i className={`bi ${link.icon}`} />
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
