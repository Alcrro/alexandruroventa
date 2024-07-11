import React from "react";

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
