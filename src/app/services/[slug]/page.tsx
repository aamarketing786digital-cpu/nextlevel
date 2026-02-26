import { SERVICES } from "@/lib/constants";
import { ServiceDetailClient } from "./ServiceDetailClient";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all services at build time (Server Component)
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

// Server Component wrapper
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return null; // Will trigger not-found
  }

  return <ServiceDetailClient service={service} />;
}
