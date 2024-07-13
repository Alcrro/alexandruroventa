"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import "./filterList.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbarFilterContext } from "@/context/navbarFilterContext/NavbarFilterContext";

export default function FilterList({
  data,
  active,
  setActive,
  setCurrentFilter,
  params,
}: {
  data: any;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  setCurrentFilter: Dispatch<SetStateAction<string>>;
  params: any;
}) {
  const pathname = usePathname();
  let currentPathname = pathname.split("/")[2];

  const { setCurrentCategoryValue } = useNavbarFilterContext();

  const handler = (name: string) => {
    setCurrentCategoryValue(name);
    setActive(false);
    setCurrentFilter(name);
  };

  return (
    <div className={`filter-list${active ? " active" : ""}`}>
      <ul>
        {data.map((item: any, key: number) => (
          <li key={key} onClick={() => handler(item.name)}>
            {item.link === "all" || item.link === 20 ? (
              <Link href={`/performance/${currentPathname}/`}>
                <span>{item.name}</span>
              </Link>
            ) : (
              <Link href={`/performance/${params.category}/${item.link}`}>
                <span>{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
