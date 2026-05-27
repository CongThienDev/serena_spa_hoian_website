import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import { normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/privacy-policy");
}

export default async function LocalizedPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";

  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <h1 className="text-h1">{vi ? "Chính sách bảo mật" : "Privacy Policy"}</h1>
          <p className="text-[var(--color-warm-gray)] mt-5">
            {vi
              ? "Serena chỉ thu thập thông tin cần thiết để xác nhận đặt lịch, cung cấp liệu trình và liên hệ với khách. Dữ liệu được xử lý an toàn và không bán cho bên thứ ba."
              : "We collect only the information needed to confirm bookings, provide treatments, and communicate with guests. Your information is handled securely and never sold to third parties."}
          </p>
          <p className="text-[var(--color-warm-gray)] mt-4">
            {vi
              ? "Mọi yêu cầu liên quan quyền riêng tư vui lòng liên hệ: info@serenaspahoian.com."
              : "For any privacy-related request, contact us directly at info@serenaspahoian.com."}
          </p>
        </article>
      </section>
    </main>
  );
}
