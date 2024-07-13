import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/navbar/Navbar";
import DarkThemeProvider from "./DarkThemeProvider";
import NavbarFilterProvider from "@/context/navbarFilterContext/NavbarFilterContext";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";
import { ExperienceContextProvider } from "@/context/experienceContext/ExperienceContext";
import "./layout.scss"


const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
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
      <body className={roboto.className}>
        <DarkThemeProvider>
          <main>
            <Navbar />
            <NavbarFilterProvider>
              <ExperienceContextProvider>
                <div className="main root">
                  {children}
                  {modal}
                </div>
              </ExperienceContextProvider>
            </NavbarFilterProvider>

            <Footer />
          </main>
        </DarkThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
