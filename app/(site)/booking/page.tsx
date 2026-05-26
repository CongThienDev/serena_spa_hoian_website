"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { SERVICES, type Service } from "@/data/services";

/* ── Types ──────────────────────────────────────────────────────────────── */

type BookingStep = "form" | "success";

type BookingFormState = {
  serviceId: string;
  durationMinutes: number | null;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  addGuest: boolean;
};

const TIME_SLOTS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "18:00", label: "6:00 PM" },
];

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>("form");
  const [form, setForm] = useState<BookingFormState>({
    serviceId: "",
    durationMinutes: null,
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    addGuest: false,
  });

  const selectedService = SERVICES.find((s) => s.id === form.serviceId) ?? null;

  function setField<K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSelectService(service: Service) {
    setForm((prev) => ({
      ...prev,
      serviceId: service.id,
      durationMinutes: service.duration[0] ?? null,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStep("success");
  }

  if (step === "success") {
    return <SuccessPage service={selectedService} form={form} />;
  }

  return (
    <main>
      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--color-cream-dark) 0%, var(--color-cream) 55%)",
          padding: "clamp(4rem, 8vw, 7rem) 1.25rem",
          textAlign: "center",
        }}
        aria-label="Booking page header"
      >
        <div className="container-content">
          <AnimatedSection animation="fade" delay={0.05}>
            <div className="flex items-center justify-center gap-2.5 mb-5">
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              <span className="eyebrow">Make a Reservation</span>
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.12}>
            <h1
              className="font-serif text-[var(--color-espresso)]"
              style={{
                fontSize: "clamp(2.6rem, 5vw, 5.2rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
              }}
            >
              Book Your Escape
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.2}>
            <p
              className="prose-spa mx-auto mt-5 text-center"
              style={{ maxWidth: "48ch" }}
            >
              Reserve your treatment in seconds. Same-day bookings welcome.
            </p>
          </AnimatedSection>

          {/* Lotus divider */}
          <AnimatedSection animation="fade" delay={0.28}>
            <div
              className="flex items-center justify-center gap-4 mt-8"
              aria-hidden="true"
            >
              <span
                className="block h-px w-16"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--color-terracotta))",
                  opacity: 0.45,
                }}
              />
              <LotusMarkSmall size={20} color="var(--color-terracotta)" />
              <span
                className="block h-px w-16"
                style={{
                  background:
                    "linear-gradient(to left, transparent, var(--color-terracotta))",
                  opacity: 0.45,
                }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Booking Form + Sidebar ───────────────────────────────────────── */}
      <section
        className="section-cream section-padding"
        aria-label="Booking form"
      >
        <div className="container-site">
          {/* Step indicator */}
          <AnimatedSection animation="fade" delay={0.05}>
            <StepIndicator />
          </AnimatedSection>

          {/* Main layout: form + side image */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              marginTop: "2.5rem",
            }}
            className="lg:grid-cols-[1fr_320px]"
          >
            {/* ── Form Card ─────────────────────────────────────────── */}
            <AnimatedSection animation="slide-up-fade" delay={0.1}>
              <form
                onSubmit={handleSubmit}
                className="card"
                style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)", maxWidth: "860px" }}
                noValidate
              >
                {/* Section A: Treatment Selection */}
                <FormSection
                  title="Select Your Treatment"
                  badge="A"
                  description="Choose the treatment that calls to you."
                >
                  <div className="space-y-3">
                    {SERVICES.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={form.serviceId === service.id}
                        selectedDuration={form.durationMinutes}
                        onSelect={() => handleSelectService(service)}
                        onSelectDuration={(mins) =>
                          setField("durationMinutes", mins)
                        }
                      />
                    ))}
                  </div>
                </FormSection>

                <SectionDivider />

                {/* Section B: Date & Time */}
                <FormSection
                  title="Date & Time"
                  badge="B"
                  description="We welcome same-day bookings."
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "1.5rem",
                    }}
                    className="sm:grid-cols-[1fr_1fr]"
                  >
                    {/* Date */}
                    <div>
                      <label
                        className="font-sans font-medium text-[var(--color-espresso)]"
                        style={{
                          fontSize: "0.82rem",
                          letterSpacing: "0.03em",
                          display: "block",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Preferred Date
                        <span style={{ color: "var(--color-terracotta)" }}>
                          {" "}
                          *
                        </span>
                      </label>
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) => setField("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="input"
                        style={{ cursor: "pointer" }}
                      />
                    </div>

                    {/* Time slots — full width below date on small, same row on sm+ */}
                    <div
                      style={{ gridColumn: "1 / -1" }}
                      className="sm:col-span-2"
                    >
                      <p
                        className="font-sans font-medium text-[var(--color-espresso)]"
                        style={{
                          fontSize: "0.82rem",
                          letterSpacing: "0.03em",
                          marginBottom: "0.6rem",
                        }}
                      >
                        Preferred Time
                        <span style={{ color: "var(--color-terracotta)" }}>
                          {" "}
                          *
                        </span>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => setField("time", slot.value)}
                            style={{
                              padding: "0.45rem 1.1rem",
                              borderRadius: "var(--radius-pill)",
                              fontSize: "0.82rem",
                              fontFamily: "var(--font-sans)",
                              fontWeight: 500,
                              border:
                                form.time === slot.value
                                  ? "1.5px solid var(--color-terracotta)"
                                  : "1.5px solid var(--color-sand-dark)",
                              backgroundColor:
                                form.time === slot.value
                                  ? "var(--color-terracotta)"
                                  : "transparent",
                              color:
                                form.time === slot.value
                                  ? "white"
                                  : "var(--color-espresso-mid)",
                              cursor: "pointer",
                              transition: "all 0.18s",
                            }}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </FormSection>

                <SectionDivider />

                {/* Section C: Your Details */}
                <FormSection
                  title="Your Details"
                  badge="C"
                  description="How should we confirm your booking?"
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "1.25rem",
                    }}
                    className="sm:grid-cols-2"
                  >
                    {/* Name */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <InputLabel required>Full Name</InputLabel>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Your full name"
                        className="input"
                        autoComplete="name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <InputLabel>Email Address</InputLabel>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="your@email.com"
                        className="input"
                        autoComplete="email"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <InputLabel required>Phone / WhatsApp</InputLabel>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="+84 ..."
                        className="input"
                        autoComplete="tel"
                      />
                    </div>

                    {/* Special Requests */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <InputLabel>Special Requests</InputLabel>
                      <textarea
                        value={form.specialRequests}
                        onChange={(e) =>
                          setField("specialRequests", e.target.value)
                        }
                        placeholder="Allergies, preferences, special occasions…"
                        rows={3}
                        className="input"
                        style={{ resize: "vertical", minHeight: "90px" }}
                      />
                    </div>

                    {/* Add Guest toggle */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <button
                        type="button"
                        onClick={() => setField("addGuest", !form.addGuest)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.7rem",
                          padding: "0.75rem 1.1rem",
                          borderRadius: "var(--radius-card-sm)",
                          border: form.addGuest
                            ? "1.5px solid var(--color-terracotta)"
                            : "1.5px solid var(--color-sand)",
                          backgroundColor: form.addGuest
                            ? "var(--color-terracotta-muted)"
                            : "var(--color-warm-white)",
                          cursor: "pointer",
                          width: "100%",
                          transition: "all 0.18s",
                        }}
                      >
                        <span
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            borderRadius: "4px",
                            border: form.addGuest
                              ? "2px solid var(--color-terracotta)"
                              : "2px solid var(--color-sand-dark)",
                            backgroundColor: form.addGuest
                              ? "var(--color-terracotta)"
                              : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.18s",
                          }}
                          aria-hidden="true"
                        >
                          {form.addGuest && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M1.5 5L4 7.5L8.5 2"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className="font-sans text-[var(--color-espresso)]"
                          style={{ fontSize: "0.875rem" }}
                        >
                          Add a guest (couple package or group booking)
                        </span>
                      </button>
                    </div>
                  </div>
                </FormSection>

                <SectionDivider />

                {/* Section D: Summary + Submit (visible on mobile, hidden on lg) */}
                <div className="lg:hidden">
                  <BookingSummaryInline
                    service={selectedService}
                    form={form}
                  />
                  <div style={{ marginTop: "1.5rem" }}>
                    <SubmitButton />
                  </div>
                </div>

                {/* Submit — desktop only (summary is in sidebar) */}
                <div className="hidden lg:block" style={{ marginTop: "2rem" }}>
                  <SubmitButton />
                </div>
              </form>
            </AnimatedSection>

            {/* ── Sticky side panel — desktop only ──────────────────── */}
            <div
              className="hidden lg:block"
              style={{ position: "relative" }}
              aria-label="Booking summary and spa image"
            >
              <div style={{ position: "sticky", top: "6rem" }}>
                {/* Booking summary card */}
                <AnimatedSection animation="fade" delay={0.2}>
                  <BookingSummaryCard service={selectedService} form={form} />
                </AnimatedSection>

                {/* Spa image strip */}
                <AnimatedSection animation="fade" delay={0.3}>
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "var(--radius-card)",
                      marginTop: "1rem",
                      height: "300px",
                    }}
                  >
                    <Image
                      src="/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg"
                      alt="Serena Spa couple treatment room — warm and serene"
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(61,31,15,0.55) 0%, transparent 60%)",
                      }}
                      aria-hidden="true"
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "1rem",
                        left: "1rem",
                        right: "1rem",
                      }}
                    >
                      <p
                        className="font-serif text-white"
                        style={{ fontSize: "1rem", fontWeight: 500 }}
                      >
                        Your sanctuary awaits
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ─────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--color-section-deep)",
          padding: "clamp(2rem, 4vw, 3rem) 1.25rem",
        }}
        aria-label="Trust pillars"
      >
        <div className="container-site">
          <AnimatedSection animation="fade" delay={0.05}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {[
                { icon: "⚡", label: "Same-day Bookings" },
                { icon: "✓", label: "No Hidden Fees" },
                { icon: "↩", label: "Flexible Cancellation" },
                { icon: "✦", label: "Expert Therapists" },
              ].map((pillar) => (
                <div
                  key={pillar.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="font-serif text-[var(--color-terracotta)]"
                    style={{ fontSize: "1.2rem" }}
                    aria-hidden="true"
                  >
                    {pillar.icon}
                  </span>
                  <span
                    className="font-sans font-semibold text-[var(--color-espresso)]"
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function StepIndicator() {
  const steps = [
    { num: "①", label: "Select Treatment" },
    { num: "②", label: "Your Details" },
    { num: "③", label: "Confirm" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius-pill)",
              backgroundColor:
                i === 0 ? "var(--color-terracotta-muted)" : "transparent",
            }}
          >
            <span
              className="font-serif text-[var(--color-terracotta)]"
              style={{ fontSize: "1rem" }}
              aria-hidden="true"
            >
              {step.num}
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: "0.8rem",
                fontWeight: i === 0 ? 600 : 400,
                color:
                  i === 0
                    ? "var(--color-terracotta)"
                    : "var(--color-warm-gray)",
                letterSpacing: "0.04em",
              }}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span
              style={{
                display: "block",
                width: "2rem",
                height: "1px",
                backgroundColor: "var(--color-sand-dark)",
                margin: "0 0.25rem",
              }}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FormSection({
  title,
  badge,
  description,
  children,
}: {
  title: string;
  badge: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <span
          className="font-serif text-[var(--color-terracotta)]"
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            backgroundColor: "var(--color-terracotta-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            fontWeight: 600,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {badge}
        </span>
        <div>
          <h2
            className="font-serif text-[var(--color-espresso)]"
            style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.2 }}
          >
            {title}
          </h2>
          <p
            className="font-sans text-[var(--color-warm-gray)]"
            style={{ fontSize: "0.85rem", marginTop: "0.15rem" }}
          >
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        height: "1px",
        backgroundColor: "var(--color-sand)",
        margin: "2rem 0",
      }}
      aria-hidden="true"
    />
  );
}

function InputLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      className="font-sans font-medium text-[var(--color-espresso)]"
      style={{
        fontSize: "0.82rem",
        letterSpacing: "0.03em",
        display: "block",
        marginBottom: "0.4rem",
      }}
    >
      {children}
      {required && (
        <span
          style={{ color: "var(--color-terracotta)", marginLeft: "2px" }}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
}

function ServiceCard({
  service,
  isSelected,
  selectedDuration,
  onSelect,
  onSelectDuration,
}: {
  service: Service;
  isSelected: boolean;
  selectedDuration: number | null;
  onSelect: () => void;
  onSelectDuration: (mins: number) => void;
}) {
  const formatVND = (vnd: number) =>
    new Intl.NumberFormat("vi-VN").format(vnd) + " VND";

  return (
    <div
      onClick={onSelect}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      style={{
        padding: "1rem 1.25rem",
        borderRadius: "var(--radius-card-sm)",
        border: isSelected
          ? "2px solid var(--color-terracotta)"
          : "1.5px solid var(--color-sand)",
        backgroundColor: isSelected
          ? "rgba(200,116,90,0.06)"
          : "var(--color-warm-white)",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.2rem",
              flexWrap: "wrap",
            }}
          >
            <span
              className="font-serif text-[var(--color-espresso)]"
              style={{ fontSize: "1.05rem", fontWeight: 500 }}
            >
              {service.name}
            </span>
            {service.isSignature && (
              <span
                className="font-sans"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  backgroundColor: "var(--color-terracotta)",
                  color: "white",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                Signature
              </span>
            )}
          </div>
          <p
            className="font-sans text-[var(--color-warm-gray)]"
            style={{ fontSize: "0.82rem", marginBottom: "0" }}
          >
            {service.tagline}
          </p>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p
            className="font-serif text-[var(--color-terracotta)]"
            style={{ fontSize: "1.1rem", fontWeight: 600 }}
          >
            {service.priceVND ? formatVND(service.priceVND) : `$${service.price}`}
          </p>
          <p
            className="font-sans text-[var(--color-warm-gray)]"
            style={{ fontSize: "0.75rem" }}
          >
            from {service.duration[0]} min
          </p>
        </div>
      </div>

      {/* Duration selector — shown when selected */}
      {isSelected && service.duration.length > 1 && (
        <div
          style={{
            marginTop: "0.9rem",
            paddingTop: "0.9rem",
            borderTop: "1px solid var(--color-sand)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className="font-sans text-[var(--color-espresso-mid)]"
            style={{ fontSize: "0.78rem", fontWeight: 500 }}
          >
            Duration:
          </span>
          {service.duration.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => onSelectDuration(mins)}
              style={{
                padding: "0.3rem 0.8rem",
                borderRadius: "var(--radius-pill)",
                fontSize: "0.78rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                border:
                  selectedDuration === mins
                    ? "1.5px solid var(--color-terracotta)"
                    : "1.5px solid var(--color-sand-dark)",
                backgroundColor:
                  selectedDuration === mins
                    ? "var(--color-terracotta)"
                    : "transparent",
                color:
                  selectedDuration === mins
                    ? "white"
                    : "var(--color-espresso-mid)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {mins} min
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BookingSummaryCard({
  service,
  form,
}: {
  service: Service | null;
  form: BookingFormState;
}) {
  return (
    <div
      className="card"
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--color-warm-white)",
      }}
    >
      <h3
        className="font-serif text-[var(--color-espresso)]"
        style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem" }}
      >
        Your Booking
      </h3>
      <SummaryRows service={service} form={form} />
      <p
        className="font-sans text-[var(--color-warm-gray)]"
        style={{
          fontSize: "0.72rem",
          marginTop: "1rem",
          lineHeight: 1.6,
          borderTop: "1px solid var(--color-sand)",
          paddingTop: "0.75rem",
        }}
      >
        You&apos;ll receive a confirmation via WhatsApp or Email within 15
        minutes.
      </p>
    </div>
  );
}

function BookingSummaryInline({
  service,
  form,
}: {
  service: Service | null;
  form: BookingFormState;
}) {
  return (
    <div
      style={{
        padding: "1.25rem",
        borderRadius: "var(--radius-card-sm)",
        backgroundColor: "var(--color-section-warm)",
        border: "1px solid var(--color-sand)",
      }}
    >
      <h3
        className="font-serif text-[var(--color-espresso)]"
        style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.75rem" }}
      >
        Booking Summary
      </h3>
      <SummaryRows service={service} form={form} />
      <p
        className="font-sans text-[var(--color-warm-gray)]"
        style={{ fontSize: "0.72rem", marginTop: "0.75rem", lineHeight: 1.5 }}
      >
        Confirmation via WhatsApp or Email within 15 minutes.
      </p>
    </div>
  );
}

function SummaryRows({
  service,
  form,
}: {
  service: Service | null;
  form: BookingFormState;
}) {
  const formatVND = (vnd: number) =>
    new Intl.NumberFormat("vi-VN").format(vnd) + " VND";

  const rows: { label: string; value: string }[] = [
    {
      label: "Treatment",
      value: service ? service.name : "Not selected",
    },
    {
      label: "Duration",
      value:
        form.durationMinutes !== null ? `${form.durationMinutes} min` : "—",
    },
    {
      label: "Date",
      value: form.date
        ? new Date(form.date + "T00:00:00").toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "Not selected",
    },
    {
      label: "Time",
      value: form.time
        ? TIME_SLOTS.find((s) => s.value === form.time)?.label ?? form.time
        : "Not selected",
    },
    {
      label: "Price",
      value: service
        ? service.priceVND
          ? formatVND(service.priceVND)
          : `$${service.price}`
        : "—",
    },
  ];

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <span
            className="font-sans text-[var(--color-warm-gray)]"
            style={{ fontSize: "0.8rem" }}
          >
            {row.label}
          </span>
          <span
            className="font-sans font-medium text-[var(--color-espresso)]"
            style={{ fontSize: "0.82rem", textAlign: "right" }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function SubmitButton() {
  return (
    <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
      Complete Booking
    </button>
  );
}

/* ── Success Page ────────────────────────────────────────────────────────── */

function SuccessPage({
  service,
  form,
}: {
  service: Service | null;
  form: BookingFormState;
}) {
  return (
    <main>
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--color-cream-dark) 0%, var(--color-cream) 55%)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(4rem, 8vw, 6rem) 1.25rem",
        }}
        aria-label="Booking confirmed"
      >
        <div className="container-content text-center" style={{ width: "100%" }}>
          <AnimatedSection animation="scale-fade" delay={0.05}>
            <div
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                backgroundColor: "var(--color-terracotta-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
              aria-hidden="true"
            >
              <LotusMarkSmall size={36} color="var(--color-terracotta)" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.15}>
            <h1
              className="font-serif text-[var(--color-espresso)]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Booking Received!
            </h1>
            <p
              className="prose-spa mx-auto"
              style={{ maxWidth: "44ch", marginBottom: "2rem" }}
            >
              {service ? (
                <>
                  Your{" "}
                  <strong style={{ color: "var(--color-terracotta)" }}>
                    {service.name}
                  </strong>{" "}
                  is reserved. We&apos;ll confirm via{" "}
                  {form.phone ? "WhatsApp" : "email"} within 15 minutes.
                </>
              ) : (
                "Your booking has been received. We'll confirm shortly."
              )}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade" delay={0.25}>
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: "0.75rem",
                textAlign: "left",
                padding: "1.5rem 2rem",
                borderRadius: "var(--radius-card)",
                backgroundColor: "var(--color-warm-white)",
                boxShadow: "var(--shadow-card)",
                marginBottom: "2rem",
                minWidth: "260px",
              }}
            >
              {service && (
                <Row label="Treatment" value={service.name} />
              )}
              {form.date && (
                <Row
                  label="Date"
                  value={new Date(form.date + "T00:00:00").toLocaleDateString(
                    "en-GB",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                />
              )}
              {form.time && (
                <Row
                  label="Time"
                  value={
                    TIME_SLOTS.find((s) => s.value === form.time)?.label ??
                    form.time
                  }
                />
              )}
              {form.name && <Row label="Guest" value={form.name} />}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade" delay={0.3}>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/" className="btn btn-primary">
                Return Home
              </a>
              <a href="/services" className="btn btn-outline">
                Explore Services
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5rem" }}>
      <span
        className="font-sans text-[var(--color-warm-gray)]"
        style={{ fontSize: "0.8rem" }}
      >
        {label}
      </span>
      <span
        className="font-sans font-medium text-[var(--color-espresso)]"
        style={{ fontSize: "0.82rem" }}
      >
        {value}
      </span>
    </div>
  );
}
