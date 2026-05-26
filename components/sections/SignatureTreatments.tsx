import Link from "next/link";
import ServiceCard from "@/components/cards/ServiceCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { getFeaturedServices } from "@/data/services";

/**
 * SignatureTreatments — "Our Signature Treatments" section.
 * 4-column card grid on desktop, 2-col tablet, 1-col mobile.
 * Includes a dark "Book Your Wellness" sidebar card matching the reference.
 */
export default function SignatureTreatments() {
  const services = getFeaturedServices(4);

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-labelledby="treatments-heading"
    >
      <div className="container-site">
        {/* Heading — "— OUR SIGNATURE TREATMENTS —" style matching reference */}
        <AnimatedSection animation="slide-up-fade">
          <div className="text-center mb-12 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-3" aria-hidden="true">
              <span
                className="block h-px w-16 md:w-24"
                style={{ background: "linear-gradient(to right, transparent, var(--color-terracotta))", opacity: 0.5 }}
              />
              <span
                className="font-sans uppercase tracking-[0.22em] text-[var(--color-terracotta)]"
                style={{ fontSize: "0.68rem" }}
              >
                Our Signature Treatments
              </span>
              <span
                className="block h-px w-16 md:w-24"
                style={{ background: "linear-gradient(to left, transparent, var(--color-terracotta))", opacity: 0.5 }}
              />
            </div>
            <h2
              id="treatments-heading"
              className="font-serif text-[var(--color-espresso)] mb-2"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.7rem)", fontWeight: 500, lineHeight: 1.1 }}
            >
              Our Signature Treatments
            </h2>
            <div className="flex justify-center mt-3 mb-4" aria-hidden="true">
              <LotusMarkSmall size={22} color="var(--color-terracotta)" />
            </div>
            <p
              className="font-sans text-[var(--color-warm-gray)] mx-auto"
              style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "54ch" }}
            >
              Each treatment is a carefully designed ritual — blending ancient Vietnamese healing with modern wellness to restore, renew and illuminate.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid: 4 service cards + 1 booking CTA card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_340px] gap-5">
          {/* Service cards */}
          {services.map((service, i) => (
            <AnimatedSection key={service.id} animation="slide-up-fade" delay={i * 0.08}>
              <ServiceCard service={service} className="h-full" />
            </AnimatedSection>
          ))}

          {/* Dark booking sidebar card — matches reference */}
          <AnimatedSection animation="slide-up-fade" delay={0.35}>
            <div
              className="flex flex-col justify-between rounded-[var(--radius-card)] p-7 h-full min-h-[320px]"
              style={{ backgroundColor: "var(--color-espresso)" }}
            >
              {/* Top content */}
              <div>
                <span
                  className="block font-sans font-semibold uppercase tracking-widest text-[var(--color-peach-light)] mb-4"
                  style={{ fontSize: "0.68rem" }}
                >
                  Wellness Booking
                </span>
                <h3
                  className="font-serif text-white mb-4"
                  style={{ fontSize: "1.7rem", fontWeight: 500, lineHeight: 1.15 }}
                >
                  Book Your Wellness Journey
                </h3>
                <p
                  className="font-sans text-[var(--color-warm-gray-light)]"
                  style={{ fontSize: "0.875rem", lineHeight: 1.7 }}
                >
                  Reserve your treatment online or reach us directly on WhatsApp. Same-day bookings welcome.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 mt-8">
                <Link href="/booking" className="btn btn-primary justify-center">
                  Reserve a Treatment
                </Link>
                <Link
                  href="/services"
                  className="btn btn-outline-white justify-center"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
