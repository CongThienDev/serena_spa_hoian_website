"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ServiceCard from "@/components/cards/ServiceCard";
import { localize, withLocalePath, type Locale } from "@/lib/i18n";
import {
  getFeaturedServicesLocalized,
  getServiceCategories,
  SERVICES,
  type Service,
} from "@/data/services";

type FilterId = "all" | string;

export default function LocalizedServicesClient({ locale }: { locale: Locale }) {
  const t = <T,>(variants: Record<Locale, T>): T => localize(locale, variants);
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
          <p className="eyebrow">{t({ en: "Serena Services", vi: "Dịch vụ Serena", ko: "세레나 서비스" })}</p>
          <h1 className="text-h1 mt-3">{t({ en: "Treatments & Rituals", vi: "Liệu trình & nghi thức", ko: "트리트먼트 & 리추얼" })}</h1>
          <p className="prose-spa mt-4">
            {t({
              en: "Each treatment is crafted to release stress, restore your body, and rebalance your energy.",
              vi: "Mỗi liệu trình được thiết kế để giải phóng căng thẳng, phục hồi cơ thể và cân bằng năng lượng.",
              ko: "각 트리트먼트는 스트레스를 풀고 몸을 회복시키며 에너지의 균형을 되찾도록 설계되었습니다.",
            })}
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-site">
          <div className="flex flex-wrap gap-2 mb-8">
            <FilterPill label={t({ en: "All", vi: "Tất cả", ko: "전체" })} active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
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
              {t({ en: "Book Now", vi: "Đặt lịch ngay", ko: "예약하기" })}
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
