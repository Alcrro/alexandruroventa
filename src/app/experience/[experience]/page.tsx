import React from "react";
export const dynamic = "force-dynamic";
export default function page({ params }: { params: { experience: string } }) {
  return <div>{params.experience}</div>;
}
