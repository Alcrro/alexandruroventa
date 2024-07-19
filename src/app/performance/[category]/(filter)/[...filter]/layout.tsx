import React from "react";
import "@/components/performance/main/contentList.scss"
export default function layout({
  filter,
  main,
}: {
  filter: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <>
      {filter}
      {main}
    </>
  );
}
