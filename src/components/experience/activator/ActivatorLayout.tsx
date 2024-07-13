import React from "react";
import ActivatorForm from "./activatorForm/ActivatorForm";

export default function ActivatorLayout() {
  return (
    <div className="activator-container absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="activator-content p-6 rounded-lg border border-gray-600 bg-white">
        <ActivatorForm />
      </div>
    </div>
  );
}
