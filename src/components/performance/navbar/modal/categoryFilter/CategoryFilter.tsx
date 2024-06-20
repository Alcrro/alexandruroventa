"use client";
import React, { useState } from "react";
import CurrentFilter from "../currentFIlter/CurrentFilter";
import { useNavbarFilterContext } from "@/context/navbarFilterContext/NavbarFilterContext";

export default function CategoryFilter({params}:{params:any}) {
  const [activeCategoryFilter, setCategoryFilter] = useState(false);
  const categoryData = [
    { name: "All", link: "all" },
    { name: "Courses", link: "languageType/course" },
    { name: "Projects", link: "languageType/project" },
  ];

  const { currentCategoryValue, setCurrentCategoryValue } =
    useNavbarFilterContext();

  return (
    <div className="category-filter-container">
      <CurrentFilter
        data={categoryData}
        filterBy={"Filter by"}
        active={activeCategoryFilter}
        setActive={setCategoryFilter}
        currentItemValue={currentCategoryValue}
        setCurrentItemValue={setCurrentCategoryValue}
        params={params}
      />
    </div>
  );
}
