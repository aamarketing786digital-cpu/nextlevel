import { Metadata } from "next";
import { getLandingPageBySlug } from "@/lib/landing-pages";
import { LandingPage } from "@/components/landing/LandingPage";
import { LandingPageLayout } from "@/components/landing/LandingPageLayout";

const PAGE = getLandingPageBySlug("seo-for-restaurants-dubai")!;

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

export default function SeoForRestaurantsDubaiPage() {
  return (
    <LandingPageLayout>
      <LandingPage config={PAGE} />
    </LandingPageLayout>
  );
}
