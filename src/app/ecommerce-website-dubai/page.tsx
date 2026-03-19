import { Metadata } from "next";
import { getLandingPageBySlug } from "@/lib/landing-pages";
import { LandingPage } from "@/components/landing/LandingPage";
import { LandingPageLayout } from "@/components/landing/LandingPageLayout";

const PAGE = getLandingPageBySlug("ecommerce-website-dubai")!;

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  keywords: PAGE.keywords,
  openGraph: {
    title: PAGE.title,
    description: PAGE.description,
    type: "website",
    siteName: "NextLevel Marketerz",
  },
};

export default function EcommerceWebsiteDubaiPage() {
  return (
    <LandingPageLayout>
      <LandingPage config={PAGE} />
    </LandingPageLayout>
  );
}
