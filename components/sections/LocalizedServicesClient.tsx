"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ServiceCard from "@/components/cards/ServiceCard";
import { withLocalePath, type Locale } from "@/lib/i18n";
import {
  getFeaturedServicesLocalized,
  getServiceCategories,
  SERVICES,
  type Service,
} from "@/data/services";

type FilterId = "all" | "massage" | "facial" | "body" | "couple";

export default function LocalizedServicesClient({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const categories = getServiceCategories(locale);
  const localizedServices = useMemo(
    () => getFeaturedServicesLocalized(SERVICES.length, locale),
    [locale],
  );

  const filtered =
    activeFilter === "all"
      ? localizedServices
      : localizedServices.filter((s) => s.categoryId === activeFilter);

  return (
    <main>
      <section className="section-padding section-cream text-center">
        <div className="container-content">
          <p className="eyebrow">{vi ? "Dịch vụ Serena" : "Serena Services"}</p>
          <h1 className="text-h1 mt-3">{vi ? "Liệu trình & nghi thức" : "Treatments & Rituals"}</h1>
          <p className="prose-spa mt-4">
            {vi
              ? "Mỗi liệu trình được thiết kế để giải phóng căng thẳng, phục hồi cơ thể và cân bằng năng lượng."
              : "Each treatment is crafted to release stress, restore your body, and rebalance your energy."}
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-site">
          <div className="flex flex-wrap gap-2 mb-8">
            <FilterPill label={vi ? "Tất cả" : "All"} active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
            {categories.map((cat) => (
              <FilterPill
                key={cat.id}
                label={cat.label}
                active={activeFilter === (cat.id as FilterId)}
                onClick={() => setActiveFilter(cat.id as FilterId)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => (
              <AnimatedSection key={service.id} animation="slide-up-fade" delay={i * 0.04}>
                <ServiceCard service={service as Service} locale={locale} />
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary">
              {vi ? "Đặt lịch ngay" : "Book Now"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-4 py-2 text-sm transition"
      style={{
        borderColor: active ? "var(--color-terracotta)" : "var(--color-sand)",
        color: active ? "var(--color-terracotta)" : "var(--color-espresso)",
        backgroundColor: active ? "var(--color-terracotta-muted)" : "transparent",
      }}
    >
      {label}
    </button>
  );
}
