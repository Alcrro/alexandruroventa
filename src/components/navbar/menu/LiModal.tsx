"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LiModal({
  children,
  item,
}: {
  children: React.ReactNode;
  item: any;
}) {
  const pathname = usePathname();

  return (
    <>
      {
        <li
          key={item.id}
          className={`${
            pathname.split("/")[1] === item.name ? "active" : ""
          }     
              ${
                pathname.split("/")[1] === "" && "home" === item.name
                  ? "active"
                  : ""
              }`}
        >
          {children}
        </li>
      }
    </>
  );
}
