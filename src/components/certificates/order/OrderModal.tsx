"use client";
import React, { useState } from "react";

export default function OrderModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`currentOrder currentValue ${
        active ? "isActive" : "isNotActive"
      }`}
      onClick={() => setActive((prev) => !prev)}
    >
      {children}
    </div>
  );
}
