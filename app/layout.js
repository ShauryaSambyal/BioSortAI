import { Geist, Geist_Mono } from "next/font/google";

import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "BioSort AI — Heart attack risk screening & biomedical waste segregation",
    template: "%s · BioSort AI",
  },
  description:
    "Enter your vitals and clinical markers to estimate heart attack risk with a logistic-regression model that runs in your browser, or let BioSort AI classify biomedical waste and tell you how to dispose of it safely.",
  keywords: [
    "heart attack risk",
    "cardiovascular risk calculator",
    "biomedical waste segregation",
    "clinical decision support",
  ],
};

export const viewport = {
  themeColor: "#04070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {/* The signature backdrop: a fixed technical grid over near-black. */}
        <div className="grid-backdrop" aria-hidden="true" />
        <div className="grid-backdrop grid-backdrop--fine" aria-hidden="true" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
