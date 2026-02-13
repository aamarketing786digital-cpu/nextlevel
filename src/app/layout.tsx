import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BodyWrapper } from "@/components/layout/BodyWrapper";
import { Preloader } from "@/components/preloaders/Preloader";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextLevel Marketerz | The Future of Growth",
  description: "Ascension to digital excellence. AI-powered marketing, web development, and growth strategies for UAE and Middle East markets.",
  keywords: ["digital marketing", "AI chatbots", "web development", "UAE", "Middle East", "growth marketing"],
  authors: [{ name: "NextLevel Marketerz" }],
  openGraph: {
    title: "NextLevel Marketerz | The Future of Growth",
    description: "Ascension to digital excellence. AI-powered marketing, web development, and growth strategies.",
    type: "website",
    url: "https://nextlevelmarketerz.com",
    siteName: "NextLevel Marketerz",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextLevel Marketerz | The Future of Growth",
    description: "Ascension to digital excellence. AI-powered marketing, web development, and growth strategies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <BodyWrapper>
        {/* Skip to content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Preloader />
        <Navbar />
        <div className="relative z-10 bg-background shadow-2xl rounded-b-xl md:rounded-b-[3rem] min-h-screen isolate">
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
        <Footer />
      </BodyWrapper>
    </html>
  );
}
