"use client";
import React, { useState } from "react";

export default function LabelGroup({ date }: { date: any }) {
  const [ifJobIsEnded, setIfJobIsEnded] = useState(false);

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
          max={date}
        />
      </div>
      <div className="label-group">
        <label htmlFor="ended">End:</label>

        {ifJobIsEnded ? (
          <input
            type="date"
            className="date"
            name="end-date"
            disabled
            id="ended"
            min={"2000-01-01"}
            defaultValue={date}
            max={date}
          />
        ) : (
          <input
            type="date"
            className="date"
            name="end-date"
            min={"2000-01-01"}
            defaultValue={date}
            max={date}
          />
        )}
      </div>
      <div className="label-group">
        <input
          type="checkbox"
          className="date check"
          defaultChecked={ifJobIsEnded}
          name="isChecked"
          onClick={() => setIfJobIsEnded((prev) => !prev)}
        />
        <span className="check-background"></span>
      </div>
    </div>
  );
}
