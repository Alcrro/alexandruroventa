import ContentWrapper from "@/components/performance/main/modal/modul/ContentWrapper";
import React from "react";

export default function NameModules({ name }: { name: string }) {
  return (
    <div className="wrapper name-modules flex flex-col self-start gap-4">
      <ContentWrapper title="name" description={name} />
    </div>
  );
}
