"use client";
import React, { useState } from "react";
import "./filter.scss";
export default function Filters() {
const [active, setActive] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("filter");
  return (
    <div className="filter-container">
      <div className="filters">
        <div
          className={`currentFilter currentValue ${
            active ? " isActive" : " isNotActive"
          }`}
          onClick={() => setActive((prev) => !prev)}
        >
          <span>{currentFilter}</span>
        </div>

        <ul className={`${active ? "isActive" : "isNotActive"}`}>
          <li>Filter 1</li>
        </ul>
      </div>
    </div>
  );
}
