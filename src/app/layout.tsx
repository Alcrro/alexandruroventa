import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "https://alexandru-roventa.ro"),
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
        <link rel="preconnect" href="https://alexandru-roventa.s3.eu-central-1.amazonaws.com" />
        <link rel="preconnect" href="https://ti-user-certificates.s3.amazonaws.com" />
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5MXVJFNEHH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5MXVJFNEHH');
          `}
        </Script>
      </body>
    </html>
  );
}
