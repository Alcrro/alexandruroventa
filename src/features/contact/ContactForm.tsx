"use client";
import { useRef, useState, useTransition } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import sendEmail from "@/_lib/send";
import "./contact.scss";
import { BsLinkedin, BsGithub, BsCheck2, BsClipboard, BsArrowRepeat, BsSend } from "react-icons/bs";

const BUSINESS_EMAIL = "alex.roventa94@gmail.com";

const socialLinks: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexandru-roventa/",
    icon: <BsLinkedin />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Alcrro",
    icon: <BsGithub />,
  },
];

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "Within 24 hours on business days. Urgent? Mention it in your message.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "Web apps, SaaS platforms, dashboards and APIs — primarily React, Next.js and Node.js.",
  },
  {
    q: "Are you open to freelance?",
    a: "Yes, currently open to new projects — short contracts and long-term engagements.",
  },
  {
    q: "What timezone are you in?",
    a: "EET (UTC+2), Romania. Good overlap with Western Europe and US East Coast mornings.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30,
  });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(BUSINESS_EMAIL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (formData.get("website")) return;

    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    startTransition(async () => {
      const result = await sendEmail({ email, message });

      if (result?.error) {
        toast.error("Failed to send. Please try again.");
      } else {
        toast.success("Message sent successfully!");
        formRef.current?.reset();
      }
    });
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="contact-hero">
        <div className="contact-hero-bg" aria-hidden>
          <div className="contact-hero-orb contact-hero-orb--1" />
          <div className="contact-hero-orb contact-hero-orb--2" />
          <div className="contact-hero-orb contact-hero-orb--3" />
        </div>
        <div className="contact-hero-grid" aria-hidden />
        <motion.div
          className="contact-hero-content"
          animate={{ rotateX: [2, -1.5, 2], rotateY: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformPerspective: 900 }}
        >
          <motion.span
            className="contact-hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="contact-hero-eyebrow-dot" />
            Available for projects
          </motion.span>

          <h1 className="contact-hero-title">
            {(["Let’s", "work", "together"] as const).map((word, i) => (
              <motion.span
                key={word}
                className={`contact-hero-word${i === 2 ? " contact-hero-accent" : ""}`}
                initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.11,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="contact-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Have a project in mind or just want to say hello? Drop me a line —
            I respond within 24h.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="contact-inner"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Left — info */}
        <div className="contact-info">
          <motion.div className="contact-availability" variants={fadeUp}>
            <span className="availability-dot" />
            Available for projects
          </motion.div>

          <motion.h1 className="contact-title" variants={fadeUp}>
            Get in touch
          </motion.h1>

          <motion.p className="contact-subtitle" variants={fadeUp}>
            Have a project in mind or just want to say hello? Feel free to
            reach out — I&apos;ll get back to you as soon as possible.
          </motion.p>

          <motion.div variants={fadeUp}>
            <div className="contact-email-label">Email</div>
            <motion.button
              type="button"
              className={`contact-email-btn${isCopied ? " is-copied" : ""}`}
              onClick={copyEmail}
              aria-label="Copy email address"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span>{BUSINESS_EMAIL}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isCopied ? "check" : "clipboard"}
                  style={{ display: "inline-flex", alignItems: "center" }}
                  initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.4, rotate: 15 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {isCopied ? <BsCheck2 /> : <BsClipboard />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>

          <motion.div className="contact-social" variants={fadeUp}>
            {socialLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -4, scale: 1.12 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="contact-social-link"
                >
                  {link.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — form card with 3D tilt */}
        <motion.div
          ref={cardRef}
          className="contact-form-card"
          variants={fadeUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
            noValidate
          >
            {/* honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              aria-hidden="true"
              className="contact-honeypot"
            />

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                required
                rows={7}
                className="form-textarea"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isPending}
              className="contact-submit"
              whileHover={!isPending ? { scale: 1.03 } : {}}
              whileTap={!isPending ? { scale: 0.97 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {isPending ? (
                <>
                  <BsArrowRepeat className="contact-spinner" />
                  Sending…
                </>
              ) : (
                <>
                  <BsSend />
                  Send message
                  <span className="submit-shimmer" aria-hidden="true" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* FAQ */}
      <div className="contact-faq">
        <motion.h2
          className="contact-faq-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Common questions
        </motion.h2>
        <div className="contact-faq-grid">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              className="contact-faq-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
