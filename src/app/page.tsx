import type { Metadata } from "next";
import HomePage from "@/features/home/HomePage";

export const metadata: Metadata = {
  title: "Alexandru Roventa — Full Stack Developer",
  description:
    "Portfolio personal — Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
  openGraph: {
    title: "Alexandru Roventa — Full Stack Developer",
    description:
      "Portfolio personal — Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
    url: "https://alexandru-roventa.ro",
    siteName: "Alexandru Roventa",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Alexandru Roventa" }],
    locale: "ro_RO",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}
