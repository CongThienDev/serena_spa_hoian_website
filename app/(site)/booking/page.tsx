"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { type Locale, withLocalePath } from "@/lib/i18n";

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
  pickupLocation: string;
  note: string;
};

type CouponCode = "SAVE20" | "EXTRA30";

type AppliedCoupon = {
  code: CouponCode;
  discountVND: number;
  extraMinutes: number;
  message: string;
};

const TIME_GROUPS = [
  { label: "Morning", slots: ["09:00", "10:00", "11:00"] },
  { label: "Afternoon", slots: ["14:00", "15:00", "16:00", "17:00", "18:00"] },
] as const;

const GRAND_OPENING_START = "2026-06-15";
const GRAND_OPENING_END = "2026-08-15";

export default function BookingPage({ locale = "en" }: { locale?: Locale }) {
  const vi = locale === "vi";
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
    pickupLocation: "",
    note: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [activeStep, setActiveStep] = useState<"build" | "contact">("build");
  const [recentAddKey, setRecentAddKey] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

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
  const hasNinetyMinuteBenefit = selectedItems.some((item) => item.durationMinutes >= 90);
  const hasPackageBenefit = selectedItems.some((item) => isPackageService(item.service.categoryId));
  const hasAnyBenefitEligible = hasNinetyMinuteBenefit || hasPackageBenefit;
  const benefitText = vi
    ? [
        hasNinetyMinuteBenefit ? "Free Pick Up (dịch vụ từ 90 phút)" : null,
        hasPackageBenefit ? "Free Pick Up + Healthy juice and Yogurt Granola snack / khách (dịch vụ package)" : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : [
        hasNinetyMinuteBenefit ? "Free Pick Up (services from 90 minutes)" : null,
        hasPackageBenefit ? "Free Pick Up + Healthy juice and Yogurt Granola snack / guest (package services)" : null,
      ]
        .filter(Boolean)
        .join(" · ");

  const totalAfterCoupon = Math.max(0, totalVND - (appliedCoupon?.discountVND ?? 0));
  const hasCart = selectedItems.length > 0;
  const isScheduleReady = Boolean(form.date && form.time);
  const isContactReady = Boolean(form.name.trim() && form.phone.trim() && form.email.trim());
  const canGoNext = hasCart && isScheduleReady;
  const canSubmit = hasCart && isScheduleReady && isContactReady && acceptedPolicy;
  const isCartStepLocked = selectedItems.length === 0;
  const showValidation = attemptedSubmit && !canSubmit;
  const nameMissing = showValidation && !form.name.trim();
  const emailMissing = showValidation && !form.email.trim();
  const phoneMissing = showValidation && !form.phone.trim();
  const policyMissing = showValidation && !acceptedPolicy;
  const todayISO = getLocalDateISO(0);
  const tomorrowISO = getLocalDateISO(1);
  const weekendISO = getNextWeekendISO();

  useEffect(() => {
    if (!appliedCoupon) return;
    setAppliedCoupon(null);
    setCouponError(
      vi
        ? "Giỏ hàng/ngày/giờ đã thay đổi. Vui lòng áp dụng coupon lại."
        : "Cart/date/time changed. Please apply your coupon again.",
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, form.date, form.time]);

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

  function handleApplyCoupon() {
    const normalized = couponInput.trim().toUpperCase();
    if (!normalized) {
      setCouponError(vi ? "Vui lòng nhập mã coupon." : "Please enter a coupon code.");
      setAppliedCoupon(null);
      return;
    }

    if (normalized !== "SAVE20" && normalized !== "EXTRA30") {
      setCouponError(vi ? "Mã coupon không hợp lệ." : "Invalid coupon code.");
      setAppliedCoupon(null);
      return;
    }

    if (!hasCart) {
      setCouponError(vi ? "Hãy thêm dịch vụ vào giỏ trước khi áp mã." : "Add services to cart before applying a coupon.");
      setAppliedCoupon(null);
      return;
    }

    if (!form.date || !isWithinCampaignDate(form.date)) {
      setCouponError(
        vi
          ? `Coupon chỉ áp dụng từ ${GRAND_OPENING_START} đến ${GRAND_OPENING_END}.`
          : `Coupon is valid only from ${GRAND_OPENING_START} to ${GRAND_OPENING_END}.`,
      );
      setAppliedCoupon(null);
      return;
    }

    if (normalized === "SAVE20") {
      if (!form.time) {
        setCouponError(vi ? "Vui lòng chọn giờ để áp mã SAVE20." : "Please select a time to apply SAVE20.");
        setAppliedCoupon(null);
        return;
      }
      if (!isSave20Hour(form.time)) {
        setCouponError(vi ? "SAVE20 chỉ áp dụng từ 10:00 đến 19:00." : "SAVE20 works only from 10:00 to 19:00.");
        setAppliedCoupon(null);
        return;
      }

      const discountVND = Math.round(totalVND * 0.2);
      setAppliedCoupon({
        code: "SAVE20",
        discountVND,
        extraMinutes: 0,
        message: vi
          ? `You got giảm 20%: -${discountVND.toLocaleString("vi-VN")} VND`
          : `You got 20% OFF: -${discountVND.toLocaleString("vi-VN")} VND`,
      });
      setCouponError(null);
      return;
    }

    const eligibleSixtySessions = selectedItems.reduce((sum, item) => {
      if (item.durationMinutes === 60) return sum + item.quantity;
      return sum;
    }, 0);

    if (eligibleSixtySessions <= 0) {
      setCouponError(
        vi
          ? "EXTRA30 cần ít nhất 1 dịch vụ 60 phút trong giỏ."
          : "EXTRA30 requires at least one 60-minute service in your cart.",
      );
      setAppliedCoupon(null);
      return;
    }

    const extraMinutes = eligibleSixtySessions * 30;
    setAppliedCoupon({
      code: "EXTRA30",
      discountVND: 0,
      extraMinutes,
      message: vi
        ? `You got +${extraMinutes} phút trị liệu miễn phí`
        : `You got +${extraMinutes} extra treatment minutes`,
    });
    setCouponError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedSubmit(true);
    if (!canSubmit) return;
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        locale,
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          pickupLocation: form.pickupLocation.trim(),
          note: form.note.trim(),
        },
        schedule: {
          date: form.date,
          time: form.time,
        },
        items: selectedItems.map((item) => ({
          serviceId: item.service.id,
          serviceName: item.service.name,
          durationMinutes: item.durationMinutes,
          quantity: item.quantity,
          unitPriceVND: item.unitPrice,
          lineTotalVND: item.lineTotal,
        })),
        totals: {
          totalVND,
          totalAfterCouponVND: totalAfterCoupon,
          totalDurationMinutes: totalDuration + (appliedCoupon?.extraMinutes ?? 0),
        },
        coupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              discountVND: appliedCoupon.discountVND,
              extraMinutes: appliedCoupon.extraMinutes,
            }
          : null,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit booking");
      }

      setIsSuccess(true);
    } catch {
      setSubmitError(
        vi
          ? "Không thể gửi booking lúc này. Vui lòng thử lại sau."
          : "Unable to submit booking right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <main className="section-cream">
        <section className="container-site py-20 text-center">
          <LotusMarkSmall size={28} color="var(--color-terracotta)" />
          <h1 className="mt-4 font-serif text-h2">{vi ? "Đã nhận yêu cầu đặt lịch" : "Booking Request Received"}</h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-espresso-mid)]">
            {vi
              ? "Serena sẽ xác nhận khung giờ qua WhatsApp trong thời gian sớm nhất. Cảm ơn bạn đã chọn Serena Spa Hội An."
              : "We will confirm your schedule via WhatsApp shortly. Thank you for choosing Serena Spa Hội An."}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href={withLocalePath(locale, "/services")} className="btn btn-outline">
              {vi ? "Thêm dịch vụ" : "Add More Services"}
            </Link>
            <Link href={withLocalePath(locale, "/")} className="btn btn-primary">
              {vi ? "Về trang chủ" : "Back to Home"}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="relative min-h-[55svh] overflow-hidden" aria-label={vi ? "Khu vực đặt lịch" : "Booking hero"}>
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
            <span className="eyebrow text-[var(--color-peach-light)]">{vi ? "Quy trình đặt lịch nhanh" : "Minimal Booking Flow"}</span>
          </AnimatedSection>
          <AnimatedSection animation="slide-up-fade" delay={0.14}>
            <h1
              className="mt-3 max-w-3xl font-serif text-[clamp(2.3rem,5vw,4.8rem)] leading-[0.95]"
              style={{
                color: "var(--color-warm-white)",
                WebkitTextFillColor: "var(--color-warm-white)",
                textShadow: "0 8px 26px rgba(61,31,15,0.35)",
              }}
            >
              {vi ? "Chọn dịch vụ. Kiểm tra giỏ. Xác nhận trong 1 phút." : "Select Services. Review Cart. Confirm in a Minute."}
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={0.22}>
            <p className="mt-4 max-w-2xl text-[var(--color-sand)]">
              {vi
                ? "Tạo kế hoạch trị liệu với nhiều dịch vụ và gửi một yêu cầu đặt lịch duy nhất."
                : "Build your treatment plan with multiple services, then submit one booking request."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section
        className="section-cream section-padding pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-24"
        aria-label="Booking workspace"
      >
        {activeStep === "build" ? (
          <div className="container-site mx-auto grid w-full max-w-[72rem] gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <AnimatedSection animation="slide-up-fade">
              <div className="rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5 md:p-7">
                <StepRow
                  hasCart={hasCart}
                  isScheduleReady={isScheduleReady}
                  isContactReady={isContactReady}
                  activeStep={activeStep}
                  locale={locale}
                />
                <h2 className="font-serif text-h4">{vi ? "1. Chọn dịch vụ" : "1. Choose Services"}</h2>
                <p className="mt-1 text-sm text-[var(--color-warm-gray)]">{vi ? "Chọn dịch vụ, chọn thời lượng, hoàn tất." : "Tap service, tap duration, done."}</p>

                <div className="mt-5 grid gap-2">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setActiveServiceId(service.id);
                        setRecentAddKey(null);
                      }}
                      className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition"
                      style={{
                        borderColor:
                          activeServiceId === service.id ? "var(--color-terracotta)" : "var(--color-sand)",
                        backgroundColor:
                          activeServiceId === service.id ? "var(--color-terracotta-muted)" : "transparent",
                      }}
                    >
                      <span className="min-w-0 flex-1 font-sans text-sm text-[var(--color-espresso)]">{service.name}</span>
                      <span className="shrink-0 font-sans text-xs text-[var(--color-warm-gray)]">
                        {vi ? "Từ" : "From"} {service.priceVND?.toLocaleString("vi-VN") ?? `${service.price} USD`}
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
                        const isLongStayPackage =
                          activeService.id === "serena-signature-3-days-long-stay-couple";
                        const actionLabel = isLongStayPackage
                          ? vi
                            ? `Thêm ${duration} phút/liệu trình/ngày`
                            : `Add ${duration} mins/treatment/day`
                          : isAdded
                            ? vi
                              ? `Đã thêm ${duration} phút`
                              : `Added ${duration} min`
                            : vi
                              ? `Thêm ${duration} phút`
                              : `Add ${duration} min`;
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
                            {actionLabel}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-[var(--color-warm-gray)]">
                      {vi ? "Giá hiển thị theo mỗi lần trị liệu. Bạn có thể tăng số lượng trong giỏ." : "Price shown is per session. You can increase quantity in cart."}
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up-fade" delay={0.08}>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-serif text-h4">{vi ? "2. Giỏ hàng & lịch hẹn" : "2. Cart & Schedule"}</h2>
                  <span className="rounded-full bg-[var(--color-terracotta-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-terracotta-dark)]">
                    {selectedItems.length} {vi ? (selectedItems.length === 1 ? "mục" : "mục") : `item${selectedItems.length === 1 ? "" : "s"}`}
                  </span>
                </div>

                <div className="relative mt-5">
                  <div
                    className={`transition-all duration-300 ${isCartStepLocked ? "pointer-events-none select-none opacity-45 blur-[2px]" : "opacity-100 blur-0"}`}
                    aria-hidden={isCartStepLocked}
                  >
                    <div className="space-y-3">
                      {selectedItems.length === 0 && (
                        <p className="rounded-xl border border-dashed border-[var(--color-sand-dark)] px-4 py-5 text-sm text-[var(--color-warm-gray)]">
                          {vi ? "Giỏ hàng đang trống. Hãy thêm ít nhất một dịch vụ để bắt đầu." : "Your cart is empty. Start by adding at least one service."}
                        </p>
                      )}
                      {selectedItems.map((item) => (
                        <div
                          key={`${item.serviceId}-${item.durationMinutes}`}
                          className="grid gap-3 rounded-xl border border-[var(--color-sand)] px-4 py-3 sm:grid-cols-[minmax(0,1fr)_8.5rem_7.5rem] sm:items-center"
                        >
                          <div className="min-w-0">
                            <p className="font-sans text-sm font-medium text-[var(--color-espresso)]">{item.service.name}</p>
                            <p className="text-xs text-[var(--color-warm-gray)]">
                              {item.durationMinutes} {vi ? "phút" : "min"} · {item.unitPrice.toLocaleString("vi-VN")} VND
                            </p>
                          </div>
                          <div className="flex flex-col items-start justify-center gap-1 sm:items-center">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                              {getQuantityUnitLabel(item.service.id, vi)}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.serviceId, item.durationMinutes, item.quantity - 1)}
                                className="h-8 w-8 rounded-full border border-[var(--color-sand-dark)] text-[var(--color-espresso)]"
                                aria-label={vi ? "Giảm số lượng" : "Decrease quantity"}
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm text-[var(--color-espresso)]">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.serviceId, item.durationMinutes, item.quantity + 1)}
                                className="h-8 w-8 rounded-full border border-[var(--color-sand-dark)] text-[var(--color-espresso)]"
                                aria-label={vi ? "Tăng số lượng" : "Increase quantity"}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <span className="text-left font-sans text-xs font-semibold text-[var(--color-espresso-mid)] sm:text-right">
                            {item.lineTotal.toLocaleString("vi-VN")} VND
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 border-t border-[var(--color-sand)] pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--color-warm-gray)]">
                          {vi ? "Tổng" : "Total"} · {totalDuration} {vi ? "phút" : "min"}
                        </span>
                        <span className="font-serif text-xl text-[var(--color-terracotta)]">{totalAfterCoupon.toLocaleString("vi-VN")} VND</span>
                      </div>
                      {appliedCoupon?.discountVND ? (
                        <p className="mt-1 text-right text-xs text-[var(--color-warm-gray)]">
                          {vi ? "Trước ưu đãi" : "Before discount"}: {totalVND.toLocaleString("vi-VN")} VND
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-warm-gray)]">
                          {vi ? "Bạn có mã không?" : "you have a code?"}
                        </p>
                        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                          <input
                            className="input h-9 px-3 py-2 text-sm"
                            type="text"
                            value={couponInput}
                            onChange={(event) => {
                              setCouponInput(event.target.value.toUpperCase());
                              setCouponError(null);
                            }}
                            placeholder={vi ? "Nhập mã coupon" : "Enter coupon code"}
                          />
                          <button type="button" onClick={handleApplyCoupon} className="btn btn-outline h-9 px-3 py-2 text-xs whitespace-nowrap">
                            {vi ? "Áp dụng mã" : "Apply code"}
                          </button>
                        </div>
                        {couponError ? (
                          <p className="mt-2 text-xs text-[var(--color-terracotta-dark)]">{couponError}</p>
                        ) : null}
                        {appliedCoupon ? (
                          <div className="mt-3 rounded-xl border border-[var(--color-terracotta)] bg-[var(--color-terracotta-muted)] px-3 py-2 text-sm text-[var(--color-espresso)] animate-fade-in">
                            <strong>{appliedCoupon.message}</strong>
                            {appliedCoupon.code === "EXTRA30" ? (
                              <p className="mt-1 text-xs text-[var(--color-espresso-mid)]">
                                {vi
                                  ? "Áp dụng cho các session 60 phút trong giỏ hiện tại."
                                  : "Applied to 60-minute sessions in your current cart."}
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </div>

                      {hasAnyBenefitEligible ? (
                        <div className="rounded-2xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                            {vi ? "Service Benefits" : "Service Benefits"}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-espresso-mid)]">{benefitText}</p>
                          <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                            {vi
                              ? appliedCoupon
                                ? "Benefit này không cộng dồn với coupon, nên sẽ không áp dụng khi đã dùng coupon."
                                : "Benefit này không cộng dồn với các ưu đãi khác."
                              : appliedCoupon
                                ? "These benefits cannot stack with coupons, so they are disabled while a coupon is applied."
                                : "These benefits cannot be combined with other promotions."}
                          </p>
                        </div>
                      ) : null}

                      <div className="space-y-3 rounded-2xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                          {vi ? "Ngày *" : "Date *"}
                        </p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {[
                            { label: vi ? "Hôm nay" : "Today", value: todayISO },
                            { label: vi ? "Ngày mai" : "Tomorrow", value: tomorrowISO },
                            { label: vi ? "Cuối tuần" : "Weekend", value: weekendISO },
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
                            {vi ? "Hoặc chọn ngày khác" : "Or choose another date"}
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

                      <Field label={vi ? "Giờ" : "Time"} required>
                        <div className="space-y-3">
                          {TIME_GROUPS.map((group) => (
                            <div key={group.label}>
                              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                                {vi
                                  ? group.label === "Morning"
                                    ? "Buổi sáng"
                                    : "Buổi chiều"
                                  : group.label}
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
                    </div>
                  </div>
                  {isCartStepLocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-xl border border-[var(--color-sand-dark)] bg-[var(--color-warm-white)]/95 px-4 py-3 text-center text-sm text-[var(--color-espresso-mid)] shadow-sm backdrop-blur-sm">
                        {vi ? "Chọn dịch vụ và thời lượng ở bước 1 để mở bước này." : "Choose a service duration in Step 1 to unlock this section."}
                      </div>
                    </div>
                  )}
                </div>

                  <div className="space-y-3">
                    {!canGoNext && (
                      <p className="rounded-xl bg-[var(--color-terracotta-muted)] px-3 py-2 text-xs text-[var(--color-espresso-mid)]">
                        {vi ? "Vui lòng hoàn tất giỏ hàng, ngày và giờ để tiếp tục." : "Complete cart, date and time to continue."}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveStep("contact")}
                      className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!canGoNext}
                    >
                      {vi ? "Tiếp tục" : "Next"}
                    </button>
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
                  locale={locale}
                />
                <h2 className="font-serif text-h3">{vi ? "3. Thông tin khách hàng" : "3. Guest details"}</h2>

                <button
                  type="button"
                  onClick={() => setSummaryOpen((prev) => !prev)}
                  className="mt-5 flex w-full items-center justify-between rounded-xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] px-4 py-3 text-left text-sm text-[var(--color-espresso-mid)]"
                  aria-expanded={summaryOpen}
                  aria-controls="booking-summary-details"
                >
                  <span>{selectedItems.length} {vi ? "dịch vụ" : "service item(s)"} · {totalDuration + (appliedCoupon?.extraMinutes ?? 0)} {vi ? "phút" : "min"} · {totalAfterCoupon.toLocaleString("vi-VN")} VND</span>
                  <span className="text-[var(--color-terracotta)]">{summaryOpen ? "▴" : "▾"}</span>
                </button>

                <div
                  id="booking-summary-details"
                  className={`${summaryOpen ? "mt-3" : "hidden"} space-y-2 rounded-xl border border-[var(--color-sand)] px-4 py-3`}
                >
                  {selectedItems.map((item) => (
                    <div key={`${item.serviceId}-${item.durationMinutes}`} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-[var(--color-espresso-mid)]">
                        {item.service.name} · {item.durationMinutes} {vi ? "phút" : "min"} × {item.quantity}
                      </span>
                      <span className="font-semibold text-[var(--color-espresso)]">{item.lineTotal.toLocaleString("vi-VN")} VND</span>
                    </div>
                  ))}
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                  <div className="rounded-2xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] p-4 md:p-5">
                    <div className="mb-5 flex items-start gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-terracotta)] text-sm font-semibold text-[var(--color-terracotta)]">
                        1
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-espresso)]">{vi ? "Thông tin của bạn" : "Your Information"}</h3>
                        <p className="text-sm text-[var(--color-warm-gray)]">
                          {vi ? "Chúng tôi cần các thông tin này để xác nhận đặt lịch." : "We need these details to confirm your booking."}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {vi ? "Họ và tên" : "Full name"} <span className="text-[var(--color-terracotta)]">*</span>
                        </label>
                        <input
                          className={`input ${nameMissing ? "border-[var(--color-terracotta)]" : ""}`}
                          type="text"
                          value={form.name}
                          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                          autoComplete="name"
                          placeholder={vi ? "Nguyễn Văn A" : "Alex John"}
                          required
                        />
                        {nameMissing && (
                          <p className="mt-1 text-xs text-[var(--color-terracotta-dark)]">
                            {vi ? "Vui lòng nhập họ và tên." : "Please enter your full name."}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {vi ? "Email" : "Email address"} <span className="text-[var(--color-terracotta)]">*</span>
                        </label>
                        <input
                          className={`input ${emailMissing ? "border-[var(--color-terracotta)]" : ""}`}
                          type="email"
                          value={form.email}
                          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                          autoComplete="email"
                          placeholder="you@example.com"
                          required
                        />
                        {emailMissing && (
                          <p className="mt-1 text-xs text-[var(--color-terracotta-dark)]">
                            {vi ? "Vui lòng nhập email." : "Please enter your email address."}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                          {vi ? "Thông tin xác nhận đặt lịch sẽ được gửi về email này." : "Booking confirmation will be sent here"}
                        </p>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {vi ? "Số điện thoại" : "Phone number"} <span className="text-[var(--color-terracotta)]">*</span>
                        </label>
                        <input
                          className={`input ${phoneMissing ? "border-[var(--color-terracotta)]" : ""}`}
                          type="tel"
                          value={form.phone}
                          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                          autoComplete="tel"
                          placeholder="+84 900 000 000"
                          required
                        />
                        {phoneMissing && (
                          <p className="mt-1 text-xs text-[var(--color-terracotta-dark)]">
                            {vi ? "Vui lòng nhập số điện thoại." : "Please enter your phone number."}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                          {vi ? "Hướng dẫn viên sẽ gọi xác nhận điểm đón vào tối hôm trước." : "Our guide will call to confirm pickup time the evening before"}
                        </p>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {vi ? "Điểm đón" : "Pickup location"} <span className="font-normal text-[var(--color-warm-gray)]">({vi ? "tùy chọn" : "optional"})</span>
                        </label>
                        <input
                          className="input"
                          type="text"
                          value={form.pickupLocation}
                          onChange={(event) => setForm((prev) => ({ ...prev, pickupLocation: event.target.value }))}
                          placeholder={vi ? "Tên khách sạn hoặc địa chỉ" : "Hotel name or street address"}
                        />
                        <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                          {vi ? "Có thể để trống nếu bạn gặp chúng tôi tại spa." : "Leave blank to meet us at the office"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                        {vi ? "Yêu cầu đặc biệt" : "Special requests"} <span className="font-normal text-[var(--color-warm-gray)]">({vi ? "tùy chọn" : "optional"})</span>
                      </label>
                      <textarea
                        className="input min-h-[110px]"
                        value={form.note}
                        onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                        placeholder={
                          vi
                            ? "Yêu cầu ăn kiêng, dị ứng, hỗ trợ đặc biệt, dịp kỷ niệm..."
                            : "Dietary requirements, allergies, accessibility needs, special occasions..."
                        }
                      />
                      <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                        {vi ? "Chúng tôi sẽ cố gắng hỗ trợ các yêu cầu của bạn trong khả năng tốt nhất." : "We'll accommodate your requests wherever possible"}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border border-[var(--color-sand)] bg-[var(--color-warm-white)] px-4 py-3 text-[15px] leading-relaxed text-[var(--color-espresso-mid)]">
                      <strong className="text-[var(--color-espresso)]">{vi ? "Vui lòng giữ máy điện thoại" : "Please keep your phone available"}</strong>{" "}
                      {vi
                        ? "để hướng dẫn viên có thể gọi xác nhận điểm đón và thời gian vào tối hôm trước. Hãy sẵn sàng liên lạc từ 18:00 trở đi."
                        : "our guide will call the evening before your tour to confirm the exact meeting point and pickup time. Stay reachable from 6 PM onwards that day."}
                    </div>
                  </div>

                  {showValidation && (
                    <p className="px-1 text-xs text-[var(--color-warm-gray)]">
                      {vi
                        ? "Vui lòng nhập đủ thông tin bắt buộc và xác nhận chính sách để đặt lịch."
                        : "Complete required details and accept policy terms to confirm booking."}
                    </p>
                  )}
                  {submitError && (
                    <p className="px-1 text-xs text-[var(--color-terracotta-dark)]">
                      {submitError}
                    </p>
                  )}

                  <details className="rounded-xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-[var(--color-sand-dark)] bg-[var(--color-warm-white)] px-3 py-2 text-sm font-semibold text-[var(--color-espresso)] transition hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta-dark)]">
                      <span>
                        {vi
                          ? "CHINH SACH DOI HEN VA HUY BO | THONG TIN DAT DICH VU"
                          : "CANCELLATION POLICY | BOOKING INFORMATION"}
                      </span>
                      <span className="text-[var(--color-terracotta)]">▾</span>
                    </summary>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-espresso-mid)]">
                      <p>
                        {vi
                          ? "Viec den muon co the anh huong lich tri lieu tiep theo va co the lam thay doi hoac rut ngan thoi gian tri lieu cua quy khach. Vui long thong bao it nhat truoc 4 gio de tranh phi huy 100%."
                          : "Late arrival may affect following guests and your treatment may be shortened. Please inform us at least 4 hours in advance to avoid a 100% cancellation fee."}
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li>{vi ? "Dat lich som de co lua chon tot nhat." : "Plan in advance to make your best choice."}</li>
                        <li>{vi ? "Vui long den truoc 15 phut so voi lich hen." : "Please arrive 15 minutes before your appointment."}</li>
                        <li>{vi ? "Vui long cho chung toi biet tinh trang suc khoe." : "Please let us know your health condition."}</li>
                        <li>{vi ? "Vui long de tu trang tai phong, khong mang den spa." : "Please leave belongings in your room and do not bring them to the spa."}</li>
                      </ul>
                    </div>
                  </details>

                  <label className={`flex items-start gap-2 rounded-lg border bg-[var(--color-warm-white)] px-3 py-2 text-sm text-[var(--color-espresso-mid)] ${policyMissing ? "border-[var(--color-terracotta)]" : "border-[var(--color-sand)]"}`}>
                    <input
                      type="checkbox"
                      checked={acceptedPolicy}
                      onChange={(event) => setAcceptedPolicy(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-[var(--color-terracotta)]"
                      required
                    />
                    <span>
                      {vi
                        ? "Toi da doc va dong y voi chinh sach doi hen, huy bo va thong tin dat dich vu."
                        : "I have read and agree to the cancellation policy and booking information."}
                    </span>
                  </label>
                  {policyMissing && (
                    <p className="mt-1 px-1 text-xs text-[var(--color-terracotta-dark)]">
                      {vi ? "Vui lòng xác nhận bạn đã đọc chính sách." : "Please confirm you have read the policy."}
                    </p>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setActiveStep("build")}
                      className="btn btn-outline flex-1"
                    >
                      {vi ? "Quay lại" : "Back"}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting
                        ? (vi ? "Đang gửi..." : "Submitting...")
                        : (vi ? "Xác nhận yêu cầu đặt lịch" : "Confirm Booking Request")}
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
  locale,
}: {
  hasCart: boolean;
  isScheduleReady: boolean;
  isContactReady: boolean;
  activeStep: "build" | "contact";
  locale: Locale;
}) {
  const vi = locale === "vi";
  const steps = [
    { label: vi ? "Dịch vụ" : "Service", done: hasCart },
    { label: vi ? "Lịch hẹn" : "Schedule", done: isScheduleReady },
    { label: vi ? "Liên hệ" : "Contact", done: isContactReady },
  ];

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2" aria-label={vi ? "Tiến trình đặt lịch" : "Booking progress"}>
      {steps.map((step) => (
        <span
          key={step.label}
          className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{
            borderColor: step.done ? "var(--color-terracotta)" : "var(--color-sand-dark)",
            color: step.done ? "var(--color-terracotta-dark)" : "var(--color-warm-gray)",
            backgroundColor:
              step.done ||
              (activeStep === "build" && step.label !== (vi ? "Liên hệ" : "Contact")) ||
              (activeStep === "contact" && step.label === (vi ? "Liên hệ" : "Contact"))
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

function isWithinCampaignDate(dateISO: string) {
  return dateISO >= GRAND_OPENING_START && dateISO <= GRAND_OPENING_END;
}

function isSave20Hour(time: string) {
  const [hourStr] = time.split(":");
  const hour = Number(hourStr);
  if (Number.isNaN(hour)) return false;
  return hour >= 10 && hour <= 19;
}

function isPackageService(categoryId: string) {
  return categoryId === "spa-package";
}

function getQuantityUnitLabel(serviceId: string, vi: boolean) {
  if (serviceId === "serena-signature-3-days-long-stay-couple") {
    return vi ? "Gói" : "Package";
  }

  return vi ? "Khách" : "Guests";
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
