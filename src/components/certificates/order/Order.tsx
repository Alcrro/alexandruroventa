import React from "react";
import "./order.scss";
import {
  IOrder,
  order as OrderCertificates,
} from "@/_lib/certificates/order/order";
import OrderList from "./OrderList";
import OrderModal from "./OrderModal";
import CurrentOrder from "./CurrentOrder";

export default function Order() {
  return (
    <div className="orderBy-container">
      <div className="orderBy relative">
        <OrderModal>
          <CurrentOrder />
        </OrderModal>
        <ul className="ul-order">
          {OrderCertificates.map((orders: IOrder, key) => (
            <OrderList orders={orders} key={key} />
          ))}
        </ul>
      </div>
    </div>
  );
}
