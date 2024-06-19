import CategoryFilter from "@/components/performance/navbar/modal/categoryFilter/CategoryFilter";
import ItemsPerPage from "@/components/performance/navbar/modal/itemsPerPage/ItemsPerPage";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex gap-4">
      <CategoryFilter />
      <ItemsPerPage />
    </div>
  );
}
