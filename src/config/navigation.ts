export const navLinks = [
  { name: "Home",       href: "/" },
  { name: "About",      href: "/about" },
  { name: "Projects",   href: "/projects" },
  { name: "Journey",    href: "/experience" },
  { name: "CV",         href: "/cv" },
  { name: "Contact",    href: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
