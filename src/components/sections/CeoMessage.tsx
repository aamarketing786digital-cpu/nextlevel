import Image from "next/image"
import { Container } from "@/components/layout/Container"

export function CeoMessage() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Image Side */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/team/aqsa-qureshi-ceo.jpeg"
                alt="Aqsa Qureshi - CEO"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-1">Aqsa Qureshi</h3>
                <p className="text-orange-400 font-medium">Founder & CEO</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                A Message from the CEO
              </h2>
              
              <div className="prose prose-lg text-slate-600">
                <p>
                  When I started NextLevel Marketerz, I noticed a huge gap in the market. Most agencies were selling generic marketing packages that didn't actually move the needle. They focused on vanity metrics instead of revenue. That bothered me.
                </p>
                <p>
                  I wanted to build something different. We focus purely on what drives growth. We do not hide behind complex dashboards or industry jargon. If a campaign isn't working, I am the first to pull the plug and pivot. My philosophy is simple: we win when our clients win.
                </p>
                <p>
                  The digital landscape is noisy. Standing out requires more than just a good ad. It requires a deep understanding of human psychology, creative that actually stops the scroll, and technical execution that converts clicks into customers. That is what my team and I deliver every single day.
                </p>
              </div>

              {/* Signature / Quote */}
              <div className="pt-6 border-t border-slate-200 mt-8">
                <blockquote className="text-xl italic font-medium text-slate-800 mb-4">
                  "Marketing isn't about being everywhere. It's about being exactly where your customers are making decisions."
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
