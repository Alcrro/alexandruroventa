import React from "react";

export default async function page({
  params,
}: {
  params: { experience: string };
}) {
  return <div>{params.experience}</div>;
}
