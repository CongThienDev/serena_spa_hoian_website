import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import type { Service } from "@/data/services";
import { type Locale, withLocalePath } from "@/lib/i18n";

type ServiceCardProps = {
  service: Service;
  className?: string;
  locale?: Locale;
};

/**
 * ServiceCard — luxury portrait-format card matching the reference.
 * Image fills top ~62%, warm card bg, serif name, price + duration below.
 * Hover: image zoom, warm shadow lift, "Book Now" link reveal.
 */
export default function ServiceCard({ service, className, locale = "en" }: ServiceCardProps) {
  const minDuration = service.duration[0] ?? 60;
  const maxDuration = service.duration[service.duration.length - 1] ?? 60;
  // Reference format: "60 / 90 mins" or "60 mins"
  const durationLabel =
    service.duration.length > 1
      ? `${minDuration} / ${maxDuration} ${locale === "vi" ? "phút" : "mins"}`
      : `${minDuration} ${locale === "vi" ? "phút" : "mins"}`;

  // Show VND price if available, else USD
  const priceLabel = service.priceVND
    ? `${locale === "vi" ? "Từ" : "From"} ${service.priceVND.toLocaleString("vi-VN")} VND`
    : formatPrice(service.price);

  return (
    <Link
      href={withLocalePath(locale, `/services/${service.slug}`)}
      className={cn("group block", className)}
      aria-label={`${service.name} — ${durationLabel} from $${service.price}`}
    >
      <article
        className="card overflow-hidden h-full flex flex-col"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        {/* Image wrapper — portrait 3:4 */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{ aspectRatio: "3/4", maxHeight: "280px" }}
        >
          <Image
            src={service.image}
            alt={`${service.name} treatment room at Serena Spa Hội An`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Signature badge */}
          {service.isSignature && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white font-sans font-semibold"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                backgroundColor: "var(--color-terracotta)",
              }}
            >
              {locale === "vi" ? "Đặc trưng" : "Signature"}
            </div>
          )}

          {/* Hover overlay with "Book" CTA */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to top, rgba(61,31,15,0.55) 0%, transparent 60%)",
            }}
          >
            <span
              className="font-sans font-semibold text-white tracking-widest uppercase px-5 py-2 rounded-full border border-white/70 text-xs"
            >
              {locale === "vi" ? "Đặt lịch" : "Book Now"}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div
          className="flex flex-col gap-2 px-4 py-4 flex-1"
          style={{ backgroundColor: "var(--color-warm-white)" }}
        >
          {/* Service name */}
          <h3
            className="font-serif text-[var(--color-espresso)]"
            style={{ fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.2 }}
          >
            {service.name}
          </h3>

          {/* Duration + price rows — matching reference layout */}
          <div className="flex flex-col gap-1 mt-auto pt-2 border-t border-[var(--color-sand)]">
            <span
              className="font-sans text-[var(--color-warm-gray)] flex items-center gap-1.5"
              style={{ fontSize: "0.78rem" }}
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {durationLabel}
            </span>
            <span
              className="font-sans text-[var(--color-warm-gray)] flex items-center gap-1.5"
              style={{ fontSize: "0.78rem" }}
            >
              {/* Price tag icon */}
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
              </svg>
              <span style={{ color: "var(--color-terracotta)", fontWeight: 500 }}>{priceLabel}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
