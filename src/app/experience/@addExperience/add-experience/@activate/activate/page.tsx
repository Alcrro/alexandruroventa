import React from "react";

export default function page() {
  return (
    <div className="activator-container absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="activator-content p-6 rounded-lg h-[120px] border border-gray-600 bg-white">
        <div className="label-group-activator flex flex-col gap-4">
          <label htmlFor="code">Add your activator code:</label>
          <input
            type="text"
            id="code"
            name="codeActivator"
            className="bg-white border border-gray-500 rounded-lg p-1"
            placeholder="insert cod"
          />
        </div>
      </div>
    </div>
  );
}
