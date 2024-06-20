"use client";
import React, { useState } from "react";
import CurrentFilter from "../currentFIlter/CurrentFilter";
import { useNavbarFilterContext } from "@/context/navbarFilterContext/NavbarFilterContext";

export default function ItemsPerPage({ params }: { params: any }) {
  const [activeItemPerPage, setActiveItemPerPage] = useState(false);
  const counterPerPage = [
    { name: 20, link: "limit/20-per-page" },
    { name: 30, link: "limit/30-per-page" },
    { name: 50, link: "limit/50-per-page" },
  ];
  const { currentItemPerPage, setCurrentItemPerPage } =
    useNavbarFilterContext();

  return (
    <div className="items-per-page-container">
      <CurrentFilter
        data={counterPerPage}
        filterBy={"Items/page"}
        active={activeItemPerPage}
        setActive={setActiveItemPerPage}
        currentItemValue={currentItemPerPage}
        setCurrentItemValue={setCurrentItemPerPage}
        params={params}
      />
    </div>
  );
}
