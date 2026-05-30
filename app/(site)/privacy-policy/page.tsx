import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { type Locale } from "@/lib/i18n";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy — Serena Spa Hội An",
  description: "Serena Spa privacy policy for personal data and booking information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage({ locale = "en" }: { locale?: Locale }) {
  const vi = locale === "vi";
  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <h1 className="text-h1">{vi ? "Chính sách bảo mật" : "Privacy Policy"}</h1>
          <p className="text-[var(--color-warm-gray)] mt-5">
            {vi
              ? "Serena chỉ thu thập thông tin cần thiết để xác nhận đặt lịch, cung cấp liệu trình và liên hệ với khách. Dữ liệu được bảo mật và không bán cho bên thứ ba."
              : "We collect only the information needed to confirm bookings, provide treatments, and communicate with guests. Your information is handled securely and never sold to third parties."}
          </p>
          <p className="text-[var(--color-warm-gray)] mt-4">
            {vi
              ? "Với mọi yêu cầu liên quan đến quyền riêng tư, vui lòng liên hệ: info@serenaretreat.com."
              : "For any privacy-related request, contact us directly at info@serenaretreat.com."}
          </p>
        </article>
      </section>
    </main>
  );
}
