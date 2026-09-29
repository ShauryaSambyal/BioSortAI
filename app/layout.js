import { Bricolage_Grotesque } from "next/font/google";

import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

// Variable font with the optical-size axis so large headings pick the tight
// display cut automatically; body text gets the text cut.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
