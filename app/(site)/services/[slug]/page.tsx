import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import OrnamentDivider from "@/components/ui/OrnamentDivider";
import ServiceCard from "@/components/cards/ServiceCard";
import {
  SERVICES,
  getServiceBySlugLocalized,
  getServicesByCategoryLocalized,
  getServiceCategories,
} from "@/data/services";
import { type Locale, withLocalePath } from "@/lib/i18n";

/* ─── Static params ─────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

/* ─── Metadata ──────────────────────────────────────────────────────────── */

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlugLocalized(slug, "en");
  if (!service) return {};

  const title =
    service.seoTitle ?? `${service.name} — Serena Spa Hội An`;
  const description =
    service.seoDescription ??
    `${service.description.slice(0, 155)}…`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://serenaretreat.com/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://serenaretreat.com/services/${slug}`,
      type: "website",
      images: [
        {
          url: `https://serenaretreat.com${service.image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://serenaretreat.com${service.image}`],
    },
  };
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default async function ServiceDetailPage({
  params,
  locale = "en",
}: Props & { locale?: Locale }) {
  const vi = locale === "vi";
  const { slug } = await params;
  const service = getServiceBySlugLocalized(slug, locale);
  if (!service) notFound();

  const category = getServiceCategories(locale).find(
    (c) => c.id === service.categoryId,
  );

  const relatedServices = getServicesByCategoryLocalized(service.categoryId, locale)
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

  const hasGallery = service.gallery && service.gallery.length > 0;
  const hasBenefits = service.benefits && service.benefits.length > 0;
  const hasIncludes = service.includes && service.includes.length > 0;

  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav
        className="container-site pt-5 pb-2"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link
              href={withLocalePath(locale, "/")}
              className="font-sans transition-colors duration-200 hover:text-[var(--color-terracotta)]"
              style={{
                fontSize: "0.8rem",
                color: "var(--color-warm-gray)",
              }}
            >
              {vi ? "Trang chủ" : "Home"}
            </Link>
          </li>
          <li
            style={{ color: "var(--color-warm-gray-light)", fontSize: "0.8rem" }}
            aria-hidden="true"
          >
            /
          </li>
          <li>
            <Link
              href={withLocalePath(locale, "/services")}
              className="font-sans transition-colors duration-200 hover:text-[var(--color-terracotta)]"
              style={{
                fontSize: "0.8rem",
                color: "var(--color-warm-gray)",
              }}
            >
              {vi ? "Dịch vụ" : "Services"}
            </Link>
          </li>
          <li
            style={{ color: "var(--color-warm-gray-light)", fontSize: "0.8rem" }}
            aria-hidden="true"
          >
            /
          </li>
          <li
            className="font-sans font-medium"
            style={{
              fontSize: "0.8rem",
              color: "var(--color-espresso)",
            }}
            aria-current="page"
          >
            {service.name}
          </li>
        </ol>
      </nav>

      {/* ── Service Hero Split ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "clamp(580px, 85vh, 900px)",
          background:
            "linear-gradient(135deg, var(--color-cream-dark) 0%, var(--color-cream) 55%)",
        }}
        aria-label={`${service.name} treatment details`}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] w-full"
          style={{ minHeight: "clamp(580px, 85vh, 900px)" }}
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
            {/* Eyebrow — category label */}
            <AnimatedSection animation="fade" delay={0.08}>
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
                  {category?.label ?? (vi ? "Liệu trình" : "Treatment")}
                </span>
                <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              </div>
            </AnimatedSection>

            {/* H1 — service name */}
            <AnimatedSection animation="slide-up-fade" delay={0.16}>
              <h1
                className="font-serif text-[var(--color-espresso)] mt-1"
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 4.4rem)",
                  lineHeight: 1.0,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                {service.name}
              </h1>
            </AnimatedSection>

            {/* Tagline */}
            <AnimatedSection animation="fade" delay={0.22}>
              <p
                className="font-serif text-[var(--color-espresso-mid)] mt-3"
                style={{
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                {service.tagline}
              </p>
            </AnimatedSection>

            {/* Lotus ornament divider */}
            <AnimatedSection animation="fade" delay={0.28}>
              <OrnamentDivider className="justify-start my-5" />
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection animation="slide-up-fade" delay={0.32}>
              <p
                className="font-sans text-[var(--color-espresso-mid)] mb-6"
                style={{
                  fontSize: "0.975rem",
                  lineHeight: 1.78,
                  maxWidth: "42ch",
                }}
              >
                {service.description}
              </p>
            </AnimatedSection>

            {/* Duration pills */}
            <AnimatedSection animation="fade" delay={0.38}>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <svg
                  className="w-4 h-4 text-[var(--color-warm-gray)] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {service.duration.map((mins) => (
                  <span
                    key={mins}
                    className="font-sans font-semibold"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      padding: "0.3rem 0.9rem",
                      borderRadius: "9999px",
                      border: "1.5px solid var(--color-sand-dark)",
                      color: "var(--color-espresso-mid)",
                      backgroundColor: "var(--color-cream)",
                    }}
                  >
                    {mins} {vi ? "phút" : "mins"}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            {/* Price block */}
            {service.priceVND != null && (
              <AnimatedSection animation="fade" delay={0.42}>
                <div className="mb-7">
                  <p
                    className="font-serif font-semibold"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "var(--color-terracotta)",
                      lineHeight: 1.1,
                    }}
                  >
                    {vi ? "Từ" : "From"} {service.priceVND.toLocaleString("vi-VN")} VND
                  </p>
                  <p
                    className="font-sans mt-1"
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-warm-gray)",
                    }}
                  >
                    (${service.price} USD)
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* CTAs */}
            <AnimatedSection animation="slide-up-fade" delay={0.48}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`${withLocalePath(locale, "/booking")}?add=${service.slug}`}
                  className="btn btn-primary btn-lg flex items-center gap-2"
                >
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
                  {vi ? "Đặt liệu trình này" : "Book This Treatment"}
                </Link>
                <a
                  href="#details"
                  className="btn btn-outline btn-lg"
                >
                  {vi ? "Xem thêm ↓" : "Learn More ↓"}
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — service image bleeds to right edge */}
          <div
            className="relative overflow-hidden order-first lg:order-last"
            style={{
              height: "clamp(280px, 45vw, 900px)",
              minHeight: "280px",
            }}
          >
            <Image
              src={service.image}
              alt={`${service.name} treatment at Serena Spa Hội An`}
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

            {/* Left-side gradient */}
            <div
              className="absolute inset-y-0 left-0 w-28 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, var(--color-cream-dark), transparent)",
              }}
              aria-hidden="true"
            />

            {/* Signature badge */}
            {service.isSignature && (
              <div
                className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-white font-sans font-semibold uppercase"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  backgroundColor: "var(--color-terracotta)",
                  boxShadow: "0 4px 16px rgba(200,116,90,0.45)",
                }}
              >
                {vi ? "Liệu trình đặc trưng" : "Signature Treatment"}
              </div>
            )}
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

      {/* ── Details anchor ─────────────────────────────────────────────── */}
      <div id="details" />

      {/* ── Benefits Section ──────────────────────────────────────────── */}
      {hasBenefits && (
        <section
          className="section-padding"
          style={{ backgroundColor: "var(--color-sand)" }}
          aria-label="Treatment benefits"
        >
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left — heading */}
              <AnimatedSection animation="slide-up-fade">
                <div>
                  <div className="flex items-center gap-2 mb-3">
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
                      {vi ? "Trải nghiệm" : "The Experience"}
                    </span>
                  </div>
                  <OrnamentDivider className="justify-start mb-4" />
                  <h2
                    className="font-serif text-[var(--color-espresso)]"
                    style={{
                      fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
                      fontWeight: 500,
                      lineHeight: 1.12,
                    }}
                  >
                    {vi ? "Bạn sẽ cảm nhận" : "What You'll Feel"}
                  </h2>
                  <p
                    className="font-sans text-[var(--color-espresso-mid)] mt-4"
                    style={{
                      fontSize: "0.975rem",
                      lineHeight: 1.75,
                      maxWidth: "36ch",
                    }}
                  >
                    {vi
                      ? "Mỗi liệu trình được thiết kế để phục hồi cân bằng ở mọi cấp độ: cơ thể, tâm trí và tinh thần."
                      : "Each treatment is designed to restore balance on every level — body, mind, and spirit."}
                  </p>
                </div>
              </AnimatedSection>

              {/* Right — numbered benefits list */}
              <AnimatedSection animation="slide-up-fade" delay={0.12}>
                <ol className="flex flex-col gap-5">
                  {service.benefits!.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4">
                      {/* Number circle */}
                      <span
                        className="flex-shrink-0 flex items-center justify-center rounded-full font-sans font-bold text-white"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          minWidth: "2rem",
                          backgroundColor: "var(--color-terracotta)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.04em",
                        }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className="font-sans text-[var(--color-espresso)] pt-1"
                        style={{ fontSize: "0.975rem", lineHeight: 1.6 }}
                      >
                        {benefit}
                      </p>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* ── What's Included ───────────────────────────────────────────── */}
      {hasIncludes && (
        <section
          className="section-padding"
          style={{ backgroundColor: "var(--color-cream)" }}
          aria-label="What's included in this treatment"
        >
          <div className="container-site">
            {/* Section heading */}
            <AnimatedSection animation="slide-up-fade">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                  <span
                    className="font-sans uppercase text-[var(--color-terracotta)]"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                    }}
                  >
                    {vi ? "Mỗi lần trải nghiệm" : "Every Visit"}
                  </span>
                  <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                </div>
                <OrnamentDivider className="mb-4" />
                <h2
                  className="font-serif text-[var(--color-espresso)]"
                  style={{
                    fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
                    fontWeight: 500,
                    lineHeight: 1.12,
                  }}
                >
                  {vi ? "Liệu trình bao gồm" : "What's Included"}
                </h2>
              </div>
            </AnimatedSection>

            {/* Includes grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {service.includes!.map((item, i) => (
                <AnimatedSection
                  key={i}
                  animation="slide-up-fade"
                  delay={i * 0.06}
                >
                  <div className="flex items-center gap-3 py-3 px-4 rounded-xl"
                    style={{ backgroundColor: "var(--color-cream-dark)" }}
                  >
                    {/* Checkmark circle */}
                    <span
                      className="flex-shrink-0 flex items-center justify-center rounded-full text-white"
                      style={{
                        width: "1.75rem",
                        height: "1.75rem",
                        minWidth: "1.75rem",
                        backgroundColor: "var(--color-terracotta)",
                        fontSize: "0.8rem",
                      }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <p
                      className="font-sans text-[var(--color-espresso)]"
                      style={{ fontSize: "0.925rem", lineHeight: 1.5 }}
                    >
                      {item}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery Strip ─────────────────────────────────────────────── */}
      {hasGallery && (
        <section
          className="section-padding"
          style={{ backgroundColor: "var(--color-section-warm)" }}
          aria-label="Treatment room gallery"
        >
          <div className="container-site">
            {/* Section heading */}
            <AnimatedSection animation="slide-up-fade">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                  <span
                    className="font-sans uppercase text-[var(--color-terracotta)]"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                    }}
                  >
                    {vi ? "Không gian Serena" : "Our Space"}
                  </span>
                  <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                </div>
                <h2
                  className="font-serif text-[var(--color-espresso)]"
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
                    fontWeight: 500,
                    lineHeight: 1.15,
                  }}
                >
                  {vi ? "Bên trong phòng trị liệu" : "Inside the Room"}
                </h2>
              </div>
            </AnimatedSection>

            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.gallery!.map((imgSrc, i) => (
                <AnimatedSection
                  key={i}
                  animation="scale-fade"
                  delay={i * 0.08}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src={imgSrc}
                      alt={`${service.name} gallery image ${i + 1} at Serena Spa Hội An`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Services ──────────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section
          className="section-padding"
          style={{ backgroundColor: "var(--color-cream)" }}
          aria-label="Related treatments"
        >
          <div className="container-site">
            {/* Section heading */}
            <AnimatedSection animation="slide-up-fade">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                  <span
                    className="font-sans uppercase text-[var(--color-terracotta)]"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                    }}
                  >
                    {vi ? "Tiếp tục hành trình" : "Continue Your Journey"}
                  </span>
                  <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                </div>
                <OrnamentDivider className="mb-4" />
                <h2
                  className="font-serif text-[var(--color-espresso)]"
                  style={{
                    fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
                    fontWeight: 500,
                    lineHeight: 1.12,
                  }}
                >
                  {vi ? "Có thể bạn cũng thích" : "You May Also Love"}
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related, i) => (
                <AnimatedSection
                  key={related.id}
                  animation="slide-up-fade"
                  delay={i * 0.08}
                >
                  <ServiceCard service={related} className="h-full" locale={locale} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Booking CTA ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "clamp(360px, 48vh, 520px)" }}
        aria-label="Book this treatment"
      >
        {/* Background spa image */}
        <Image
          src="/images/serena_image/z7863130063966_02bca12b005872be63d6ed4054b0cad4.jpg"
          alt="Serena Spa Hội An — warm welcoming reception"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Espresso + terracotta tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(61,31,15,0.90) 0%, rgba(168,92,68,0.70) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative container-site flex flex-col items-center justify-center text-center h-full py-20 md:py-28 gap-5">
          <AnimatedSection animation="scale-fade">
            <LotusMarkSmall size={32} color="var(--color-peach-light)" />
          </AnimatedSection>

          <AnimatedSection animation="fade" delay={0.1}>
            <span
              className="font-sans font-semibold uppercase text-[var(--color-peach-light)]"
              style={{ fontSize: "0.72rem", letterSpacing: "0.22em" }}
            >
              {vi ? "Không gian chữa lành đang chờ bạn" : "Your Sanctuary Awaits"}
            </span>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.18}>
            <h2
              className="font-serif text-white max-w-2xl"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 500,
                lineHeight: 1.1,
              }}
            >
              {vi ? "Đặt liệu trình này ngay hôm nay" : "Reserve This Treatment Today"}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade" delay={0.26}>
            <p
              className="font-sans text-[var(--color-sand)] max-w-md"
              style={{ fontSize: "0.975rem", lineHeight: 1.75 }}
            >
              {vi
                ? "Serena hỗ trợ đặt lịch trong ngày. Liên hệ trực tuyến hoặc qua WhatsApp để xác nhận nhanh."
                : "Same-day bookings warmly welcomed. Connect with us online or via WhatsApp for instant confirmation."}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.34}>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Link href={`${withLocalePath(locale, "/booking")}?add=${service.slug}`} className="btn btn-primary btn-lg">
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
                href="https://wa.me/84935011151"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-lg"
              >
                {vi ? "Nhắn WhatsApp" : "WhatsApp Us"}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
