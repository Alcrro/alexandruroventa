"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function Title() {
  const pathname = usePathname();
  const title =
    pathname.split("/")[2].charAt(0).toLocaleUpperCase() +
    pathname.split("/")[2].slice(1).replace(/-/g, " ");

  return (
    <div className="text-center m-4 text-2xl">
      {title === "Library framework" ? "Library / Framework" : title}
    </div>
  );
}
