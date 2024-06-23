"use client";
import React, { useState } from "react";

export default function TypeOfExperienceModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentValue, setCurrentValue] = useState("noValue");
  const [dropdownActive, setDropdownActive] = useState(false);
  return (
    <>
      <div
        className="dropdown-current-value flex gap-2 items-center justify-center border border-gray-400 w-[120px] text-center p-2 rounded-lg"
        onClick={() => setDropdownActive((prev) => !prev)}
      >
        <span>{currentValue}</span>
        {dropdownActive ? (
          <span className="h-5 text-xl">^</span>
        ) : (
          <span className="h-5 text-xl rotate-180">^</span>
        )}
      </div>

      <div
        className={`dropdown-list${
          dropdownActive ? " active " : " inActive "
        } w-[120px]`}
      ></div>
    </>
  );
}
