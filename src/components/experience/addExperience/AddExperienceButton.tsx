import React from "react";

import Link from "next/link";

export default function AddExperienceButton() {
  return (
    <div>
      <div className="add-experience-button">
        <Link href={`/experience/add-experience`}>Add Experience</Link>
      </div>
    </div>
  );
}
