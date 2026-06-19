export const navLinks = [
  { name: "Home",         href: "/" },
  { name: "Projects",     href: "/projects" },
  { name: "Skills",       href: "/skills" },
  { name: "Experience",   href: "/experience" },
  { name: "Performance",  href: "/performance" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact",      href: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
