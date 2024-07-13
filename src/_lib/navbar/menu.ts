export interface INavbarMenuProps {
  name: string;
  link: string;
}
export const navbarMenu: INavbarMenuProps[] = [
  { name: "home", link: "/" },

  { name: "projects", link: "projects" },
  { name: "skills", link: "skills" },
  { name: "experience", link: "experience" },
  { name: "performance", link: "performance" },
  { name: "certificates", link: "certificates" },
  { name: "contact", link: "contact" },
];
