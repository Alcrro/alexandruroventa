import type { Metadata } from "next";
import PerformanceCategories from "@/features/performance/PerformanceCategories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Knowledge Tracker — Alexandru Roventa",
};

export default function PerformancePage() {
  return <PerformanceCategories />;
}
