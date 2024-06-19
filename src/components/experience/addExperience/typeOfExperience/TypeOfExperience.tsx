"use client";
import React, { useState } from "react";
import "./whatStarted.scss";
export default function TypeOfExperience() {
  const [currentValue, setCurrentValue] = useState("noValue");
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownValues = ["School", "Job", "Internship"];
  console.log(dropdownActive);

  return (
    <div className="what-started-container flex gap-2">
      <div className="what-started pt-2">What did you start?</div>
      <div className="dropdown-container">
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
        >
          <ul className="text-center border border-gray-400 rounded-lg">
            {dropdownValues.map((values, key) => (
              <li className="py-1" key={key}>
                <span
                  onClick={() => {
                    setCurrentValue(values), setDropdownActive((prev) => !prev);
                  }}
                >
                  <span>{values} </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
