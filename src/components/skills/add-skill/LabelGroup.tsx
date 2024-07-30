import React, { useState } from "react";

export default function LabelGroup({ inputValue }: { inputValue: any }) {
  return (
    <div className="label-group">
      <label htmlFor="skillName">Add a skill</label>
      <input
        type="text"
        placeholder="Add a skill"
        name="skillName"
        onChange={(e) => inputValue(e.target.value)}
      />
    </div>
  );
}
