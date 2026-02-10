import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface ServicePageProps {
  params: { slug: string };
}

// Generate static params for all services
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for each service
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | NextLevel Marketerz`,
    description: service.shortDescription,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border/50 py-4">
        <Container>
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="section-gradient py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              {typeof service.icon === "string" ? (
                <span className="text-4xl">{service.icon}</span>
              ) : (
                service.icon
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              {service.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border/50"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Technologies Section */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Technologies We Use</h2>
              <p className="text-muted-foreground mb-8">
                We leverage cutting-edge tools and frameworks to deliver the best results.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-card border border-border/50 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Pricing Section */}
      {service.pricing && (
        <section className="py-16 md:py-24 bg-background">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-2">{service.pricing.name}</h2>
                <p className="text-4xl font-bold text-primary mb-6">
                  {service.pricing.price}
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {service.pricing.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how {service.title} can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/work">View Our Work</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
