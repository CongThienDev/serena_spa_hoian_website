import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import OrnamentDivider from "@/components/ui/OrnamentDivider";
import { getFeaturedTestimonials } from "@/data/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill={i < rating ? "var(--color-terracotta)" : "none"}
          stroke="var(--color-terracotta)"
          strokeWidth={1}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const sourceLabel: Record<string, string> = {
  google: "Google Review",
  tripadvisor: "TripAdvisor",
  booking: "Booking.com",
  direct: "Guest",
};

/**
 * TestimonialsSection — 3-column testimonial cards.
 * Warm sand background to contrast cream above and below.
 */
export default function TestimonialsSection() {
  const testimonials = getFeaturedTestimonials(3);

  return (
    <section
      className="section-padding section-round-top"
      style={{ backgroundColor: "var(--color-section-warm)" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-site">
        <AnimatedSection animation="slide-up-fade" className="mb-14">
          <SectionHeading
            eyebrow="Guest Stories"
            title="What Our Guests Say"
            align="center"
          />
          <OrnamentDivider className="mt-2" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} animation="slide-up-fade" delay={i * 0.1}>
              <blockquote
                className="flex flex-col gap-5 p-7 rounded-[var(--radius-card)] h-full"
                style={{
                  backgroundColor: "var(--color-warm-white)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Stars + source */}
                <div className="flex items-center justify-between">
                  <StarRating rating={t.rating} />
                  <span
                    className="font-sans text-[var(--color-warm-gray)]"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
                  >
                    {sourceLabel[t.source] ?? t.source}
                  </span>
                </div>

                {/* Quote text */}
                <p
                  className="font-serif text-[var(--color-espresso)] flex-1 italic"
                  style={{ fontSize: "1.05rem", lineHeight: 1.72, fontWeight: 400 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Guest info */}
                <footer className="flex items-center gap-3 pt-4 border-t border-[var(--color-sand)]">
                  {/* Avatar placeholder */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-serif font-medium text-white"
                    style={{
                      backgroundColor: "var(--color-terracotta)",
                      fontSize: "0.95rem",
                    }}
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite
                      className="font-sans font-semibold text-[var(--color-espresso)] not-italic"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {t.name}
                    </cite>
                    <p
                      className="font-sans text-[var(--color-warm-gray)]"
                      style={{ fontSize: "0.76rem" }}
                    >
                      {t.country} · {t.service}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
