import React from "react";

export default function page({ params }: { params: { experience: string } }) {
  return <div>{params.experience}</div>;
}
