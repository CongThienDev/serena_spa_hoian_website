import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const reasons = [
  {
    title: "Professional Therapists",
    description: "Trained and certified wellness practitioners with years of hands-on expertise.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="20" cy="12" r="5" stroke="var(--color-terracotta)" strokeWidth="1.5" />
        <path d="M10 30 C10 24, 14 20, 20 20 C26 20, 30 24, 30 30" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 18 L28 22 L36 14" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Premium Products",
    description: "Curated organic and botanical skincare — selected for purity, performance and scent.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M12 28 C12 20, 16 14, 20 10 C24 14, 28 20, 28 28 C28 33, 24 36, 20 36 C16 36, 12 33, 12 28Z" stroke="var(--color-terracotta)" strokeWidth="1.5" />
        <path d="M20 10 L20 4" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 28 C16 24, 18 21, 20 20" stroke="var(--color-terracotta)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Private & Peaceful Space",
    description: "Intimate treatment suites designed for complete privacy, quiet and deep restoration.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="8" y="16" width="24" height="18" rx="3" stroke="var(--color-terracotta)" strokeWidth="1.5" />
        <path d="M14 16 L14 12 C14 8, 26 8, 26 12 L26 16" stroke="var(--color-terracotta)" strokeWidth="1.5" />
        <circle cx="20" cy="25" r="2.5" fill="var(--color-terracotta)" opacity="0.75" />
      </svg>
    ),
  },
  {
    title: "Best Price Guarantee",
    description: "Exceptional luxury at honest value — no hidden charges, no surprises.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="20" cy="20" r="13" stroke="var(--color-terracotta)" strokeWidth="1.5" />
        <path d="M16 20 L19 23 L25 17" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10 L20 7M20 33 L20 30M10 20 L7 20M33 20 L30 20" stroke="var(--color-terracotta)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

/**
 * WhyChooseUs — 4 trust pillars, warm alternate background.
 * Matches the "PROFESSIONAL THERAPISTS / PREMIUM PRODUCTS" trust strip in the reference.
 */
export default function WhyChooseUs() {
  return (
    <section
      className="section-padding section-round-top"
      style={{ backgroundColor: "var(--color-section-warm)" }}
      aria-labelledby="why-choose-heading"
    >
      <div className="container-site">
        <AnimatedSection animation="slide-up-fade">
          <SectionHeading
            eyebrow="Why Serena"
            title="Why Guests Choose Us"
            subtitle="From your first breath in our space to your final sip of herbal tea, every detail is designed around you."
            align="center"
            className="mb-14"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <AnimatedSection key={reason.title} animation="slide-up-fade" delay={i * 0.07}>
              <div
                className="flex flex-col items-center text-center gap-4 rounded-[var(--radius-card)] p-7"
                style={{
                  backgroundColor: "var(--color-warm-white)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--color-cream-dark)" }}
                >
                  {reason.icon}
                </div>

                <h3
                  className="font-sans font-semibold text-[var(--color-espresso)] uppercase tracking-widest"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.14em" }}
                >
                  {reason.title}
                </h3>

                <p
                  className="font-sans text-[var(--color-warm-gray)]"
                  style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
                >
                  {reason.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
