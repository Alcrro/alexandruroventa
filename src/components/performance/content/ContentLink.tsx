"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ContentLink({
  document,
}: {
  document: { name: string; link: string };
}) {
  const pathname = usePathname();

  return <Link href={`${pathname}/${document.link}`}>{document.name}</Link>;
}
