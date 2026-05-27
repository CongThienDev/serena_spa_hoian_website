import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import { normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/terms");
}

export default async function LocalizedTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";

  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <h1 className="text-h1">{vi ? "Điều khoản & điều kiện" : "Terms & Conditions"}</h1>
          <p className="text-[var(--color-warm-gray)] mt-5">
            {vi
              ? "Lịch hẹn phụ thuộc vào tình trạng chỗ trống. Vui lòng thông báo sớm nếu cần hủy hoặc đổi lịch để Serena phục vụ tốt nhất cho tất cả khách hàng."
              : "Appointments are subject to availability. Please inform us in advance for cancellations or rescheduling to ensure the best service experience for all guests."}
          </p>
          <p className="text-[var(--color-warm-gray)] mt-4">
            {vi
              ? "Khi xác nhận đặt lịch, bạn đồng ý với các chính sách trị liệu và giờ đến của Serena Spa."
              : "By confirming a booking, you agree to our treatment and arrival policies."}
          </p>
        </article>
      </section>
    </main>
  );
}
