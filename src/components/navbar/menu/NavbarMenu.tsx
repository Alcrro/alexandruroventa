import { INavbarMenuProps } from "@/_lib/navbar/menu";
import React from "react";
import "./navbarMenu.scss";
import ThemeSwitch from "../../../app/ThemeSwitch";
import ListItem from "./ListItem";

export default async function NavbarMenu({
  data,
}: {
  data: INavbarMenuProps[];
}) {
  return (
    <>
      <div className="navbar-menu">
        <ul className="">
          {data.map((item, key) => (
            <ListItem item={item} key={key} />
          ))}
          <li className="dark-theme-button">
            <label className="flex justify-center align-middle items-center cursor-pointer self-center">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-black rounded-full peer dark:bg-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white peer-checked:bg-black"></div>
            </label>
          </li>
        </ul>

        <ThemeSwitch />
      </div>
    </>
  );
}
