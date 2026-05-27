import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getServiceBySlugLocalized } from "@/data/services";
import { generatePageMetadata } from "@/lib/metadata";
import { normalizeLocale, withLocalePath } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  const service = getServiceBySlugLocalized(slug, locale);
  if (!service) return {};

  return generatePageMetadata({
    title: service.seoTitle ?? service.name,
    description: service.seoDescription ?? service.description,
    path: `/services/${slug}`,
    locale,
  });
}

export async function generateStaticParams() {
  return SERVICES.flatMap((service) => [
    { locale: "vi", slug: service.slug },
    { locale: "en", slug: service.slug },
  ]);
}

export default async function LocalizedServiceDetailPage({ params }: Props) {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  const vi = locale === "vi";
  const service = getServiceBySlugLocalized(slug, locale);
  if (!service) notFound();

  return (
    <main>
      <section className="section-cream section-padding">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">{vi ? "Chi tiết dịch vụ" : "Service Detail"}</p>
            <h1 className="text-h1 mt-3">{service.name}</h1>
            <p className="prose-spa mt-4">{service.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {service.duration.map((d) => (
                <span key={d} className="rounded-full border border-[var(--color-sand)] px-3 py-1 text-sm text-[var(--color-espresso)]">
                  {d} {vi ? "phút" : "mins"}
                </span>
              ))}
            </div>

            <p className="mt-5 text-lg font-semibold text-[var(--color-terracotta)]">
              {vi ? "Giá từ" : "From"} {service.priceVND?.toLocaleString("vi-VN") ?? service.price} {service.priceVND ? "VND" : "USD"}
            </p>

            <div className="mt-7 flex gap-3">
              <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-sm">{vi ? "Đặt lịch" : "Book Now"}</Link>
              <Link href={withLocalePath(locale, "/services")} className="btn btn-outline btn-sm">{vi ? "Quay lại dịch vụ" : "Back to Services"}</Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[var(--radius-card)]" style={{ aspectRatio: "4/3" }}>
            <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      {(service.benefits?.length ?? 0) > 0 && (
        <section className="section-padding" style={{ backgroundColor: "var(--color-section-warm)" }}>
          <div className="container-site">
            <h2 className="text-h2 mb-6">{vi ? "Lợi ích nổi bật" : "Key Benefits"}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.benefits?.map((b) => (
                <li key={b} className="card p-4">{b}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
