import React from "react";
import "../certificates.scss";
export default function layout({
  filter,
  main,
}: {
  filter: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <div>
      {filter}
      {main}
    </div>
  );
}
