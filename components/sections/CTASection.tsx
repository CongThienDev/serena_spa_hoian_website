import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { getHomeCopy } from "@/data/content-home";
import { type Locale, withLocalePath } from "@/lib/i18n";

/**
 * CTASection — full-width booking CTA before the footer.
 * Uses a real spa image as background with warm espresso overlay.
 * Large serif headline, two CTAs, lotus ornament.
 */
export default function CTASection({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).cta;
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(380px, 50vh, 560px)" }}
      aria-label="Book your spa treatment"
    >
      {/* Background spa image */}
      <Image
        src="/images/serena_image/z7863130063966_02bca12b005872be63d6ed4054b0cad4.jpg"
        alt="Serena Spa reception and lobby — warm welcoming interior"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Warm espresso overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(61,31,15,0.88) 0%, rgba(61,31,15,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative container-site flex flex-col items-center justify-center text-center h-full py-20 md:py-28 gap-6">

        {/* Lotus ornament */}
        <AnimatedSection animation="scale-fade">
          <LotusMarkSmall size={32} color="var(--color-peach-light)" />
        </AnimatedSection>

        {/* Eyebrow */}
        <AnimatedSection animation="fade" delay={0.1}>
          <span
            className="font-sans font-semibold uppercase tracking-widest text-[var(--color-peach-light)]"
            style={{ fontSize: "0.72rem", letterSpacing: "0.22em" }}
          >
            {copy.eyebrow}
          </span>
        </AnimatedSection>

        {/* Heading */}
        <AnimatedSection animation="slide-up-fade" delay={0.18}>
          <h2
            className="font-serif text-white max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 500, lineHeight: 1.1 }}
          >
            {copy.title}
          </h2>
        </AnimatedSection>

        {/* Subtext */}
        <AnimatedSection animation="fade" delay={0.28}>
          <p
            className="font-sans text-[var(--color-sand)] max-w-lg"
            style={{ fontSize: "1rem", lineHeight: 1.75 }}
          >
            {copy.subtitle}
          </p>
        </AnimatedSection>

        {/* CTAs */}
        <AnimatedSection animation="slide-up-fade" delay={0.36}>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-lg">
              {copy.primary}
            </Link>
            <Link href={withLocalePath(locale, "/services")} className="btn btn-outline-white btn-lg">
              {copy.secondary}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
