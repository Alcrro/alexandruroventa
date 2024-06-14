"use client";
import React, { SetStateAction, useState } from "react";
import "./rating.scss";
export default function RatingModal({
  modalHandler,
}: {
  modalHandler: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="rating-inner">
      <div className="stars" onClick={() => modalHandler(true)}>
        <div className="star-inner">
          <div className={`star`} style={{ width: "33%" }}></div>
        </div>
      </div>
      <span>2.83</span>
    </div>
  );
}
