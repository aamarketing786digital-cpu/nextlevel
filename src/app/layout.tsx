import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import Script from "next/script";
import { BodyWrapper } from "@/components/layout/BodyWrapper";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
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
  verification: {
    google: "0FIV43hZ62LUJNuEkjQJEPdS4aTMkF6JLm4CN_qGv4k",
  },
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
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />

        {/* Google Analytics GA4 - Deferred load for better performance */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PRHW62LLFS"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PRHW62LLFS', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
      </head>
      <BodyWrapper>
        <LayoutShell>{children}</LayoutShell>
      </BodyWrapper>
    </html>
  );
}
