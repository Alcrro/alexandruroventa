import ContentWrapper from "@/components/performance/main/modal/modul/ContentWrapper";
import React from "react";

export default function DateModules({ dataCreated }: { dataCreated: string }) {
  const today = new Date();
  return (
    <div className="wrapper date-module flex flex-col self-start gap-4">
      <ContentWrapper title={"Date:"} description={dataCreated} />
    </div>
  );
}
