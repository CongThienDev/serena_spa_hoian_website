"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import OrnamentDivider from "@/components/ui/OrnamentDivider";
import ServiceCard from "@/components/cards/ServiceCard";
import {
  getAllServicesLocalized,
  getServiceCategories,
} from "@/data/services";
import { type Locale, withLocalePath } from "@/lib/i18n";

/* ─── Category filter pill ──────────────────────────────────────────────── */

type FilterId = "all" | string;

/* ─── Page component ────────────────────────────────────────────────────── */

export default function ServicesPage({ locale = "en" }: { locale?: Locale }) {
  const vi = locale === "vi";
  const searchParams = useSearchParams();
  const ALL_FILTER = { id: "all", label: vi ? "Tất cả dịch vụ" : "All Services" } as const;
  const SERVICE_CATEGORIES = getServiceCategories(locale);
  const localizedServices = getAllServicesLocalized(locale);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const lastAutoScrolledCategory = useRef<string | null>(null);

  const filteredServices =
    activeFilter === "all"
      ? localizedServices
      : localizedServices.filter((s) => s.categoryId === activeFilter);

  const groupedByCategory: Record<string, typeof localizedServices> = {};
  if (activeFilter === "all") {
    for (const category of SERVICE_CATEGORIES) {
      const categoryServices = localizedServices.filter(
        (s) => s.categoryId === category.id,
      );
      if (categoryServices.length > 0) {
        groupedByCategory[category.id] = categoryServices;
      }
    }
  }

  const showGrouped = activeFilter === "all";

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (!categoryParam || activeFilter !== "all") return;
    if (lastAutoScrolledCategory.current === categoryParam) return;

    const validCategory = SERVICE_CATEGORIES.some((cat) => cat.id === categoryParam);
    if (!validCategory) return;

    requestAnimationFrame(() => {
      const target = document.getElementById(`category-${categoryParam}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        lastAutoScrolledCategory.current = categoryParam;
      }
    });
  }, [searchParams, activeFilter, SERVICE_CATEGORIES]);

  return (
    <>
      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "clamp(500px, 70vh, 780px)",
          background:
            "linear-gradient(135deg, var(--color-cream-dark) 0%, var(--color-cream) 55%)",
        }}
        aria-label={vi ? "Liệu trình tại Serena Spa" : "Serena Spa Treatments & Rituals"}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] w-full"
          style={{ minHeight: "clamp(500px, 70vh, 780px)" }}
        >
          {/* Left — text content */}
          <div
            className="flex flex-col justify-center py-16 lg:py-24 relative z-10 order-last lg:order-first"
            style={{
              paddingLeft:
                "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
              paddingRight: "clamp(2rem, 4vw, 5rem)",
            }}
          >
            {/* Eyebrow */}
            <AnimatedSection animation="fade" delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                <span
                  className="font-sans uppercase text-[var(--color-terracotta)]"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                  }}
                >
                  {vi ? "Dịch vụ của Serena" : "Our Services"}
                </span>
                <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              </div>
            </AnimatedSection>

            {/* Heading */}
            <AnimatedSection animation="slide-up-fade" delay={0.18}>
              <h1
                className="font-serif text-[var(--color-espresso)] mt-1"
                style={{
                  fontSize: "clamp(2.4rem, 4.4vw, 4.8rem)",
                  lineHeight: 1.0,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                {vi ? "Liệu trình" : "Treatments"}<br />
                <span style={{ color: "var(--color-terracotta)" }}>
                  {vi ? "& Nghi thức" : "& Rituals"}
                </span>
              </h1>
            </AnimatedSection>

            {/* Ornament divider */}
            <AnimatedSection animation="fade" delay={0.28}>
              <OrnamentDivider className="justify-start my-5" />
            </AnimatedSection>

            {/* Tagline */}
            <AnimatedSection animation="slide-up-fade" delay={0.32}>
              <p
                className="font-sans text-[var(--color-espresso-mid)]"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.78,
                  maxWidth: "38ch",
                  fontStyle: "italic",
                }}
              >
                {vi
                  ? "Mỗi liệu trình là một nghi thức. Mỗi nghi thức là hành trình trở về cân bằng của chính bạn."
                  : "Every treatment is a ritual. Every ritual, a return to yourself. Explore our full collection of massages, facials, body rituals, and couple experiences."}
              </p>
            </AnimatedSection>
          </div>

          {/* Right — spa image bleeds to right edge */}
          <div
            className="relative overflow-hidden order-first lg:order-last"
            style={{
              height: "clamp(280px, 40vw, 780px)",
              minHeight: "280px",
            }}
          >
            <Image
              src="/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg"
              alt="Serena Spa Hội An — grand four-bed treatment room with warm timber and linen"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Rounded left edge — desktop only */}
            <div
              className="absolute inset-0 hidden lg:block pointer-events-none"
              style={{ borderRadius: "2.5rem 0 0 2.5rem" }}
              aria-hidden="true"
            />

            {/* Left-side gradient blending into text panel */}
            <div
              className="absolute inset-y-0 left-0 w-28 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, var(--color-cream-dark), transparent)",
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

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-cream))",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── Category Filter Strip ─────────────────────────────────────────── */}
      <section
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "var(--color-cream)",
          borderColor: "var(--color-sand)",
          boxShadow: "0 2px 16px rgba(61,31,15,0.06)",
        }}
        aria-label={vi ? "Lọc dịch vụ theo danh mục" : "Filter treatments by category"}
      >
        <div className="container-site">
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
            {/* "All" pill */}
            <FilterPill
              label={ALL_FILTER.label}
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            {/* Category pills */}
            {SERVICE_CATEGORIES.map((cat) => (
              <FilterPill
                key={cat.id}
                label={cat.label}
                active={activeFilter === cat.id}
                onClick={() => setActiveFilter(cat.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────────── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-cream)" }}
        aria-label={vi ? "Tất cả liệu trình" : "All treatments"}
      >
        <div className="container-site">
          {showGrouped ? (
            /* Grouped view — "All" selected */
            <div className="flex flex-col gap-16">
              {SERVICE_CATEGORIES.filter(
                (cat) => groupedByCategory[cat.id]?.length,
              ).map((category, catIdx) => (
                <div
                  key={category.id}
                  id={`category-${category.id}`}
                  style={{ scrollMarginTop: "7rem" }}
                >
                  {/* Category label heading */}
                  <AnimatedSection animation="fade" delay={catIdx * 0.05}>
                    <div className="flex items-center gap-3 mb-6">
                      <LotusMarkSmall
                        size={14}
                        color="var(--color-terracotta)"
                      />
                      <span
                        className="font-sans uppercase text-[var(--color-terracotta)]"
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          letterSpacing: "0.22em",
                        }}
                      >
                        {category.label}
                      </span>
                      <span
                        className="flex-1 h-px"
                        style={{
                          background:
                            "linear-gradient(to right, var(--color-sand), transparent)",
                        }}
                      />
                    </div>
                  </AnimatedSection>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {groupedByCategory[category.id]!.map((service, i) => (
                      <AnimatedSection
                        key={service.id}
                        animation="slide-up-fade"
                        delay={catIdx * 0.04 + i * 0.06}
                      >
                        <ServiceCard service={service} className="h-full" locale={locale} />
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Filtered view — single category */
            <AnimatedSection animation="fade">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service, i) => (
                  <AnimatedSection
                    key={service.id}
                    animation="slide-up-fade"
                    delay={i * 0.07}
                  >
                    <ServiceCard service={service} className="h-full" locale={locale} />
                  </AnimatedSection>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <p
                  className="text-center font-sans text-[var(--color-warm-gray)] py-16"
                  style={{ fontSize: "1rem" }}
                >
                  {vi ? "Không có dịch vụ trong danh mục này." : "No treatments found in this category."}
                </p>
              )}
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── Booking CTA Strip ─────────────────────────────────────────────── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-sand)" }}
        aria-label={vi ? "Đặt liệu trình" : "Book your treatment"}
      >
        <div className="container-site">
          <AnimatedSection animation="slide-up-fade">
            <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
              {/* Lotus ornament */}
              <LotusMarkSmall size={28} color="var(--color-terracotta)" />

              {/* Eyebrow */}
              <span
                className="font-sans uppercase text-[var(--color-terracotta)]"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                }}
              >
                {vi ? "Bắt đầu hôm nay" : "Begin Today"}
              </span>

              {/* Heading */}
              <h2
                className="font-serif text-[var(--color-espresso)]"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                }}
              >
                {vi ? "Sẵn sàng bắt đầu hành trình?" : "Ready to Begin Your Journey?"}
              </h2>

              {/* Tagline */}
              <p
                className="font-sans text-[var(--color-espresso-mid)]"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                {vi ? "Hỗ trợ đặt lịch trong ngày · Hội An, Việt Nam" : "Same-day bookings welcome · Hội An, Vietnam"}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-lg">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  {vi ? "Đặt lịch ngay" : "Book Now"}
                </Link>

                <a
                  href="https://wa.me/84xxxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

/* ── Filter Pill sub-component ──────────────────────────────────────────── */

type FilterPillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 font-sans font-semibold uppercase transition-all duration-200"
      style={{
        fontSize: "0.72rem",
        letterSpacing: "0.12em",
        padding: "0.45rem 1.2rem",
        borderRadius: "9999px",
        border: `1.5px solid ${active ? "var(--color-terracotta)" : "var(--color-sand-dark)"}`,
        backgroundColor: active
          ? "var(--color-terracotta)"
          : "transparent",
        color: active ? "white" : "var(--color-espresso-mid)",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
