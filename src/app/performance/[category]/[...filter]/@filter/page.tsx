import Navbar from "@/components/performance/components/Navbar";
import React from "react";

export default function page({ params }: { params: any }) {
  return <Navbar params={params} />;
}
