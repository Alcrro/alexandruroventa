import Header from "@/components/performance/slugContent/header/Header";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Header params={params} />
    </div>
  );
}
