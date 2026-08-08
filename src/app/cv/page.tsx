import { Metadata } from "next/types";
import CVPage from "@/features/cv/CVPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CV — Alexandru Roventa",
  description:
    "Curriculum vitae — Full-Stack Developer (MERN / TypeScript). Proiecte SaaS proprii, Node.js, React, MongoDB.",
  openGraph: {
    title: "CV — Alexandru Roventa",
    url: "https://alexandru-roventa.ro/cv",
    type: "profile",
  },
};

type Theme = "technical" | "corporate";

export default function page({
  searchParams,
}: {
  searchParams: { theme?: string };
}) {
  const theme: Theme =
    searchParams.theme === "corporate" ? "corporate" : "technical";

  return <CVPage theme={theme} />;
}
