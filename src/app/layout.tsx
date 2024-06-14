import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import Navbar from "../components/navbar/Navbar";
import DarkThemeProvider from "./DarkThemeProvider";
import NavbarFilterProvider from "@/context/navbarFilterContext/NavbarFilterContext";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandru Roventa - Home",
  description: "Home",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <DarkThemeProvider>
          <main>
            <Navbar />
            <NavbarFilterProvider>
              <div className="main">
                {children}
                {modal}
              </div>
            </NavbarFilterProvider>
          </main>
        </DarkThemeProvider>
      </body>
    </html>
  );
}
