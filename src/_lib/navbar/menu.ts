export interface INavbarMenuProps {
  name: string;
  link: string;
}
export const navbarMenu: INavbarMenuProps[] = [
  { name: "home", link: "/" },
  { name: "about", link: "about" },
  { name: "projects", link: "projects" },
  { name: "skills", link: "skills" },
  { name: "experience", link: "experience" },
  { name: "performance", link: "performance" },
  { name: "contact", link: "contact" },
];
