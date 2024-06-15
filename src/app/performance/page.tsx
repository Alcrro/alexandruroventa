export const dynamic = "force-dynamic";
import React from "react";
import Performance from "@/app/performance/components/Performance";
import { Metadata } from "next/types";
export const metadata: Metadata = {
  title: "Alexandru Roventa - Performance",
  description: "Home",
};
export default function page() {
  return (
    <div className="">
      <Performance />
    </div>
  );
}
