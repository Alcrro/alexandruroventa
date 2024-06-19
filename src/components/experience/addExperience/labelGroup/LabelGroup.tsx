"use client";
import React, { useState } from "react";

export default function LabelGroup({ date }: { date: any }) {
  const [ifJobIsEnded, setIfJobIsEnded] = useState(false);
  const isCheckedHandler = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setIfJobIsEnded(e.currentTarget.checked);
  };
  return (
    <div className="dates-start-to-end">
      <div className="label-group">
        <label htmlFor="start">Start:</label>
        <input
          type="date"
          className="date"
          name="start-date"
          id="start"
          defaultValue={"2000-01-01"}
          min={"2000-01-01"}
        />
      </div>
      <div className="label-group">
        <label htmlFor="ended">Ended:</label>

        {ifJobIsEnded ? (
          <input
            type="date"
            className="date"
            name="end-date"
            disabled
            id="ended"
            defaultValue={date}
          />
        ) : (
          <input
            type="date"
            className="date"
            name="end-date"
            min={"2000-01-01"}
            defaultValue={date}
          />
        )}
      </div>
      <div className="label-group">
        <input
          type="checkbox"
          defaultChecked={false}
          className="date"
          name="isChecked"
          onClick={(e) => isCheckedHandler(e)}
        />
      </div>
    </div>
  );
}
