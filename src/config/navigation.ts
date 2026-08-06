export const navLinks = [
  { name: "Home",       href: "/" },
  { name: "About",      href: "/about" },
  { name: "Projects",   href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact",    href: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
