"use client";
import React from "react";
import "./addButtons.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AddButtons({ description }: { description: string }) {
  const pathname = usePathname();

  return (
    <div className="add-experience-button">
      <Link
        href={`${pathname}/${description}`}
        className="btn-add-experience-button"
      ></Link>
    </div>
  );
}
