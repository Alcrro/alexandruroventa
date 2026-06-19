"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./navbar.scss";
import ThemeSwitch from "../theme/ThemeSwitch";
import { navLinks } from "@/config/navigation";

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="navbar-menu">
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
      </button>

      <ul className={isOpen ? "open" : ""}>
        {navLinks.map((item) => (
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
    </div>
  );
}
