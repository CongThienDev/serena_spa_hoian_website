import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { type Locale, withLocalePath } from "@/lib/i18n";
import { getHomeCopy } from "@/data/content-home";

/**
 * HeroSection — cinematic split layout matching the reference mockup.
 *
 * Layout strategy: full-width section, no outer container.
 * Left panel: uses CSS calc to align with container left edge + its own padding.
 * Right panel: bleeds to right viewport edge for full cinematic impact.
 * Mobile: stacked, image on top with portrait crop.
 */
export default function HeroSection({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).hero;
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "clamp(560px, 82vh, 760px)",
        background: "linear-gradient(90deg, #fbf4ee 0%, #f9efe6 52%, #f7e6d8 100%)",
      }}
      aria-label="Welcome to Serena Spa"
    >
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
        style={{ opacity: 0.28 }}
        aria-hidden="true"
      >
        <svg width="110" height="300" viewBox="0 0 110 300" fill="none">
          <path d="M98 8C62 30 36 58 22 92C8 126 8 176 22 212C36 248 62 270 98 292" stroke="#e8bfa6" strokeWidth="2" />
          <path d="M90 44C60 52 42 74 38 100" stroke="#e8bfa6" strokeWidth="2" />
          <path d="M90 86C56 94 34 118 30 148" stroke="#e8bfa6" strokeWidth="2" />
          <path d="M90 128C56 138 34 164 30 194" stroke="#e8bfa6" strokeWidth="2" />
          <path d="M90 172C58 182 38 204 34 232" stroke="#e8bfa6" strokeWidth="2" />
          <path d="M90 216C62 228 44 244 40 264" stroke="#e8bfa6" strokeWidth="2" />
        </svg>
      </div>

      {/* Full-viewport grid — image bleeds to right edge */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[48fr_52fr] w-full"
        style={{ minHeight: "clamp(560px, 82vh, 760px)" }}
      >
        {/* ── Left — text content ──────────────────────────────────────────── */}
        <div
          className="flex flex-col justify-center py-12 lg:py-20 relative z-10 order-last lg:order-first"
          style={{
            /* Align with container: (100vw - containerMax) / 2 + containerPadding */
            paddingLeft: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingRight: "clamp(1.5rem, 3.2vw, 4rem)",
          }}
        >
          {/* Eyebrow — with lotus ornaments flanking */}
          <AnimatedSection animation="fade" delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              <span
                className="font-sans uppercase tracking-[0.22em] text-[var(--color-terracotta)]"
                style={{ fontSize: "0.8rem" }}
              >
                {copy.eyebrow}
              </span>
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
            </div>
          </AnimatedSection>

          {/* Display heading — uppercase bold, matching reference */}
          <AnimatedSection animation="slide-up-fade" delay={0.18}>
            <h1
              className="font-serif text-[var(--color-espresso)] mt-1"
              style={{
                fontSize: "clamp(2.6rem, 4.9vw, 4.35rem)",
                lineHeight: 1.04,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "-0.012em",
              }}
            >
              {copy.title[0]}<br />
              {copy.title[1]}<br />
              {copy.title[2]}
            </h1>
          </AnimatedSection>

          {/* Lotus ornament divider — matching reference */}
          <AnimatedSection animation="fade" delay={0.28}>
            <div className="flex items-center gap-3 my-5" aria-hidden="true">
              <span
                className="block h-px flex-1 max-w-[60px]"
                style={{ background: "var(--color-terracotta)", opacity: 0.4 }}
              />
              <LotusMarkSmall size={18} color="var(--color-terracotta)" />
              <span
                className="block h-px flex-1 max-w-[60px]"
                style={{ background: "var(--color-terracotta)", opacity: 0.4 }}
              />
            </div>
          </AnimatedSection>

          {/* Tagline */}
          <AnimatedSection animation="slide-up-fade" delay={0.32}>
            <p
              className="font-sans text-[var(--color-espresso-mid)] mb-10"
              style={{ fontSize: "1.05rem", lineHeight: 1.72, maxWidth: "33ch" }}
            >
              {copy.tagline}
            </p>
          </AnimatedSection>

          {/* CTAs — with icons matching reference */}
          <AnimatedSection animation="slide-up-fade" delay={0.42}>
            <div className="flex flex-wrap gap-3">
              {/* Primary: calendar icon */}
              <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-sm flex items-center gap-2 px-6 py-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {copy.ctaPrimary}
              </Link>
              {/* Secondary: lotus leaf icon */}
              <Link
                href={withLocalePath(locale, "/services")}
                className="btn btn-outline btn-sm flex items-center gap-2 px-6 py-3"
              >
                {copy.ctaSecondary}
                <LotusMarkSmall size={16} color="currentColor" />
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Right — spa image bleeds to right viewport edge ─────────────── */}
        <div
          className="relative overflow-hidden order-first lg:order-last"
          style={{
            height: "clamp(300px, 45vw, 760px)",
            minHeight: "300px",
          }}
        >
          <Image
            src="/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg"
            alt="Serena Spa treatment room with multiple massage beds in warm terracotta tones"
            fill
            className="object-cover object-center"
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          {/* Rounded left edge on desktop only */}
          <div
            className="absolute inset-0 hidden lg:block pointer-events-none"
            style={{
              borderRadius: "2.5rem 0 0 2.5rem",
              boxShadow: "inset 0 0 0 1px transparent",
            }}
            aria-hidden="true"
          />

          {/* Left-side gradient blending into text panel */}
          <div
            className="absolute inset-y-0 left-0 w-28 hidden lg:block"
            style={{
              background: "linear-gradient(to right, var(--color-cream-dark), transparent)",
            }}
            aria-hidden="true"
          />

          {/* Subtle warm tint */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(255,245,235,0.04) 0%, rgba(255,214,184,0.09) 100%)" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Bottom section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-cream))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
