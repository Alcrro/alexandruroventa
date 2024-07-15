"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LinkPagination({
  item,
  currentPage,
}: {
  item: any;
  currentPage: number;
}) {
  const pathname = usePathname();

  return (
    <li className={`${item === Number(currentPage) ? "active" : ""}`}>
      <Link href={`${pathname}?page=${item}`}>{item}</Link>
    </li>
  );
}
