"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./navbar.scss";
import ThemeSwitch from "../theme/ThemeSwitch";
import { navLinks } from "@/config/navigation";

const homeLink = navLinks.find((l) => l.href === "/")!;
const restLinks = navLinks.filter((l) => l.href !== "/");

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className={`navbar-menu${scrolled ? " scrolled" : ""}`}>
      {/* Home — stânga */}
      <Link
        href={homeLink.href}
        className={`navbar-home${isActive(homeLink.href) ? " active" : ""}`}
      >
        <span className="navbar-text">{homeLink.name}</span>
      </Link>

      <button
        className="hamburger"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <motion.span
          className="hamburger-line"
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="hamburger-line"
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="hamburger-line"
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </button>

      {/* Desktop — restul linkurilor, dreapta */}
      <ul className="nav-desktop">
        {restLinks.map((item) => (
          <li key={item.href} className={isActive(item.href) ? "active" : ""}>
            <Link href={item.href}>
              <span className="navbar-text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-theme">
        <ThemeSwitch />
      </div>

      {/* Mobile — toate linkurile în dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="nav-mobile"
            initial={{ opacity: 0, y: -10, scaleY: 0.88, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, scaleY: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.88, rotateX: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top", transformPerspective: 800 }}
          >
            {restLinks.map((item, i) => (
              <motion.li
                key={item.href}
                className={isActive(item.href) ? "active" : ""}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.035, duration: 0.2, ease: "easeOut" }}
              >
                <Link href={item.href}>
                  <span className="navbar-text">{item.name}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
