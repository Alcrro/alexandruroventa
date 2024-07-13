"use client";
import Link from "next/link";
import React from "react";

import { usePathname, useRouter } from "next/navigation";

export default function OrderList({ orders }: { orders: any }) {
  const pathname = usePathname();
  const route = useRouter();
  let name = pathname.split("/").filter((item) => item === orders.name);
  let ordName = name.toString();

  let ascActive = pathname.includes("asc");
  let descActive = pathname.includes("desc");

  const orderHandler = () => {
    if (ascActive && ordName === orders.name) {
      route.push(`/certificates/${ordName}/desc`);
    }
  };

  return (
    <li
      className={`li-order ${
        ascActive && ordName === orders.name ? "active" : ""
      }`}
      onClick={() => orderHandler()}
    >
      <Link href={`/certificates/${orders.ascending.link}`}>
        <span
          className={`ordered-name ${
            (ascActive || descActive) && ordName === orders.name ? "active" : ""
          }`}
        >
          {orders.name}
        </span>
        <span
          className={`orderedByAsc ${
            ascActive && ordName === orders.name ? "active" : ""
          }`}
        ></span>
        <span
          className={`orderedByDesc ${
            descActive && ordName === orders.name ? "active" : ""
          }`}
        ></span>
      </Link>
    </li>
  );
}
