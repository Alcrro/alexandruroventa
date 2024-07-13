"use client";
import React, { SetStateAction } from "react";
import "./currentFilter.scss";
import FilterList from "../filterList/FilterList";

export default function CurrentFilter({
  data,
  filterBy,
  active,
  setActive,
  currentItemValue,
  setCurrentItemValue,
  params,
}: {
  data: any;
  filterBy: string;
  active: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
  currentItemValue: string;
  setCurrentItemValue: React.Dispatch<SetStateAction<string>>;
  params: any;
}) {
  const activeHandler = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="current-filter-container">
      <div className="text-filter">{filterBy}: </div>
      <div className={`current-filter-inner${active ? " active" : ""}`}>
        <div
          className={`current-filter${active ? " active" : ""}`}
          onClick={activeHandler}
        >
          {currentItemValue}
        </div>
        <FilterList
          data={data}
          active={active}
          setActive={setActive}
          setCurrentFilter={setCurrentItemValue}
          params={params}
        />
      </div>
    </div>
  );
}
