import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
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
      <BodyWrapper>
        <LayoutShell>{children}</LayoutShell>
      </BodyWrapper>
    </html>
  );
}
