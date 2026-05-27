"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { SERVICES, getServiceBySlug } from "@/data/services";

type CartItem = {
  serviceId: string;
  durationMinutes: number;
  quantity: number;
};

type ContactForm = {
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  note: string;
};

const TIME_GROUPS = [
  { label: "Morning", slots: ["09:00", "10:00", "11:00"] },
  { label: "Afternoon", slots: ["14:00", "15:00", "16:00", "17:00", "18:00"] },
];

export default function BookingPage() {
  const initialSlug = getInitialAddSlug();
  const initialService = initialSlug ? getServiceBySlug(initialSlug) : undefined;
  const [cart, setCart] = useState<CartItem[]>(() =>
    initialService
      ? [{ serviceId: initialService.id, durationMinutes: initialService.duration[0] ?? 60, quantity: 1 }]
      : [],
  );
  const [activeServiceId, setActiveServiceId] = useState<string>(initialService?.id ?? SERVICES[0]?.id ?? "");
  const [form, setForm] = useState<ContactForm>({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState<"build" | "contact">("build");
  const [recentAddKey, setRecentAddKey] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const activeService = SERVICES.find((service) => service.id === activeServiceId) ?? SERVICES[0];

  const selectedItems = useMemo(
    () =>
      cart
        .map((item) => {
          const service = SERVICES.find((s) => s.id === item.serviceId);
          if (!service) return null;
          const unitPrice = service.priceVND ?? Math.round(service.price * 25000);
          return {
            ...item,
            service,
            unitPrice,
            lineTotal: unitPrice * item.quantity,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [cart],
  );

  const totalVND = selectedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const totalDuration = selectedItems.reduce(
    (sum, item) => sum + item.durationMinutes * item.quantity,
    0,
  );
  const hasCart = selectedItems.length > 0;
  const isScheduleReady = Boolean(form.date && form.time);
  const isContactReady = Boolean(form.name.trim() && form.phone.trim());
  const canGoNext = hasCart && isScheduleReady;
  const canSubmit = hasCart && isScheduleReady && isContactReady;
  const todayISO = getLocalDateISO(0);
  const tomorrowISO = getLocalDateISO(1);
  const weekendISO = getNextWeekendISO();

  function handleAddCurrentService(duration: number) {
    if (!activeService) return;
    const feedbackKey = `${activeService.id}-${duration}`;
    setCart((prev) => addOrIncreaseItem(prev, activeService.id, duration));
    setRecentAddKey(feedbackKey);
  }

  function updateQuantity(serviceId: string, durationMinutes: number, nextQuantity: number) {
    if (nextQuantity <= 0) {
      setCart((prev) => prev.filter((item) => !(item.serviceId === serviceId && item.durationMinutes === durationMinutes)));
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId && item.durationMinutes === durationMinutes
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <main className="section-cream">
        <section className="container-site py-20 text-center">
          <LotusMarkSmall size={28} color="var(--color-terracotta)" />
          <h1 className="mt-4 font-serif text-h2">Booking Request Received</h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-espresso-mid)]">
            We will confirm your schedule via WhatsApp shortly. Thank you for choosing Serena Spa Hội An.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/services" className="btn btn-outline">
              Add More Services
            </Link>
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="relative min-h-[55svh] overflow-hidden" aria-label="Booking hero">
        <Image
          src="/images/serena_image/z7863130063966_02bca12b005872be63d6ed4054b0cad4.jpg"
          alt="Serena Spa reception"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(61,31,15,0.82)_0%,rgba(168,92,68,0.58)_100%)]" />
        <div className="relative container-site flex min-h-[55svh] flex-col justify-center py-14 text-white">
          <AnimatedSection animation="fade" delay={0.06}>
            <span className="eyebrow text-[var(--color-peach-light)]">Minimal Booking Flow</span>
          </AnimatedSection>
          <AnimatedSection animation="slide-up-fade" delay={0.14}>
            <h1
              className="mt-3 max-w-3xl font-serif text-[clamp(2.3rem,5vw,4.8rem)] leading-[0.95]"
              style={{ color: "var(--color-warm-white)" }}
            >
              Select Services. Review Cart. Confirm in a Minute.
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={0.22}>
            <p className="mt-4 max-w-2xl text-[var(--color-sand)]">
              Build your treatment plan with multiple services, then submit one booking request.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-cream section-padding" aria-label="Booking workspace">
        {activeStep === "build" ? (
          <div className="container-site mx-auto grid w-full max-w-[72rem] gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <AnimatedSection animation="slide-up-fade">
              <div className="rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5 md:p-7">
                <StepRow
                  hasCart={hasCart}
                  isScheduleReady={isScheduleReady}
                  isContactReady={isContactReady}
                  activeStep={activeStep}
                />
                <h2 className="font-serif text-h4">1. Choose Services</h2>
                <p className="mt-1 text-sm text-[var(--color-warm-gray)]">Tap service, tap duration, done.</p>

                <div className="mt-5 grid gap-2">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setActiveServiceId(service.id);
                        setRecentAddKey(null);
                      }}
                      className="flex items-center justify-between rounded-xl border px-4 py-3 text-left transition"
                      style={{
                        borderColor:
                          activeServiceId === service.id ? "var(--color-terracotta)" : "var(--color-sand)",
                        backgroundColor:
                          activeServiceId === service.id ? "var(--color-terracotta-muted)" : "transparent",
                      }}
                    >
                      <span className="font-sans text-sm text-[var(--color-espresso)]">{service.name}</span>
                      <span className="font-sans text-xs text-[var(--color-warm-gray)]">
                        From {service.priceVND?.toLocaleString("vi-VN") ?? `${service.price} USD`}
                      </span>
                    </button>
                  ))}
                </div>

                {activeService && (
                  <div className="mt-6 border-t border-[var(--color-sand)] pt-5">
                    <p className="font-serif text-lg text-[var(--color-espresso)]">{activeService.name}</p>
                    <p className="mt-1 text-sm text-[var(--color-warm-gray)]">{activeService.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeService.duration.map((duration) => {
                        const key = `${activeService.id}-${duration}`;
                        const isAdded = recentAddKey === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleAddCurrentService(duration)}
                            className="btn btn-outline btn-sm"
                            style={{
                              borderColor: isAdded ? "var(--color-terracotta)" : undefined,
                              backgroundColor: isAdded ? "var(--color-terracotta)" : undefined,
                              color: isAdded ? "white" : undefined,
                            }}
                          >
                            {isAdded ? `Added ${duration} min` : `Add ${duration} min`}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-[var(--color-warm-gray)]">
                      Price shown is per session. You can increase quantity in cart.
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up-fade" delay={0.08}>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-serif text-h4">2. Cart & Schedule</h2>
                  <span className="rounded-full bg-[var(--color-terracotta-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-terracotta-dark)]">
                    {selectedItems.length} item{selectedItems.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {selectedItems.length === 0 && (
                    <p className="rounded-xl border border-dashed border-[var(--color-sand-dark)] px-4 py-5 text-sm text-[var(--color-warm-gray)]">
                      Your cart is empty. Start by adding at least one service.
                    </p>
                  )}
                  {selectedItems.map((item) => (
                    <div
                      key={`${item.serviceId}-${item.durationMinutes}`}
                      className="grid grid-cols-[minmax(0,1fr)_10rem_9rem] items-center gap-3 rounded-xl border border-[var(--color-sand)] px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="font-sans text-sm font-medium text-[var(--color-espresso)]">{item.service.name}</p>
                        <p className="text-xs text-[var(--color-warm-gray)]">
                          {item.durationMinutes} min · {item.unitPrice.toLocaleString("vi-VN")} VND
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                          Guests
                        </span>
                        <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.serviceId, item.durationMinutes, item.quantity - 1)}
                          className="h-8 w-8 rounded-full border border-[var(--color-sand-dark)] text-[var(--color-espresso)]"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm text-[var(--color-espresso)]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.serviceId, item.durationMinutes, item.quantity + 1)}
                          className="h-8 w-8 rounded-full border border-[var(--color-sand-dark)] text-[var(--color-espresso)]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        </div>
                      </div>
                      <span className="text-right font-sans text-xs font-semibold text-[var(--color-espresso-mid)]">
                        {item.lineTotal.toLocaleString("vi-VN")} VND
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-[var(--color-sand)] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-warm-gray)]">
                      Total · {totalDuration} min
                    </span>
                    <span className="font-serif text-xl text-[var(--color-terracotta)]">{totalVND.toLocaleString("vi-VN")} VND</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                <div className="space-y-3 rounded-2xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                    Date *
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {[
                      { label: "Today", value: todayISO },
                      { label: "Tomorrow", value: tomorrowISO },
                      { label: "Weekend", value: weekendISO },
                    ].map((option) => {
                      const isActive = form.date === option.value;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, date: option.value }))}
                          className="rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition"
                          style={{
                            borderColor: isActive ? "var(--color-terracotta)" : "var(--color-sand-dark)",
                            backgroundColor: isActive ? "var(--color-terracotta)" : "transparent",
                            color: isActive ? "white" : "var(--color-espresso-mid)",
                          }}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  <label className="block">
                    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                      Or choose another date
                    </span>
                    <input
                      className="input"
                      type="date"
                      min={todayISO}
                      value={form.date}
                      onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                      required
                    />
                  </label>
                </div>

                <Field label="Time" required>
                  <div className="space-y-3">
                    {TIME_GROUPS.map((group) => (
                      <div key={group.label}>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                          {group.label}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {group.slots.map((slot) => {
                            const isActive = form.time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setForm((prev) => ({ ...prev, time: slot }))}
                                className="rounded-full border px-3 py-2 text-xs font-semibold tracking-[0.08em] transition"
                                style={{
                                  borderColor: isActive ? "var(--color-terracotta)" : "var(--color-sand-dark)",
                                  backgroundColor: isActive ? "var(--color-terracotta-muted)" : "transparent",
                                  color: "var(--color-espresso-mid)",
                                }}
                              >
                                {isActive ? "✓ " : ""}
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </Field>

                  <div className="space-y-3">
                    {!canGoNext && (
                      <p className="rounded-xl bg-[var(--color-terracotta-muted)] px-3 py-2 text-xs text-[var(--color-espresso-mid)]">
                        Complete cart, date and time to continue.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveStep("contact")}
                      className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!canGoNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        ) : (
          <div className="container-site">
            <AnimatedSection animation="slide-up-fade">
              <div className="mx-auto w-full max-w-[44rem] rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5 md:p-7">
                <StepRow
                  hasCart={hasCart}
                  isScheduleReady={isScheduleReady}
                  isContactReady={isContactReady}
                  activeStep={activeStep}
                />
                <h2 className="font-serif text-h3">3. Guest details</h2>
                <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
                  One final step to confirm your booking.
                </p>

                <button
                  type="button"
                  onClick={() => setSummaryOpen((prev) => !prev)}
                  className="mt-5 flex w-full items-center justify-between rounded-xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] px-4 py-3 text-left text-sm text-[var(--color-espresso-mid)]"
                  aria-expanded={summaryOpen}
                  aria-controls="booking-summary-details"
                >
                  <span>{selectedItems.length} service item(s) · {totalDuration} min · {totalVND.toLocaleString("vi-VN")} VND</span>
                  <span className="text-[var(--color-terracotta)]">{summaryOpen ? "▴" : "▾"}</span>
                </button>

                <div
                  id="booking-summary-details"
                  className={`${summaryOpen ? "mt-3" : "hidden"} space-y-2 rounded-xl border border-[var(--color-sand)] px-4 py-3`}
                >
                  {selectedItems.map((item) => (
                    <div key={`${item.serviceId}-${item.durationMinutes}`} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-[var(--color-espresso-mid)]">
                        {item.service.name} · {item.durationMinutes} min × {item.quantity}
                      </span>
                      <span className="font-semibold text-[var(--color-espresso)]">{item.lineTotal.toLocaleString("vi-VN")} VND</span>
                    </div>
                  ))}
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <Field label="Full name" required>
                    <input
                      className="input"
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      autoComplete="name"
                      required
                    />
                  </Field>

                  <Field label="Phone / WhatsApp" required>
                    <input
                      className="input"
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                      autoComplete="tel"
                      required
                    />
                  </Field>

                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-terracotta)]">
                      Add email or note (optional)
                    </p>
                    <Field label="Email">
                      <input
                        className="input"
                        type="email"
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                        autoComplete="email"
                      />
                    </Field>

                    <Field label="Note">
                      <textarea
                        className="input min-h-[96px]"
                        value={form.note}
                        onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                        placeholder="Therapist preference, allergies, special occasion..."
                      />
                    </Field>
                  </div>

                  {!canSubmit && (
                    <p className="rounded-xl bg-[var(--color-terracotta-muted)] px-3 py-2 text-xs text-[var(--color-espresso-mid)]">
                      Complete name and phone to confirm booking.
                    </p>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setActiveStep("build")}
                      className="btn btn-outline flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!canSubmit}
                    >
                      Confirm Booking Request
                    </button>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

function addOrIncreaseItem(prev: CartItem[], serviceId: string, durationMinutes: number): CartItem[] {
  const existing = prev.find(
    (item) => item.serviceId === serviceId && item.durationMinutes === durationMinutes,
  );

  if (!existing) {
    return [...prev, { serviceId, durationMinutes, quantity: 1 }];
  }

  return prev.map((item) =>
    item.serviceId === serviceId && item.durationMinutes === durationMinutes
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
}

function StepRow({
  hasCart,
  isScheduleReady,
  isContactReady,
  activeStep,
}: {
  hasCart: boolean;
  isScheduleReady: boolean;
  isContactReady: boolean;
  activeStep: "build" | "contact";
}) {
  const steps = [
    { label: "Service", done: hasCart },
    { label: "Schedule", done: isScheduleReady },
    { label: "Contact", done: isContactReady },
  ];

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="Booking progress">
      {steps.map((step) => (
        <span
          key={step.label}
          className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{
            borderColor: step.done ? "var(--color-terracotta)" : "var(--color-sand-dark)",
            color: step.done ? "var(--color-terracotta-dark)" : "var(--color-warm-gray)",
            backgroundColor:
              step.done ||
              (activeStep === "build" && step.label !== "Contact") ||
              (activeStep === "contact" && step.label === "Contact")
                ? "var(--color-terracotta-muted)"
                : "transparent",
          }}
        >
          {step.done ? "✓ " : ""}{step.label}
        </span>
      ))}
    </div>
  );
}

function getInitialAddSlug() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("add");
}

function getLocalDateISO(addDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + addDays);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getNextWeekendISO() {
  const date = new Date();
  while (date.getDay() !== 6 && date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
