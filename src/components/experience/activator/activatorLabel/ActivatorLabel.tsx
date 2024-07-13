import React from "react";

export default function ActivatorLabel() {
  return (
    <div className="label-group-activator flex flex-col gap-4 text-black text-center my-2">
      <label htmlFor="code">Add your code:</label>
      <input
        type="text"
        id="code"
        name="codeActivator"
        className="bg-white border border-gray-500 rounded-lg p-1 "
        placeholder="insert cod"
      />
    </div>
  );
}
