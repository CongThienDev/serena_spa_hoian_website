"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { CONTACT, HOURS, SOCIAL } from "@/data/site";
import { type Locale, withLocalePath } from "@/lib/i18n";

type FormState = "idle" | "submitting" | "success" | "error";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const TREATMENT_INTERESTS = [
  { value: "", labelEn: "Select a topic...", labelVi: "Chọn chủ đề..." },
  { value: "general", labelEn: "General Inquiry", labelVi: "Tư vấn chung" },
  { value: "massage", labelEn: "Massage Therapy", labelVi: "Massage trị liệu" },
  { value: "facial", labelEn: "Facial Treatments", labelVi: "Chăm sóc da mặt" },
  { value: "body", labelEn: "Body Treatments", labelVi: "Chăm sóc cơ thể" },
  { value: "couple", labelEn: "Couple Packages", labelVi: "Gói cặp đôi" },
  { value: "occasion", labelEn: "Special Occasion", labelVi: "Dịp đặc biệt" },
];

export default function ContactPage({ locale = "en" }: { locale?: Locale }) {
  const vi = locale === "vi";
  const localizedInterests = TREATMENT_INTERESTS.map((item) => ({
    value: item.value,
    label: vi ? item.labelVi : item.labelEn,
  }));
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    // Simulate network delay
    setTimeout(() => setFormState("success"), 1400);
  }

  return (
    <main>
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <section
        className="section-cream section-padding text-center"
        aria-label={vi ? "Tiêu đề trang liên hệ" : "Contact page header"}
      >
        <div className="container-content">
          <AnimatedSection animation="fade" delay={0.05}>
            <div className="flex items-center justify-center gap-2.5 mb-5">
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              <span className="eyebrow">{vi ? "Serena luôn sẵn sàng lắng nghe bạn" : "We'd Love to Hear From You"}</span>
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.12}>
            <h1
              className="font-serif text-[var(--color-espresso)]"
              style={{
                fontSize: "clamp(2.6rem, 5vw, 5rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
              }}
            >
              {vi ? "Liên hệ Serena" : "Get in Touch"}
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.2}>
            <p
              className="prose-spa mx-auto mt-5 text-center"
              style={{ maxWidth: "54ch" }}
            >
              {vi
                ? "Dù bạn muốn đặt lịch hay chỉ cần tư vấn, Serena luôn ở đây để hỗ trợ bạn tận tâm."
                : "We're here whenever you need us. Whether you're booking a treatment or just have a question — reach out and we'll respond warmly."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content: Info + Form ────────────────────────────────────── */}
      <section
        className="section-cream section-padding"
        style={{ paddingTop: "2rem" }}
        aria-label={vi ? "Thông tin liên hệ và biểu mẫu" : "Contact information and form"}
      >
        <div className="container-site">
          <div
            className="grid grid-cols-1 gap-12 lg:gap-16"
            style={{ gridTemplateColumns: "1fr" }}
          >
            <div
              className="grid grid-cols-1 gap-12 lg:gap-16"
              style={{
                gridTemplateColumns: "1fr",
              }}
            >
              {/* Responsive two-column layout using flex */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "3rem",
                }}
                className="lg:grid-cols-[1fr_1.2fr]"
              >
                {/* ── LEFT: Contact Info ─────────────────────────────── */}
                <div>
                  <AnimatedSection animation="slide-up-fade" delay={0.05}>
                    <h2
                      className="font-serif text-[var(--color-espresso)] mb-8"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        fontWeight: 500,
                      }}
                    >
                      {vi ? "Thông tin của Serena" : "Our Details"}
                    </h2>
                  </AnimatedSection>

                  <div className="space-y-6">
                    {/* Address */}
                    <AnimatedSection animation="slide-up-fade" delay={0.1}>
                      <ContactInfoBlock
                        icon={<LocationIcon />}
                        label={vi ? "Địa chỉ" : "Visit Us"}
                        value={CONTACT.address}
                        href={CONTACT.googleMapsUrl}
                        linkLabel={vi ? "Xem chỉ đường" : "Get directions"}
                      />
                    </AnimatedSection>

                    {/* Phone */}
                    <AnimatedSection animation="slide-up-fade" delay={0.15}>
                      <ContactInfoBlock
                        icon={<PhoneIcon />}
                        label={vi ? "Điện thoại" : "Call Us"}
                        value={CONTACT.phoneFormatted}
                        href={`tel:${CONTACT.phone}`}
                      />
                    </AnimatedSection>

                    {/* Email */}
                    <AnimatedSection animation="slide-up-fade" delay={0.2}>
                      <ContactInfoBlock
                        icon={<EmailIcon />}
                        label="Email"
                        value={CONTACT.email}
                        href={`mailto:${CONTACT.email}`}
                      />
                    </AnimatedSection>

                    {/* Hours */}
                    <AnimatedSection animation="slide-up-fade" delay={0.25}>
                      <ContactInfoBlock
                        icon={<ClockIcon />}
                        label={vi ? "Giờ mở cửa" : "Opening Hours"}
                        value={HOURS.label}
                        subValue={`Mon – Fri: ${HOURS.weekdays}  ·  Sat – Sun: ${HOURS.weekends}`}
                      />
                    </AnimatedSection>

                    {/* WhatsApp */}
                    <AnimatedSection animation="slide-up-fade" delay={0.3}>
                      <ContactInfoBlock
                        icon={<WhatsAppIcon />}
                        label="WhatsApp"
                        value={vi ? "Nhắn tin trực tiếp với Serena" : "Message us directly"}
                        href={`https://wa.me/${CONTACT.whatsapp}`}
                        linkLabel={vi ? "Mở WhatsApp" : "Open WhatsApp"}
                      />
                    </AnimatedSection>

                    {/* Social */}
                    <AnimatedSection animation="slide-up-fade" delay={0.35}>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          paddingTop: "0.25rem",
                        }}
                      >
                        <div
                          style={{
                            width: "2.5rem",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            paddingTop: "0.1rem",
                          }}
                        >
                          <span
                            style={{
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "50%",
                              backgroundColor: "var(--color-terracotta-muted)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CameraIcon />
                          </span>
                        </div>
                        <div>
                          <p
                            className="font-sans font-semibold text-[var(--color-espresso)]"
                            style={{
                              fontSize: "0.72rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              marginBottom: "0.35rem",
                            }}
                          >
                            {vi ? "Theo dõi Serena" : "Follow Us"}
                          </p>
                          <div className="flex items-center gap-3">
                            {SOCIAL.instagram && (
                              <a
                                href={SOCIAL.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-[var(--color-terracotta)] hover:text-[var(--color-terracotta-dark)] transition-colors duration-200"
                                style={{
                                  fontSize: "0.875rem",
                                  textDecoration: "underline",
                                  textUnderlineOffset: "3px",
                                }}
                              >
                                Instagram
                              </a>
                            )}
                            <span
                              style={{
                                color: "var(--color-sand-dark)",
                                fontSize: "0.75rem",
                              }}
                            >
                              ·
                            </span>
                            {SOCIAL.facebook && (
                              <a
                                href={SOCIAL.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-[var(--color-terracotta)] hover:text-[var(--color-terracotta-dark)] transition-colors duration-200"
                                style={{
                                  fontSize: "0.875rem",
                                  textDecoration: "underline",
                                  textUnderlineOffset: "3px",
                                }}
                              >
                                Facebook
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>

                  {/* Map placeholder */}
                  <AnimatedSection animation="fade" delay={0.4}>
                    <div
                      className="mt-10 relative overflow-hidden"
                      style={{
                        borderRadius: "var(--radius-card)",
                        backgroundColor: "var(--color-section-warm)",
                        border: "1px solid var(--color-sand)",
                        minHeight: "220px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-terracotta)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <LocationIcon color="white" />
                      </div>
                      <p
                        className="font-serif text-[var(--color-espresso)]"
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          marginBottom: "0.4rem",
                        }}
                      >
                        Serena Spa Hội An
                      </p>
                      <p
                        className="font-sans text-[var(--color-espresso-mid)]"
                        style={{ fontSize: "0.875rem", marginBottom: "1rem" }}
                      >
                        {CONTACT.address}
                      </p>
                      <a
                        href={CONTACT.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                      >
                        {vi ? "Mở Google Maps" : "Open in Google Maps"}
                      </a>
                    </div>
                  </AnimatedSection>
                </div>

                {/* ── RIGHT: Contact Form ────────────────────────────── */}
                <AnimatedSection animation="slide-up-fade" delay={0.08}>
                  <div
                    className="card"
                    style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}
                  >
                    {formState === "success" ? (
                      <SuccessState locale={locale} />
                    ) : (
                      <>
                        <h2
                          className="font-serif text-[var(--color-espresso)] mb-2"
                          style={{
                            fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                            fontWeight: 500,
                          }}
                        >
                          {vi ? "Gửi tin nhắn cho Serena" : "Send Us a Message"}
                        </h2>
                        <p
                          className="font-sans text-[var(--color-warm-gray)] mb-7"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {vi ? "Serena sẽ phản hồi trong vòng 24 giờ." : "We'll get back to you within 24 hours."}
                        </p>

                        <form onSubmit={handleSubmit} noValidate>
                          <div className="space-y-5">
                            {/* Name */}
                            <FormField label={vi ? "Họ và tên" : "Full Name"} required>
                              <input
                                type="text"
                                name="name"
                                value={fields.name}
                                onChange={handleChange}
                                placeholder={vi ? "Nhập họ và tên" : "Your full name"}
                                required
                                className="input"
                                autoComplete="name"
                              />
                            </FormField>

                            {/* Email */}
                            <FormField label={vi ? "Địa chỉ email" : "Email Address"} required>
                              <input
                                type="email"
                                name="email"
                                value={fields.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                className="input"
                                autoComplete="email"
                              />
                            </FormField>

                            {/* Phone */}
                            <FormField label={vi ? "Số điện thoại" : "Phone Number"} hint={vi ? "Không bắt buộc" : "Optional"}>
                              <input
                                type="tel"
                                name="phone"
                                value={fields.phone}
                                onChange={handleChange}
                                placeholder="+84 ..."
                                className="input"
                                autoComplete="tel"
                              />
                            </FormField>

                            {/* Treatment Interest */}
                            <FormField label={vi ? "Tôi quan tâm" : "I'm Interested In"}>
                              <select
                                name="interest"
                                value={fields.interest}
                                onChange={handleChange}
                                className="input"
                                style={{ cursor: "pointer" }}
                              >
                                {localizedInterests.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </FormField>

                            {/* Message */}
                            <FormField label={vi ? "Nội dung tin nhắn" : "Your Message"} required>
                              <textarea
                                name="message"
                                value={fields.message}
                                onChange={handleChange}
                                placeholder={vi ? "Hãy cho Serena biết bạn cần hỗ trợ gì…" : "Tell us how we can help…"}
                                required
                                rows={4}
                                className="input"
                                style={{ resize: "vertical", minHeight: "120px" }}
                              />
                            </FormField>

                            <button
                              type="submit"
                              disabled={formState === "submitting"}
                              className="btn btn-primary w-full"
                              style={{
                                width: "100%",
                                justifyContent: "center",
                                opacity: formState === "submitting" ? 0.7 : 1,
                                transition: "opacity 0.2s",
                              }}
                            >
                              {formState === "submitting" ? (
                                <>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "1rem",
                                      height: "1rem",
                                      border: "2px solid rgba(255,255,255,0.3)",
                                      borderTopColor: "white",
                                      borderRadius: "50%",
                                      animation: "spin 0.7s linear infinite",
                                    }}
                                    aria-hidden="true"
                                  />
                                  Sending…
                                </>
                              ) : (
                                (vi ? "Gửi tin nhắn" : "Send Message")
                              )}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Strip ─────────────────────────────────────────────────── */}
      <section
        className="section-warm"
        style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}
        aria-label="Spa interior images"
      >
        <div className="container-site">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {[
              {
                src: "/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg",
                alt: "Serena Spa reception with signature neon logo",
              },
              {
                src: "/images/serena_image/z7863130109467_a7e314ed3fec777a4084932b16477b2e.jpg",
                alt: "Wellness lounge with curated product shelves",
              },
              {
                src: "/images/serena_image/z7863130256078_8fa272cfe79d9ecb0518735720b5bfda.jpg",
                alt: "Arch entrance — Serena Spa, a place to glow",
              },
            ].map((img, i) => (
              <AnimatedSection animation="fade" delay={i * 0.1} key={img.src}>
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-card)",
                    aspectRatio: "16/9",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Booking CTA ────────────────────────────────────────────── */}
      <section
        className="section-espresso"
        style={{
          backgroundColor: "var(--color-espresso)",
          padding: "2.5rem 1.25rem",
        }}
        aria-label="Quick booking link"
      >
        <div className="container-site">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            <p
              className="font-sans text-[var(--color-sand)]"
              style={{ fontSize: "0.95rem", letterSpacing: "0.02em" }}
            >
              Prefer to book directly?
            </p>
            <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-sm">
              Book Online
            </Link>
          </div>
        </div>
      </section>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function ContactInfoBlock({
  icon,
  label,
  value,
  subValue,
  href,
  linkLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <span
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          backgroundColor: "var(--color-terracotta-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "0.1rem",
        }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p
          className="font-sans font-semibold text-[var(--color-espresso)]"
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.2rem",
          }}
        >
          {label}
        </p>
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-sans text-[var(--color-espresso-mid)] hover:text-[var(--color-terracotta)] transition-colors duration-200"
            style={{ fontSize: "0.95rem" }}
          >
            {linkLabel ?? value}
          </a>
        ) : (
          <p
            className="font-sans text-[var(--color-espresso-mid)]"
            style={{ fontSize: "0.95rem" }}
          >
            {value}
          </p>
        )}
        {subValue && (
          <p
            className="font-sans text-[var(--color-warm-gray)]"
            style={{ fontSize: "0.8rem", marginTop: "0.15rem" }}
          >
            {subValue}
          </p>
        )}
        {href && linkLabel && (
          <p
            className="font-sans text-[var(--color-warm-gray)]"
            style={{ fontSize: "0.82rem", marginTop: "0.1rem" }}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.4rem",
          marginBottom: "0.4rem",
        }}
      >
        <label
          className="font-sans font-medium text-[var(--color-espresso)]"
          style={{ fontSize: "0.82rem", letterSpacing: "0.03em" }}
        >
          {label}
          {required && (
            <span
              style={{ color: "var(--color-terracotta)", marginLeft: "2px" }}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
        {hint && (
          <span
            className="font-sans text-[var(--color-warm-gray)]"
            style={{ fontSize: "0.75rem" }}
          >
            ({hint})
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function SuccessState({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3rem 1rem",
        minHeight: "340px",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
          backgroundColor: "var(--color-terracotta-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.5rem",
        }}
        aria-hidden="true"
      >
        <LotusMarkSmall size={28} color="var(--color-terracotta)" />
      </div>
      <h3
        className="font-serif text-[var(--color-espresso)]"
        style={{ fontSize: "1.6rem", fontWeight: 500 }}
      >
        {vi ? "Đã nhận tin nhắn" : "Message Received"}
      </h3>
      <p
        className="font-sans text-[var(--color-espresso-mid)]"
        style={{ fontSize: "0.95rem", maxWidth: "34ch", lineHeight: 1.7 }}
      >
        {vi ? "Cảm ơn bạn! Serena sẽ phản hồi trong vòng 24 giờ." : "Thank you! We'll be in touch within 24 hours."}
      </p>
      <Link
        href={withLocalePath(locale, "/booking")}
        className="btn btn-outline btn-sm"
        style={{ marginTop: "0.5rem" }}
      >
        {vi ? "Đặt liệu trình" : "Book a Treatment"}
      </Link>
    </div>
  );
}

/* ── Icon components ─────────────────────────────────────────────────────── */

function LocationIcon({ color = "var(--color-terracotta)" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-terracotta)" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}
