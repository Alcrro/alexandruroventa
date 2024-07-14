import Filters from "@/components/certificates/filters/Filters";
import Order from "@/components/certificates/order/Order";
import React from "react";

export default function page() {
  return (
    <div className="filters-container ">
      <Filters />
      <Order />
    </div>
  );
}
