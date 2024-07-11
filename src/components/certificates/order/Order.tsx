"use client";
import React, { useState } from "react";
import "./order.scss";
import Link from "next/link";
export default function Order() {
  const [active, setActive] = useState(false);
  const [order, setOrder] = useState("organization");
  const orderArray = ["organization", "language", "date"];

  console.log(order);

  return (
    <div className="orderBy-container">
      <div className="orderBy relative">
        <div
          className={`currentOrder currentValue ${
            active ? "isActive" : "isNotActive"
          }`}
          onClick={() => setActive((prev) => !prev)}
        >
          <span>{order}</span>
        </div>
        <ul className={`${active ? "isActive" : "isNotActive"}`}>
          {orderArray.map((orders, key) => (
            <li
              className={`li-order${orders === order ? " active" : ""}`}
              key={key}
              onClick={() => setOrder(orders)}
            >
              <Link href={`/certificates/${orders}`}>{orders}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
