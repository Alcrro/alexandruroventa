import AddButtons from "@/components/buttons/AddButtons";

import CategoryFilter from "@/components/performance/navbar/modal/categoryFilter/CategoryFilter";
import ItemsPerPage from "@/components/performance/navbar/modal/itemsPerPage/ItemsPerPage";
import React from "react";
import "./navbar.scss";
import AlreadyFiltered from "../navbar/alreadyFiltered/AlreadyFiltered";
export default function Navbar({ params }: { params: any }) {
  return (
    <>
      {params.filter !== undefined ? <AlreadyFiltered params={params} /> : null}

      <div className="navbar-content">
        <CategoryFilter params={params} />
        <ItemsPerPage params={params} />
        <div className="add-button-container ml-auto">
          <AddButtons description="add-content" />
        </div>
      </div>
    </>
  );
}
