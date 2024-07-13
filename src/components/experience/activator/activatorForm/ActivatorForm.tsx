import React from "react";
import ActivatorLabel from "../activatorLabel/ActivatorLabel";
import ActivatorButton from "../activatorButton/ActivatorButton";
import Link from "next/link";

export default function ActivatorForm() {
  return (
    <div className="activator-content">
      <div className="close text-black text-end">
        <Link href={"/experience/add-experience"}>X</Link>
      </div>
      <form>
        <ActivatorLabel />
        <ActivatorButton />
      </form>
    </div>
  );
}
