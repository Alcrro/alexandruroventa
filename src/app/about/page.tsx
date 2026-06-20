export const dynamic = "force-dynamic";

import { Metadata } from "next/types";
import AboutPage from "@/features/about/AboutPage";

export const metadata: Metadata = {
  title: "About — Alexandru Roventa",
  description: "Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
  openGraph: {
    title: "About — Alexandru Roventa",
    url: "https://alexandru-roventa.ro/about",
    type: "profile",
  },
};

export default function page() {
  return <AboutPage />;
}
