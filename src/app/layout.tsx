import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../features/navbar/Navbar";
import DarkThemeProvider from "./DarkThemeProvider";
import Footer from "@/features/footer/Footer";
import { Toaster } from "react-hot-toast";
import { ExperienceContextProvider } from "@/context/experienceContext/ExperienceContext";
import "./layout.scss"


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alexandru Roventa - Home",
  description: "Home",
  icons: {
    icon: "/public/eu.png",
  },
};

export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/eu.png" sizes="any" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <DarkThemeProvider>
          <main>
            <Navbar />
            <ExperienceContextProvider>
              <div className="main root">
                {children}
                {modal}
              </div>
            </ExperienceContextProvider>
            <Footer />
          </main>
        </DarkThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
