import AddButtons from "@/components/buttons/AddButtons";
import AddContent from "@/components/performance/main/addContent/AddContent";
import CategoryFilter from "@/components/performance/navbar/modal/categoryFilter/CategoryFilter";
import ItemsPerPage from "@/components/performance/navbar/modal/itemsPerPage/ItemsPerPage";
import React from "react";
import "./navbar.scss";
import AlreadyFiltered from "../navbar/alreadyFiltered/AlreadyFiltered";
export default function Navbar({ params }: { params: any }) {
  return (
    <div className="navbar-content">
      <CategoryFilter params={params} />
      <ItemsPerPage params={params} />
      <AlreadyFiltered params={params}/>
      <div className="add-button-container ml-auto">
        <AddButtons description="add-content" />
      </div>
    </div>
  );
}
