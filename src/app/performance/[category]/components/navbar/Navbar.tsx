import React from "react";
import CategoryFilter from "@/components/performance/navbar/modal/categoryFilter/CategoryFilter";
import ItemsPerPage from "@/components/performance/navbar/modal/itemsPerPage/ItemsPerPage";
import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="performance-nav-bar-container py-4">
      <div className="performance-nav-bar-inner">
        <CategoryFilter />
        <ItemsPerPage />
      </div>
    </div>
  );
}
