"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ListItem({ item }: { item: any }) {
  const pathname = usePathname();

  let isActive;
  if (item.name === "home" && pathname.split("/")[1] === "") {
    isActive = pathname.startsWith(`/`);
  } else {
    isActive = pathname.startsWith(`/${item.name}`);
  }
  return (
    <li key={item.id} className={`${isActive ? "active" : ""}`}>
      <Link href={`/${item.link}`}>
        <span className="navbar-text">{item.name}</span>
      </Link>
    </li>
  );
}
