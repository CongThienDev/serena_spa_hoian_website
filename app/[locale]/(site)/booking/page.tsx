import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { normalizeLocale, withLocalePath } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";
  return generatePageMetadata({
    title: vi ? "Đặt lịch — Serena Spa Hội An" : "Booking — Serena Spa Hội An",
    description: vi ? "Đặt lịch liệu trình nhanh chóng tại Serena Spa Hội An." : "Reserve your treatment quickly at Serena Spa Hội An.",
    path: "/booking",
    locale,
  });
}

export default async function LocalizedBookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";

  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-content max-w-3xl">
          <p className="eyebrow">{vi ? "Đặt lịch" : "Booking"}</p>
          <h1 className="text-h1 mt-3">{vi ? "Tạo yêu cầu đặt lịch" : "Create Booking Request"}</h1>
          <p className="prose-spa mt-4">
            {vi
              ? "Chọn liệu trình phù hợp và gửi thông tin liên hệ. Serena sẽ xác nhận khung giờ sớm nhất qua WhatsApp hoặc điện thoại."
              : "Choose your preferred treatment and submit your contact details. We will confirm your slot via WhatsApp or phone shortly."}
          </p>

          <form className="card p-6 mt-8 space-y-4">
            <div>
              <label className="block text-sm mb-1">{vi ? "Họ và tên" : "Full name"}</label>
              <input className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2" placeholder={vi ? "Nhập họ tên" : "Enter your name"} />
            </div>
            <div>
              <label className="block text-sm mb-1">{vi ? "Số điện thoại" : "Phone number"}</label>
              <input className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2" placeholder={vi ? "Nhập số điện thoại" : "Enter your phone"} />
            </div>
            <div>
              <label className="block text-sm mb-1">{vi ? "Liệu trình" : "Treatment"}</label>
              <input className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2" placeholder={vi ? "Ví dụ: Serena Signature Massage" : "Example: Serena Signature Massage"} />
            </div>
            <div>
              <label className="block text-sm mb-1">{vi ? "Ghi chú" : "Notes"}</label>
              <textarea className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2 min-h-24" placeholder={vi ? "Yêu cầu thêm (nếu có)" : "Additional request (optional)"} />
            </div>
            <button type="button" className="btn btn-primary">{vi ? "Gửi yêu cầu" : "Submit Request"}</button>
          </form>

          <div className="mt-6">
            <Link href={withLocalePath(locale, "/services")} className="btn btn-outline btn-sm">{vi ? "Xem dịch vụ" : "Explore services"}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
