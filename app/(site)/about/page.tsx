import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = generatePageMetadata({
  title: "About Serena Spa Hội An",
  description:
    "Discover Serena Spa's story, philosophy, and commitment to premium wellness experiences in Hội An.",
  path: "/about",
});

const pillars = [
  "Skilled therapists with international training",
  "Botanical, skin-friendly products",
  "Private and calm treatment environment",
  "Consistent warm hospitality in every detail",
];

export default function AboutPage() {
  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow="About Serena"
              title="A Place to Glow"
              subtitle="Serena Spa was created as a calm sanctuary in the heart of Hội An, where thoughtful rituals, refined spaces, and caring hands help you return to balance."
              titleAs="h1"
            />
            <p className="prose-spa mt-5">
              We blend Vietnamese healing traditions with modern wellness standards to create treatments that are both deeply restorative and beautifully memorable.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services" className="btn btn-primary btn-sm">Explore Services</Link>
              <Link href="/booking" className="btn btn-outline btn-sm">Book Now</Link>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale-fade" delay={0.08}>
            <div className="relative overflow-hidden rounded-[var(--radius-card)]" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg"
                alt="Serena Spa reception with warm terracotta interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--color-section-warm)" }}>
        <div className="container-site">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow="Why Guests Return"
              title="Our Promise"
              align="center"
              className="mb-10"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((item, i) => (
              <AnimatedSection key={item} animation="slide-up-fade" delay={i * 0.06}>
                <div className="card p-6 h-full">
                  <p className="font-sans text-[var(--color-espresso)]">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
