import Link from "next/link";
import Image from "next/image";
import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import { normalizeLocale, withLocalePath } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/wellness");
}

export default async function LocalizedWellnessPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";

  const pillars = vi
    ? [
        ["Cơ thể", "Giải phóng căng cơ bằng kỹ thuật trị liệu chuẩn xác và thảo dược ấm."],
        ["Tâm trí", "Không gian tĩnh và nghi thức hít thở giúp bạn thư giãn sâu."],
        ["Tinh thần", "Khi thân - tâm cân bằng, năng lượng tích cực sẽ trở lại tự nhiên."],
      ]
    : [
        ["Body", "Release physical tension through precise touch and warm herbal rituals."],
        ["Mind", "Quiet spaces and intentional breathing create deep mental calm."],
        ["Spirit", "When body and mind are balanced, your inner energy returns naturally."],
      ];

  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">{vi ? "Triết lý Serena" : "Serena Philosophy"}</p>
            <h1 className="text-h1 mt-3">{vi ? "Wellness từ bên trong" : "Wellness From Within"}</h1>
            <p className="prose-spa mt-4">
              {vi
                ? "Tại Serena, wellness không chỉ là một dịch vụ mà là một trạng thái sống. Mọi trải nghiệm đều được thiết kế để phục hồi cơ thể, tĩnh tâm trí và nuôi dưỡng tinh thần."
                : "At Serena, wellness is not only a service but a way of being. Every ritual is designed to restore your body, quiet your mind, and nourish your spirit."}
            </p>
            <div className="mt-7 flex gap-3">
              <Link href={withLocalePath(locale, "/services")} className="btn btn-primary btn-sm">{vi ? "Khám phá dịch vụ" : "Explore Treatments"}</Link>
              <Link href={withLocalePath(locale, "/booking")} className="btn btn-outline btn-sm">{vi ? "Đặt lịch" : "Book Now"}</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[var(--radius-card)]" style={{ aspectRatio: "4/3" }}>
            <Image src="/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg" alt={vi ? "Không gian Serena Spa" : "Serena Spa reception"} fill className="object-cover" sizes="(max-width:1024px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--color-section-warm)" }}>
        <div className="container-site grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(([title, desc]) => (
            <article key={title} className="card p-6">
              <h2 className="text-h3">{title}</h2>
              <p className="text-[var(--color-warm-gray)] mt-3">{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
