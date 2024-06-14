import ContentWrapper from "@/components/performance/main/modal/modul/ContentWrapper";
import React from "react";

export default function DescriptionModules({
  description,
}: {
  description: string;
}) {
  return (
    <div className="wrapper description-modules flex flex-col self-start gap-4">
      <ContentWrapper title={"Description:"} description={description} />
    </div>
  );
}
