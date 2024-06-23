"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProfileDescription() {
  const pathname = usePathname();

  return (
    <div className="profile-description max-w-[56rem] mx-auto text-center my-4">
      <p
        className={`text-2xl ${
          pathname.endsWith("me") ? "second-layer opacity-30" : "main-layer"
        }`}
      >
        Hello, I'm Alex. I'm a full-stack developer
      </p>
    </div>
  );
}
