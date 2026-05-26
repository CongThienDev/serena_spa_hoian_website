import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";

/**
 * HeroSection — cinematic split layout matching the reference mockup.
 *
 * Layout strategy: full-width section, no outer container.
 * Left panel: uses CSS calc to align with container left edge + its own padding.
 * Right panel: bleeds to right viewport edge for full cinematic impact.
 * Mobile: stacked, image on top with portrait crop.
 */
export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "clamp(580px, 90vh, 960px)",
        background: "linear-gradient(135deg, var(--color-cream-dark) 0%, var(--color-cream) 55%)",
      }}
      aria-label="Welcome to Serena Spa"
    >
      {/* Full-viewport grid — image bleeds to right edge */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] w-full"
        style={{ minHeight: "clamp(580px, 90vh, 960px)" }}
      >
        {/* ── Left — text content ──────────────────────────────────────────── */}
        <div
          className="flex flex-col justify-center py-16 lg:py-28 relative z-10 order-last lg:order-first"
          style={{
            /* Align with container: (100vw - containerMax) / 2 + containerPadding */
            paddingLeft: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingRight: "clamp(2rem, 4vw, 5rem)",
          }}
        >
          {/* Eyebrow — with lotus ornaments flanking */}
          <AnimatedSection animation="fade" delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              <span
                className="font-sans uppercase tracking-[0.22em] text-[var(--color-terracotta)]"
                style={{ fontSize: "0.72rem" }}
              >
                A Place to Glow
              </span>
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
            </div>
          </AnimatedSection>

          {/* Display heading — uppercase bold, matching reference */}
          <AnimatedSection animation="slide-up-fade" delay={0.18}>
            <h1
              className="font-serif text-[var(--color-espresso)] mt-1"
              style={{
                fontSize: "clamp(2.6rem, 4.8vw, 5.2rem)",
                lineHeight: 1.0,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              Premium<br />
              Relaxation<br />
              <span style={{ color: "var(--color-terracotta)" }}>
                &amp; Healing
              </span>
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
              style={{ fontSize: "1.0rem", lineHeight: 1.78, maxWidth: "36ch" }}
            >
              Awaken your energy, release your stress and let your natural glow shine.
            </p>
          </AnimatedSection>

          {/* CTAs — with icons matching reference */}
          <AnimatedSection animation="slide-up-fade" delay={0.42}>
            <div className="flex flex-wrap gap-3">
              {/* Primary: calendar icon */}
              <Link href="/booking" className="btn btn-primary btn-lg flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Book Your Escape
              </Link>
              {/* Secondary: lotus leaf icon */}
              <Link
                href="/services"
                className="btn btn-outline btn-lg flex items-center gap-2"
              >
                Explore Services
                <LotusMarkSmall size={16} color="currentColor" />
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Right — spa image bleeds to right viewport edge ─────────────── */}
        <div
          className="relative overflow-hidden order-first lg:order-last"
          style={{
            height: "clamp(300px, 45vw, 960px)",
            minHeight: "300px",
          }}
        >
          <Image
            src="/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg"
            alt="Serena Spa Hội An — Luxury couple treatment room with walnut paneling and white linen beds"
            fill
            className="object-cover object-center"
            priority
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
            style={{ background: "rgba(253, 238, 222, 0.06)" }}
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
