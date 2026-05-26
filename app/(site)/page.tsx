import type { Metadata } from "next";
import { generatePageMetadata, getLocalBusinessSchema } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Serena Spa Hội An — Premium Wellness & Massage",
  description:
    "Discover premium wellness treatments, signature massages, and holistic healing at Serena Spa in Hội An. Book your sanctuary experience today.",
  path: "/",
  keywords: ["best spa in hoi an", "massage hoi an", "wellness sanctuary"],
});

/**
 * Homepage — Phase 2 will build all sections.
 * Placeholder renders the design system to verify setup is correct.
 */
export default function HomePage() {
  const schema = getLocalBusinessSchema();

  return (
    <>
      {/* LocalBusiness + Spa JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Temporary placeholder — replaced in Phase 2 ── */}
      <section
        className="section-padding container-site flex flex-col items-center justify-center text-center gap-8 min-h-[70vh]"
        style={{ paddingBottom: "80px" }}
      >
        <span className="eyebrow">A Place to Glow</span>

        <h1 className="font-serif text-h1 max-w-3xl">
          Premium Relaxation &amp; Healing
        </h1>

        <span className="divider divider-center" aria-hidden="true" />

        <p className="prose-spa text-center">
          Serena Spa Hội An — where ancient Vietnamese wellness traditions meet
          modern luxury. Foundation is built. Homepage coming next.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/booking" className="btn btn-primary btn-lg">
            Book Your Escape
          </a>
          <a href="/services" className="btn btn-outline btn-lg">
            Explore Services
          </a>
        </div>

        {/* Design system tokens preview */}
        <div
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg"
          aria-hidden="true"
        >
          {[
            { label: "Terracotta", bg: "bg-[var(--color-terracotta)]", text: "text-white" },
            { label: "Peach",      bg: "bg-[var(--color-peach)]",      text: "text-[var(--color-espresso)]" },
            { label: "Cream",      bg: "bg-[var(--color-cream-dark)]", text: "text-[var(--color-espresso)]" },
            { label: "Espresso",   bg: "bg-[var(--color-espresso)]",   text: "text-white" },
          ].map(({ label, bg, text }) => (
            <div
              key={label}
              className={`${bg} ${text} rounded-xl py-4 text-xs font-medium tracking-widest uppercase`}
            >
              {label}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
