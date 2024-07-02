import Header from "@/components/performance/slugContent/header/Header";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  console.log("merge", params.slug);

  return (
    <div>
      <Header />
    </div>
  );
}
