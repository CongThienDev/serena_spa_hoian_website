import Link from "next/link";
import ServiceCard from "@/components/cards/ServiceCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { getFeaturedServicesLocalized } from "@/data/services";
import { getHomeCopy } from "@/data/content-home";
import { type Locale, withLocalePath } from "@/lib/i18n";

/**
 * SignatureTreatments — "Our Signature Treatments" section.
 * 4-column card grid on desktop, 2-col tablet, 1-col mobile.
 * Includes a dark "Book Your Wellness" sidebar card matching the reference.
 */
export default function SignatureTreatments({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).treatments;
  const services = getFeaturedServicesLocalized(4, locale);

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
                {copy.eyebrow}
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
              {copy.title}
            </h2>
            <div className="flex justify-center mt-3 mb-4" aria-hidden="true">
              <LotusMarkSmall size={22} color="var(--color-terracotta)" />
            </div>
            <p
              className="font-sans text-[var(--color-warm-gray)] mx-auto"
              style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "54ch" }}
            >
              {copy.subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Grid: 4 service cards + 1 booking CTA card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_340px] gap-5">
          {/* Service cards */}
          {services.map((service, i) => (
            <AnimatedSection key={service.id} animation="slide-up-fade" delay={i * 0.08}>
              <ServiceCard service={service} className="h-full" locale={locale} />
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
                  {copy.bookingEyebrow}
                </span>
                <h3
                  className="font-serif text-white mb-4"
                  style={{ fontSize: "1.7rem", fontWeight: 500, lineHeight: 1.15 }}
                >
                  {copy.bookingTitle}
                </h3>
                <p
                  className="font-sans text-[var(--color-warm-gray-light)]"
                  style={{ fontSize: "0.875rem", lineHeight: 1.7 }}
                >
                  {copy.bookingDesc}
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 mt-8">
                <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary justify-center">
                  {copy.bookingPrimary}
                </Link>
                <Link
                  href={withLocalePath(locale, "/services")}
                  className="btn btn-outline-white justify-center"
                >
                  {copy.bookingSecondary}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
