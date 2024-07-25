"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LinkTableContent({
  children,
  item,
}: {
  children: React.ReactNode;
  item: any;
}) {
  const pathname = usePathname();

  return (
    <Link href={`/${pathname}/${item.slug}`} className="a-body-content">
      {children}
    </Link>
  );
}
