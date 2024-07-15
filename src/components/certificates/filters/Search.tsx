"use client";
import React, { useEffect } from "react";
import "./search.scss";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = new URLSearchParams();

  const searchHandler = (value: string) => {
    let newValue = value.replace(/\//g, "-");

    if (newValue.trim() === "") {
      sp.delete("search");
    } else {
      sp.set("search", newValue);
    }

    router.push(`${pathname}?${sp.toString()}`);
  };

  const clearSearchHandler = () => {
    router.push(`${pathname}`);
  };

  return (
    <div className="search-container">
      <div className="search">
        <div className="label-group">
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => searchHandler(e.target.value)}
          />
        </div>
      </div>
      <div className="clear-button-container">
        <button className="clear-button" onClick={() => clearSearchHandler()}>
          Clear
        </button>
      </div>
    </div>
  );
}
