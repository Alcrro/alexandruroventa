"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function CurrentOrder() {
  const pathname = usePathname();
  let check = pathname.split("/");
  let index;
  let checkIndex = (index =
    pathname.split("/").indexOf("asc") !== -1
      ? pathname.split("/").indexOf("asc")
      : pathname.split("/").indexOf("desc"));

  let currentOrder = check[checkIndex - 1];

  console.log(currentOrder);

  return (
    <span>{currentOrder === undefined ? "Organization" : currentOrder}</span>
  );
}
