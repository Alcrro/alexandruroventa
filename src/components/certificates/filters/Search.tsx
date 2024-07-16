"use client";
import React, { useEffect, useRef } from "react";
import "./search.scss";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchRef: any = useRef();

  const searchHandler = (value: string) => {
    let newValue = value.replace(/\//g, "-");
    const sp = new URLSearchParams();

    if (newValue.trim() === "") {
      sp.delete("search");
    } else {
      sp.set("search", newValue);
    }

    router.push(`${pathname}?${sp.toString()}`);
  };

  useEffect(() => {
    router.replace(`${pathname}`, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearSearchHandler = () => {
    router.push(`${pathname}`);
    searchRef.current.value = "";
  };

  return (
    <div className="search-container">
      <div className="search">
        <div className="label-group">
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => searchHandler(e.target.value)}
            ref={searchRef}
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
