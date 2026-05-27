import AnimatedSection from "@/components/ui/AnimatedSection";
import { type Locale } from "@/lib/i18n";
import { getHomeCopy } from "@/data/content-home";

type Pillar = {
  icon: React.ReactNode;
  title?: string;
  description?: string;
};

const pillars: Pillar[] = [
  {
    title: "Holistic Wellness",
    description: "Mind, body and spirit aligned through ancient and modern healing arts.",
    icon: (
      /* Lotus / wellness icon */
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="28" r="4" fill="var(--color-terracotta)" opacity="0.9" />
        <path d="M24 24 C21 17, 16 12, 24 6 C32 12, 27 17, 24 24Z" fill="var(--color-terracotta)" opacity="0.8" />
        <path d="M27 26 C32 20, 38 19, 40 25 C36 31, 29 29, 27 26Z" fill="var(--color-terracotta)" opacity="0.65" />
        <path d="M26 31 C31 29, 36 31, 35 37 C30 40, 26 35, 26 31Z" fill="var(--color-terracotta)" opacity="0.55" />
        <path d="M24 34 C21 41, 16 44, 24 47 C32 44, 27 41, 24 34Z" fill="var(--color-terracotta)" opacity="0.6" />
        <path d="M22 31 C17 35, 12 40, 13 37 C12 31, 18 29, 22 31Z" fill="var(--color-terracotta)" opacity="0.55" />
        <path d="M21 26 C15 29, 8 31, 8 25 C10 19, 16 20, 21 26Z" fill="var(--color-terracotta)" opacity="0.65" />
      </svg>
    ),
  },
  {
    title: "Natural Healing",
    description: "Pure botanical ingredients and traditional herbal compresses for deep renewal.",
    icon: (
      /* Leaf / herb icon */
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path
          d="M24 42 C24 42, 10 32, 10 20 C10 13, 16 8, 24 8 C32 8, 38 13, 38 20 C38 32, 24 42, 24 42Z"
          fill="var(--color-terracotta)"
          opacity="0.2"
          stroke="var(--color-terracotta)"
          strokeWidth="1.5"
        />
        <path
          d="M24 42 L24 16"
          stroke="var(--color-terracotta)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24 28 C20 24, 14 22, 14 22"
          stroke="var(--color-terracotta)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M24 22 C28 18, 34 16, 34 16"
          stroke="var(--color-terracotta)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    ),
  },
  {
    title: "Inner Calm",
    description: "Sensory rituals crafted to quiet the mind and restore your natural balance.",
    icon: (
      /* Infinity/calm icon */
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle
          cx="24" cy="24" r="14"
          stroke="var(--color-terracotta)"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <circle
          cx="24" cy="24" r="9"
          stroke="var(--color-terracotta)"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle
          cx="24" cy="24" r="4"
          fill="var(--color-terracotta)"
          opacity="0.85"
        />
        {/* Small accent dots */}
        <circle cx="24" cy="8" r="1.5" fill="var(--color-terracotta)" opacity="0.4" />
        <circle cx="38" cy="16" r="1.5" fill="var(--color-terracotta)" opacity="0.4" />
        <circle cx="38" cy="32" r="1.5" fill="var(--color-terracotta)" opacity="0.4" />
        <circle cx="24" cy="40" r="1.5" fill="var(--color-terracotta)" opacity="0.4" />
        <circle cx="10" cy="32" r="1.5" fill="var(--color-terracotta)" opacity="0.4" />
        <circle cx="10" cy="16" r="1.5" fill="var(--color-terracotta)" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Sustainable & Ethical",
    description: "Premium organic products with zero-waste rituals, aligned with the earth.",
    icon: (
      /* Hands / ethical icon */
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path
          d="M24 8 L26 16 L34 16 L28 22 L30 30 L24 26 L18 30 L20 22 L14 16 L22 16 Z"
          fill="var(--color-terracotta)"
          opacity="0.2"
          stroke="var(--color-terracotta)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 8 L26 16 L34 16 L28 22 L30 30 L24 26 L18 30 L20 22 L14 16 L22 16 Z"
          fill="var(--color-terracotta)"
          opacity="0.75"
          clipPath="url(#half)"
        />
        <defs>
          <clipPath id="half">
            <rect x="14" y="8" width="10" height="22" />
          </clipPath>
        </defs>
        <circle cx="24" cy="38" r="3" fill="var(--color-terracotta)" opacity="0.5" />
        <path
          d="M20 34 C20 36, 21 38, 24 38 C27 38, 28 36, 28 34"
          stroke="var(--color-terracotta)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.6"
        />
      </svg>
    ),
  },
];

/**
 * FeatureStrip — 4 brand pillars inside a floating white rounded card.
 * Matches the reference: card lifts above the hero, strong box-shadow.
 */
export default function FeatureStrip({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).features;
  return (
    <section
      className="relative z-10"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-label={copy.sectionAria}
    >
      {/* Floating card container — overlaps hero bottom */}
      <div className="container-site">
        <AnimatedSection animation="slide-up-fade" delay={0}>
          <div
            className="rounded-[1.5rem] py-10 md:py-12 px-6 md:px-8 -mt-12 md:-mt-16 relative"
            style={{
              backgroundColor: "var(--color-warm-white)",
              boxShadow: "0 8px 40px rgba(61,31,15,0.10), 0 2px 8px rgba(61,31,15,0.06)",
            }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:gap-x-0 lg:divide-x lg:divide-[var(--color-sand)]">
              {pillars.map((pillar, i) => (
                (() => {
                  const item = copy.items[i] ?? copy.items[0];
                  return (
                <AnimatedSection
                  key={`${item?.title ?? "pillar"}-${i}`}
                  animation="slide-up-fade"
                  delay={0.06 + i * 0.08}
                  className="flex flex-col items-center text-center px-4 lg:px-8 gap-4"
                >
                  {/* Icon circle */}
                  <div
                    className="w-[64px] h-[64px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-cream-dark)" }}
                  >
                    {pillar.icon}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3
                      className="font-sans font-semibold text-[var(--color-espresso)] tracking-wide uppercase"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}
                    >
                      {item?.title ?? ""}
                    </h3>
                    <p
                      className="font-sans text-[var(--color-warm-gray)]"
                      style={{ fontSize: "0.82rem", lineHeight: 1.65 }}
                    >
                      {item?.description ?? ""}
                    </p>
                  </div>
                </AnimatedSection>
                  );
                })()
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
