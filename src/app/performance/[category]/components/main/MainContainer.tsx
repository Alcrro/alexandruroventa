"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function MainContainer({
  document,
  children,
}: {
  document: any;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handler = (document: any) => {
    const { id, dataId, name, moduleType, description, performance } = document;

    let nameSlug = name.split(" ").join("-").toLocaleLowerCase();
    let descriptionSlug = description
      .replace(/[.,]/g, "")
      .split(" ")
      .join("-")
      .toLocaleLowerCase();

    let slug = `${performance}-${moduleType}-${nameSlug}-${descriptionSlug}-${dataId}`;
    // console.log(slug);

    router.push(`/knowledge/${slug}`);
  };
  return (
    <div
      className="document-container text-center"
      key={document.id}
      onClick={() => handler(document)}
    >
      {children}
    </div>
  );
}
