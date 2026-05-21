"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  // Landing page routes use their own minimal layout (LandingPageLayout)
  const LANDING_PAGE_SLUGS = [
    "/seo-for-restaurants-dubai",
    "/seo-for-clinics-uae",
    "/seo-for-real-estate-dubai",
    "/restaurant-website-dubai",
    "/clinic-website-design-uae",
    "/ecommerce-website-dubai",
  ];
  const isLandingPage = LANDING_PAGE_SLUGS.some(
    (slug) => pathname === slug || pathname.startsWith(slug + "/")
  );

  if (isStudio || isLandingPage) {
    // Render only the children — no header, footer, preloader, or WhatsApp
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip to content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <div className="relative z-10 bg-background shadow-2xl rounded-b-xl md:rounded-b-[3rem] min-h-screen isolate">
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
      <Footer />
      <WhatsAppButton phoneNumber="+971568450650" message="Hi, I am interested in your services." />
    </>
  );
}
