export const dynamic = "force-dynamic";

import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Alexandru Roventa - About me",
  description: "Home",
};

export default function page() {
  return <div className="about"></div>;
}
