import Link from "next/link";
import { CONTACT, HOURS } from "@/data/site";
import { generatePageMetadata } from "@/lib/metadata";
import { normalizeLocale, withLocalePath } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";
  return generatePageMetadata({
    title: vi ? "Liên hệ — Serena Spa Hội An" : "Contact — Serena Spa Hội An",
    description: vi ? "Liên hệ Serena Spa để được tư vấn và đặt lịch nhanh." : "Contact Serena Spa for booking and support.",
    path: "/contact",
    locale,
  });
}

export default async function LocalizedContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";

  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="eyebrow">{vi ? "Liên hệ" : "Contact"}</p>
            <h1 className="text-h1 mt-3">{vi ? "Kết nối với Serena" : "Get in Touch"}</h1>
            <p className="prose-spa mt-4">
              {vi
                ? "Dù bạn cần đặt lịch hay tư vấn liệu trình, đội ngũ Serena luôn sẵn sàng hỗ trợ."
                : "Whether you need booking assistance or treatment advice, our team is ready to help."}
            </p>

            <div className="card p-6 mt-6 space-y-3">
              <p><strong>{vi ? "Địa chỉ:" : "Address:"}</strong> {CONTACT.address}</p>
              <p><strong>{vi ? "Điện thoại:" : "Phone:"}</strong> {CONTACT.phoneFormatted}</p>
              <p><strong>Email:</strong> {CONTACT.email}</p>
              <p><strong>{vi ? "Giờ mở cửa:" : "Opening hours:"}</strong> {HOURS.label}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <a className="btn btn-primary btn-sm" href={`tel:${CONTACT.phone}`}>{vi ? "Gọi ngay" : "Call now"}</a>
              <a className="btn btn-outline btn-sm" href={`mailto:${CONTACT.email}`}>{vi ? "Gửi email" : "Send email"}</a>
            </div>
          </div>

          <form className="card p-6 space-y-4">
            <h2 className="text-h3">{vi ? "Gửi tin nhắn" : "Send a Message"}</h2>
            <input className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2" placeholder={vi ? "Họ và tên" : "Full name"} />
            <input className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2" placeholder={vi ? "Email" : "Email"} />
            <input className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2" placeholder={vi ? "Số điện thoại" : "Phone"} />
            <textarea className="w-full border border-[var(--color-sand)] rounded-lg px-3 py-2 min-h-28" placeholder={vi ? "Nội dung" : "Message"} />
            <button type="button" className="btn btn-primary">{vi ? "Gửi liên hệ" : "Submit"}</button>
            <Link href={withLocalePath(locale, "/booking")} className="btn btn-outline btn-sm">{vi ? "Chuyển tới đặt lịch" : "Go to booking"}</Link>
          </form>
        </div>
      </section>
    </main>
  );
}
