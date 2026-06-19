"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { localize, type Locale, withLocalePath } from "@/lib/i18n";

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

type CouponCode = "SAVE35" | "BUY2PAY1";

type AppliedCoupon = {
  code: CouponCode;
  discountVND: number;
  message: string;
};

const TIME_GROUPS = [
  { label: "Morning", slots: ["09:00", "10:00", "11:00"] },
  { label: "Afternoon", slots: ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00"] },
] as const;

const GRAND_OPENING_START = "2026-06-15";
const GRAND_OPENING_END = "2026-07-15";

export default function BookingPage({ locale = "en" }: { locale?: Locale }) {
  const t = <T,>(v: Record<Locale, T>): T => localize(locale, v);
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
  const [pendingCouponApply, setPendingCouponApply] = useState(false);
  const durationSectionRef = useRef<HTMLDivElement | null>(null);
  const cartSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);
  const successSectionRef = useRef<HTMLElement | null>(null);
  const couponSectionRef = useRef<HTMLDivElement | null>(null);

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
  const hasPackageBenefit = selectedItems.some((item) => isPackageService(item.service.categoryId));
  const hasAnyBenefitEligible = hasPackageBenefit;
  const benefitText = "Free Pick Up (7km) + Healthy juice and Yogurt Granola snack / guest (package services)";

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

  function scrollToSection(sectionRef: { current: HTMLDivElement | null }) {
    if (!sectionRef.current) return;
    window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function scrollToElement(elementRef: { current: HTMLElement | null }, behavior: ScrollBehavior = "smooth") {
    if (!elementRef.current) return;
    window.requestAnimationFrame(() => {
      elementRef.current?.scrollIntoView({ behavior, block: "start" });
    });
  }

  useEffect(() => {
    if (!appliedCoupon) return;
    setAppliedCoupon(null);
    setCouponError(
      t({
        en: "Cart/date/time changed. Please apply your coupon again.",
        vi: "Giỏ hàng/ngày/giờ đã thay đổi. Vui lòng áp dụng coupon lại.",
        ko: "장바구니/날짜/시간이 변경되었습니다. 쿠폰을 다시 적용해 주세요.",
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, form.date, form.time]);

  useEffect(() => {
    if (activeStep !== "contact") return;
    const timeout = window.setTimeout(() => scrollToElement(contactSectionRef), 80);
    return () => window.clearTimeout(timeout);
  }, [activeStep]);

  useEffect(() => {
    if (!isSuccess) return;
    const timeout = window.setTimeout(() => scrollToElement(successSectionRef, "auto"), 80);
    return () => window.clearTimeout(timeout);
  }, [isSuccess]);

  useEffect(() => {
    if (!pendingCouponApply || !form.date || !form.time) return;
    const timeout = window.setTimeout(() => {
      couponSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      handleApplyCoupon(true);
    }, 120);
    return () => window.clearTimeout(timeout);
  }, [pendingCouponApply, form.date, form.time]);

  function handleAddCurrentService(duration: number) {
    if (!activeService) return;
    const feedbackKey = `${activeService.id}-${duration}`;
    setCart((prev) => addOrIncreaseItem(prev, activeService.id, duration));
    setRecentAddKey(feedbackKey);
    window.setTimeout(() => scrollToSection(cartSectionRef), 120);
  }

  function handleGoToContactStep() {
    setSummaryOpen(false);
    setActiveStep("contact");
  }

  function handleBackToBuildStep() {
    setActiveStep("build");
    window.setTimeout(() => scrollToSection(cartSectionRef), 80);
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

  function handleApplyCoupon(forceRetry = false) {
    const normalized = couponInput.trim().toUpperCase();
    if (!normalized) {
      setPendingCouponApply(false);
      setCouponError(t({ en: "Please enter a coupon code.", vi: "Vui lòng nhập mã coupon.", ko: "쿠폰 코드를 입력해 주세요." }));
      setAppliedCoupon(null);
      return;
    }

    if (normalized !== "SAVE35" && normalized !== "BUY2PAY1") {
      setPendingCouponApply(false);
      setCouponError(t({ en: "Invalid coupon code.", vi: "Mã coupon không hợp lệ.", ko: "유효하지 않은 쿠폰 코드입니다." }));
      setAppliedCoupon(null);
      return;
    }

    if (!hasCart) {
      setPendingCouponApply(false);
      setCouponError(t({ en: "Add services to cart before applying a coupon.", vi: "Hãy thêm dịch vụ vào giỏ trước khi áp mã.", ko: "쿠폰을 적용하기 전에 장바구니에 서비스를 추가하세요." }));
      setAppliedCoupon(null);
      return;
    }

    if (!form.date || !form.time) {
      setPendingCouponApply(true);
      setCouponError(
        t({
          en: "Please select your date and time before applying a coupon.",
          vi: "Vui lòng chọn ngày và giờ trước khi áp mã coupon.",
          ko: "쿠폰을 적용하기 전에 날짜와 시간을 선택해 주세요.",
        }),
      );
      setAppliedCoupon(null);
      return;
    }

    if (forceRetry || pendingCouponApply) {
      setPendingCouponApply(false);
    }

    if (!isWithinCampaignDate(form.date)) {
      setPendingCouponApply(false);
      setCouponError(
        t({
          en: `Coupon is valid only from ${GRAND_OPENING_START} to ${GRAND_OPENING_END}.`,
          vi: `Coupon chỉ áp dụng từ ${GRAND_OPENING_START} đến ${GRAND_OPENING_END}.`,
          ko: `쿠폰은 ${GRAND_OPENING_START}부터 ${GRAND_OPENING_END}까지만 사용할 수 있습니다.`,
        }),
      );
      setAppliedCoupon(null);
      return;
    }

    if (!isCouponHour(form.time)) {
      setPendingCouponApply(false);
      setCouponError(
        t({
          en: `${normalized} works only from 10:00 to 19:00.`,
          vi: `${normalized} chỉ áp dụng từ 10:00 đến 19:00.`,
          ko: `${normalized} 쿠폰은 10:00부터 19:00까지만 적용됩니다.`,
        }),
      );
      setAppliedCoupon(null);
      return;
    }

    if (normalized === "SAVE35") {
      const discountVND = Math.round(totalVND * 0.35);
      setAppliedCoupon({
        code: "SAVE35",
        discountVND,
        message: t({
          en: `You got 35% OFF: -${discountVND.toLocaleString("vi-VN")} VND`,
          vi: `Bạn được giảm 35%: -${discountVND.toLocaleString("vi-VN")} VND`,
          ko: `35% 할인 적용: -${discountVND.toLocaleString("vi-VN")} VND`,
        }),
      });
      setPendingCouponApply(false);
      setCouponError(null);
      return;
    }

    const eligibleItems = selectedItems
      .map((item) => {
        if (item.durationMinutes < 90) return null;
        const freeGuests = Math.floor(item.quantity / 2);
        if (freeGuests <= 0) return null;
        return {
          freeGuests,
          discountVND: freeGuests * item.unitPrice,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    if (eligibleItems.length <= 0) {
      setPendingCouponApply(false);
      setCouponError(
        t({
          en: "BUY2PAY1 requires at least 2 guests on a treatment of 90 minutes or more.",
          vi: "BUY2PAY1 cần ít nhất 2 khách cho một dịch vụ từ 90 phút trở lên.",
          ko: "BUY2PAY1은 90분 이상 트리트먼트에 최소 2인이 필요합니다.",
        }),
      );
      setAppliedCoupon(null);
      return;
    }

    const freeGuests = eligibleItems.reduce((sum, item) => sum + item.freeGuests, 0);
    const discountVND = eligibleItems.reduce((sum, item) => sum + item.discountVND, 0);
    setAppliedCoupon({
      code: "BUY2PAY1",
      discountVND,
      message: t({
        en: `BUY2PAY1: ${freeGuests} guest free, -${discountVND.toLocaleString("vi-VN")} VND`,
        vi: `BUY2PAY1: miễn phí ${freeGuests} khách, giảm ${discountVND.toLocaleString("vi-VN")} VND`,
        ko: `BUY2PAY1: ${freeGuests}인 무료, -${discountVND.toLocaleString("vi-VN")} VND`,
      }),
    });
    setPendingCouponApply(false);
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
          totalDurationMinutes: totalDuration,
        },
        coupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              discountVND: appliedCoupon.discountVND,
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
        t({
          en: "Unable to submit booking right now. Please try again.",
          vi: "Không thể gửi booking lúc này. Vui lòng thử lại sau.",
          ko: "지금 예약을 보낼 수 없습니다. 잠시 후 다시 시도해 주세요.",
        }),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <main className="section-cream">
        <section ref={successSectionRef} className="container-site py-20 text-center" style={{ scrollMarginTop: "7rem" }}>
          <LotusMarkSmall size={28} color="var(--color-terracotta)" />
          <h1 className="mt-4 font-serif text-h2">{t({ en: "Booking Request Received", vi: "Đã nhận yêu cầu đặt lịch", ko: "예약 요청이 접수되었습니다" })}</h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-espresso-mid)]">
            {t({
              en: "We will confirm your schedule via WhatsApp shortly. Thank you for choosing Serena Spa Hội An.",
              vi: "Serena sẽ xác nhận khung giờ qua WhatsApp trong thời gian sớm nhất. Cảm ơn bạn đã chọn Serena Spa Hội An.",
              ko: "곧 WhatsApp으로 일정을 확정해 드리겠습니다. 세레나 스파 호이안을 선택해 주셔서 감사합니다.",
            })}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href={withLocalePath(locale, "/services")} className="btn btn-outline">
              {t({ en: "Add More Services", vi: "Thêm dịch vụ", ko: "서비스 더 추가" })}
            </Link>
            <Link href={withLocalePath(locale, "/")} className="btn btn-primary">
              {t({ en: "Back to Home", vi: "Về trang chủ", ko: "홈으로" })}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="relative min-h-[55svh] overflow-hidden" aria-label={t({ en: "Booking hero", vi: "Khu vực đặt lịch", ko: "예약 히어로" })}>
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
            <span className="eyebrow text-[var(--color-peach-light)]">{t({ en: "Minimal Booking Flow", vi: "Quy trình đặt lịch nhanh", ko: "간편 예약 절차" })}</span>
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
              {t({ en: "Select Services. Review Cart. Confirm in a Minute.", vi: "Chọn dịch vụ. Kiểm tra giỏ. Xác nhận trong 1 phút.", ko: "서비스 선택. 장바구니 확인. 1분 안에 완료." })}
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={0.22}>
            <p className="mt-4 max-w-2xl text-[var(--color-sand)]">
              {t({
                en: "Build your treatment plan with multiple services, then submit one booking request.",
                vi: "Tạo kế hoạch trị liệu với nhiều dịch vụ và gửi một yêu cầu đặt lịch duy nhất.",
                ko: "여러 서비스로 트리트먼트 플랜을 구성한 뒤 한 번에 예약 요청을 보내세요.",
              })}
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
                <h2 className="font-serif text-h4">{t({ vi: "1. Chọn dịch vụ", en: "1. Choose Services", ko: "1. 서비스 선택" })}</h2>
                <p className="mt-1 text-sm text-[var(--color-warm-gray)]">{t({ vi: "Chọn dịch vụ, chọn thời lượng, hoàn tất.", en: "Tap service, tap duration, done.", ko: "서비스를 선택하고 시간을 선택하세요." })}</p>

                <div className="mt-5 grid gap-2">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setActiveServiceId(service.id);
                        setRecentAddKey(null);
                        window.setTimeout(() => scrollToSection(durationSectionRef), 120);
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
                        {t({ en: "From", vi: "Từ", ko: "최소" })} {service.priceVND?.toLocaleString("vi-VN") ?? `${service.price} USD`}
                      </span>
                    </button>
                  ))}
                </div>

                {activeService && (
                  <div
                    ref={durationSectionRef}
                    className="mt-6 border-t border-[var(--color-sand)] pt-5"
                    style={{ scrollMarginTop: "7rem" }}
                  >
                    <p className="font-serif text-lg text-[var(--color-espresso)]">{activeService.name}</p>
                    <p className="mt-1 text-sm text-[var(--color-warm-gray)]">{activeService.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeService.duration.map((duration) => {
                        const key = `${activeService.id}-${duration}`;
                        const isAdded = recentAddKey === key;
                        const isLongStayPackage =
                          activeService.id === "serena-signature-3-days-long-stay-couple";
                        const actionLabel = isLongStayPackage
                          ? t({
                              en: `Add ${duration} mins/treatment/day`,
                              vi: `Thêm ${duration} phút/liệu trình/ngày`,
                              ko: `${duration}분/트리트먼트/일 추가`,
                            })
                          : isAdded
                            ? t({
                                en: `Added ${duration} min`,
                                vi: `Đã thêm ${duration} phút`,
                                ko: `${duration}분 추가됨`,
                              })
                            : t({
                                en: `Add ${duration} min`,
                                vi: `Thêm ${duration} phút`,
                                ko: `${duration}분 추가`,
                              });
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
                      {t({ en: "Price shown is per session. You can increase quantity in cart.", vi: "Giá hiển thị theo mỗi lần trị liệu. Bạn có thể tăng số lượng trong giỏ.", ko: "표시된 가격은 1회 기준입니다. 장바구니에서 수량을 늘릴 수 있습니다." })}
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up-fade" delay={0.08}>
              <div
                ref={cartSectionRef}
                className="rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5 md:p-7"
                style={{ scrollMarginTop: "7rem" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-serif text-h4">{t({ en: "2. Cart & Schedule", vi: "2. Giỏ hàng & lịch hẹn", ko: "2. 장바구니 & 일정" })}</h2>
                  <span className="rounded-full bg-[var(--color-terracotta-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-terracotta-dark)]">
                    {selectedItems.length} {t({ en: `item${selectedItems.length === 1 ? "" : "s"}`, vi: "mục", ko: "개" })}
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
                          {t({ en: "Your cart is empty. Start by adding at least one service.", vi: "Giỏ hàng đang trống. Hãy thêm ít nhất một dịch vụ để bắt đầu.", ko: "장바구니가 비어 있습니다. 서비스를 하나 이상 추가해 시작하세요." })}
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
                              {item.durationMinutes} {t({ en: "min", vi: "phút", ko: "분" })} · {item.unitPrice.toLocaleString("vi-VN")} VND
                            </p>
                          </div>
                          <div className="flex flex-col items-start justify-center gap-1 sm:items-center">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                              {getQuantityUnitLabel(item.service.id, locale)}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.serviceId, item.durationMinutes, item.quantity - 1)}
                                className="h-8 w-8 rounded-full border border-[var(--color-sand-dark)] text-[var(--color-espresso)]"
                                aria-label={t({ en: "Decrease quantity", vi: "Giảm số lượng", ko: "수량 줄이기" })}
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm text-[var(--color-espresso)]">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.serviceId, item.durationMinutes, item.quantity + 1)}
                                className="h-8 w-8 rounded-full border border-[var(--color-sand-dark)] text-[var(--color-espresso)]"
                                aria-label={t({ en: "Increase quantity", vi: "Tăng số lượng", ko: "수량 늘리기" })}
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
                          {t({ en: "Total", vi: "Tổng", ko: "합계" })} · {totalDuration} {t({ en: "min", vi: "phút", ko: "분" })}
                        </span>
                        <span className="font-serif text-xl text-[var(--color-terracotta)]">{totalAfterCoupon.toLocaleString("vi-VN")} VND</span>
                      </div>
                      {appliedCoupon?.discountVND ? (
                        <p className="mt-1 text-right text-xs text-[var(--color-warm-gray)]">
                          {t({ en: "Before discount", vi: "Trước ưu đãi", ko: "할인 전" })}: {totalVND.toLocaleString("vi-VN")} VND
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-6 space-y-4">
                      <div ref={couponSectionRef} className="rounded-2xl border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-warm-gray)]">
                          {t({ en: "you have a code?", vi: "Bạn có mã không?", ko: "쿠폰 코드가 있으신가요?" })}
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
                            placeholder={t({ en: "Enter coupon code", vi: "Nhập mã coupon", ko: "쿠폰 코드 입력" })}
                          />
                          <button type="button" onClick={() => handleApplyCoupon()} className="btn btn-outline h-9 px-3 py-2 text-xs whitespace-nowrap">
                            {t({ en: "Apply code", vi: "Áp dụng mã", ko: "쿠폰 적용" })}
                          </button>
                        </div>
                        {couponError ? (
                          <p className="mt-2 text-xs text-[var(--color-terracotta-dark)]">{couponError}</p>
                        ) : null}
                        {appliedCoupon ? (
                          <div className="mt-3 rounded-xl border border-[var(--color-terracotta)] bg-[var(--color-terracotta-muted)] px-3 py-2 text-sm text-[var(--color-espresso)] animate-fade-in">
                            <strong>{appliedCoupon.message}</strong>
                            {appliedCoupon.code === "BUY2PAY1" ? (
                              <p className="mt-1 text-xs text-[var(--color-espresso-mid)]">
                                {t({
                                  en: "Applied to treatments of 90 minutes or more with 1 free guest for every 2 guests.",
                                  vi: "Áp dụng cho các dịch vụ từ 90 phút trở lên với mỗi cặp 2 khách miễn phí 1 khách.",
                                  ko: "90분 이상 트리트먼트에 적용되며 2인마다 1인이 무료입니다.",
                                })}
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </div>

                      {hasAnyBenefitEligible ? (
                        <div className="rounded-2xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                            {t({ en: "Service Benefits", vi: "Service Benefits", ko: "서비스 혜택" })}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-espresso-mid)]">{benefitText}</p>
                          <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                            {appliedCoupon
                              ? t({
                                  en: "These benefits cannot stack with coupons, so they are disabled while a coupon is applied.",
                                  vi: "Benefit này không cộng dồn với coupon, nên sẽ không áp dụng khi đã dùng coupon.",
                                  ko: "이 혜택은 쿠폰과 중복 적용되지 않아 쿠폰 사용 시 비활성화됩니다.",
                                })
                              : t({
                                  en: "These benefits cannot be combined with other promotions.",
                                  vi: "Benefit này không cộng dồn với các ưu đãi khác.",
                                  ko: "이 혜택은 다른 프로모션과 함께 사용할 수 없습니다.",
                                })}
                          </p>
                        </div>
                      ) : null}

                      <div className="space-y-3 rounded-2xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                          {t({ en: "Date *", vi: "Ngày *", ko: "날짜 *" })}
                        </p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {[
                            { label: t({ en: "Today", vi: "Hôm nay", ko: "오늘" }), value: todayISO },
                            { label: t({ en: "Tomorrow", vi: "Ngày mai", ko: "내일" }), value: tomorrowISO },
                            { label: t({ en: "Weekend", vi: "Cuối tuần", ko: "주말" }), value: weekendISO },
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
                            {t({ vi: "Hoặc chọn ngày khác", en: "Or choose another date", ko: "다른 날짜 선택" })}
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

                      <Field label={t({ vi: "Giờ", en: "Time", ko: "시간" })} required>
                        <div className="space-y-3">
                          {TIME_GROUPS.map((group) => (
                            <div key={group.label}>
                              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-gray)]">
                                {group.label === "Morning"
                                  ? t({ vi: "Buổi sáng", en: "Morning", ko: "오전" })
                                  : t({ vi: "Buổi chiều", en: "Afternoon", ko: "오후" })}
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
                        {t({ vi: "Chọn dịch vụ và thời lượng ở bước 1 để mở bước này.", en: "Choose a service duration in Step 1 to unlock this section.", ko: "1단계에서 서비스 및 시간을 선택하면 이 섹션이 열립니다." })}
                      </div>
                    </div>
                  )}
                </div>

                  <div className="mt-6 space-y-3 border-t border-[var(--color-sand)] pt-5">
                    {!canGoNext && (
                      <p className="rounded-xl bg-[var(--color-terracotta-muted)] px-3 py-2 text-xs text-[var(--color-espresso-mid)]">
                        {t({ vi: "Vui lòng hoàn tất giỏ hàng, ngày và giờ để tiếp tục.", en: "Complete cart, date and time to continue.", ko: "장바구니, 날짜 및 시간을 완성하여 계속 진행하세요." })}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleGoToContactStep}
                      className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!canGoNext}
                    >
                      {t({ vi: "Tiếp tục", en: "Next", ko: "다음" })}
                    </button>
                  </div>
                </div>
            </AnimatedSection>
          </div>
        ) : (
          <div className="container-site">
            <AnimatedSection animation="slide-up-fade">
              <div
                ref={contactSectionRef}
                className="mx-auto w-full max-w-[44rem] rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5 md:p-7"
                style={{ scrollMarginTop: "7rem" }}
              >
                <StepRow
                  hasCart={hasCart}
                  isScheduleReady={isScheduleReady}
                  isContactReady={isContactReady}
                  activeStep={activeStep}
                  locale={locale}
                />
                <h2 className="font-serif text-h3">{t({ vi: "3. Thông tin khách hàng", en: "3. Guest details", ko: "3. 고객 정보" })}</h2>

                <button
                  type="button"
                  onClick={() => setSummaryOpen((prev) => !prev)}
                  className="mt-5 flex w-full items-center justify-between rounded-xl border border-[var(--color-sand)] bg-[var(--color-cream-dark)] px-4 py-3 text-left text-sm text-[var(--color-espresso-mid)]"
                  aria-expanded={summaryOpen}
                  aria-controls="booking-summary-details"
                >
                  <span>{selectedItems.length} {t({ vi: "dịch vụ", en: "service item(s)", ko: "서비스" })} · {totalDuration} {t({ vi: "phút", en: "min", ko: "분" })} · {totalAfterCoupon.toLocaleString("vi-VN")} VND</span>
                  <span className="text-[var(--color-terracotta)]">{summaryOpen ? "▴" : "▾"}</span>
                </button>

                <div
                  id="booking-summary-details"
                  className={`${summaryOpen ? "mt-3" : "hidden"} space-y-2 rounded-xl border border-[var(--color-sand)] px-4 py-3`}
                >
                  {selectedItems.map((item) => (
                    <div key={`${item.serviceId}-${item.durationMinutes}`} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-[var(--color-espresso-mid)]">
                        {item.service.name} · {item.durationMinutes} {t({ vi: "phút", en: "min", ko: "분" })} × {item.quantity}
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
                        <h3 className="text-xl font-semibold text-[var(--color-espresso)]">{t({ vi: "Thông tin của bạn", en: "Your Information", ko: "고객 정보" })}</h3>
                        <p className="text-sm text-[var(--color-warm-gray)]">
                          {t({ vi: "Chúng tôi cần các thông tin này để xác nhận đặt lịch.", en: "We need these details to confirm your booking.", ko: "예약 확인을 위해 이 정보가 필요합니다." })}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {t({ vi: "Họ và tên", en: "Full name", ko: "성함" })} <span className="text-[var(--color-terracotta)]">*</span>
                        </label>
                        <input
                          className={`input ${nameMissing ? "border-[var(--color-terracotta)]" : ""}`}
                          type="text"
                          value={form.name}
                          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                          autoComplete="name"
                          placeholder={t({ vi: "Nguyễn Văn A", en: "Alex John", ko: "홍길동" })}
                          required
                        />
                        {nameMissing && (
                          <p className="mt-1 text-xs text-[var(--color-terracotta-dark)]">
                            {t({ vi: "Vui lòng nhập họ và tên.", en: "Please enter your full name.", ko: "성함을 입력해 주세요." })}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {t({ vi: "Email", en: "Email address", ko: "이메일" })} <span className="text-[var(--color-terracotta)]">*</span>
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
                            {t({ vi: "Vui lòng nhập email.", en: "Please enter your email address.", ko: "이메일을 입력해 주세요." })}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                          {t({ vi: "Thông tin xác nhận đặt lịch sẽ được gửi về email này.", en: "Booking confirmation will be sent here", ko: "예약 확인 메일이 이 주소로 발송됩니다." })}
                        </p>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {t({ vi: "Số điện thoại", en: "Phone number", ko: "전화번호" })} <span className="text-[var(--color-terracotta)]">*</span>
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
                            {t({ vi: "Vui lòng nhập số điện thoại.", en: "Please enter your phone number.", ko: "전화번호를 입력해 주세요." })}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                          {t({ vi: "Hướng dẫn viên sẽ gọi xác nhận điểm đón vào tối hôm trước.", en: "Our guide will call to confirm pickup time the evening before", ko: "가이드가 전날 저녁에 픽업 시간을 확인하기 위해 전화드립니다." })}
                        </p>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                          {t({ vi: "Điểm đón", en: "Pickup location", ko: "픽업 장소" })} <span className="font-normal text-[var(--color-warm-gray)]">({t({ vi: "tùy chọn", en: "optional", ko: "선택 사항" })})</span>
                        </label>
                        <input
                          className="input"
                          type="text"
                          value={form.pickupLocation}
                          onChange={(event) => setForm((prev) => ({ ...prev, pickupLocation: event.target.value }))}
                          placeholder={t({ vi: "Tên khách sạn hoặc địa chỉ", en: "Hotel name or street address", ko: "호텔명 또는 주소" })}
                        />
                        <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                          {t({ vi: "Có thể để trống nếu bạn gặp chúng tôi tại spa.", en: "Leave blank to meet us at the office", ko: "스파에서 직접 만나실 경우 비워두셔도 됩니다." })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-1 block text-sm font-semibold text-[var(--color-espresso)]">
                        {t({ vi: "Yêu cầu đặc biệt", en: "Special requests", ko: "특별 요청" })} <span className="font-normal text-[var(--color-warm-gray)]">({t({ vi: "tùy chọn", en: "optional", ko: "선택 사항" })})</span>
                      </label>
                      <textarea
                        className="input min-h-[110px]"
                        value={form.note}
                        onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                        placeholder={t({
                          vi: "Yêu cầu ăn kiêng, dị ứng, hỗ trợ đặc biệt, dịp kỷ niệm...",
                          en: "Dietary requirements, allergies, accessibility needs, special occasions...",
                          ko: "식이 요건, 알레르기, 접근성 요구, 기념일...",
                        })}
                      />
                      <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                        {t({ vi: "Chúng tôi sẽ cố gắng hỗ trợ các yêu cầu của bạn trong khả năng tốt nhất.", en: "We'll accommodate your requests wherever possible", ko: "가능한 모든 요청을 최대한 수용하겠습니다." })}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border border-[var(--color-sand)] bg-[var(--color-warm-white)] px-4 py-3 text-[15px] leading-relaxed text-[var(--color-espresso-mid)]">
                      <strong className="text-[var(--color-espresso)]">{t({ vi: "Vui lòng giữ máy điện thoại", en: "Please keep your phone available", ko: "전화를 받을 수 있게 준비해 주세요" })}</strong>{" "}
                      {t({ vi: "để hướng dẫn viên có thể gọi xác nhận điểm đón và thời gian vào tối hôm trước. Hãy sẵn sàng liên lạc từ 18:00 trở đi.", en: "our guide will call the evening before your tour to confirm the exact meeting point and pickup time. Stay reachable from 6 PM onwards that day.", ko: "가이드가 투어 전날 저녁에 정확한 만남 장소와 픽업 시간을 확인하기 위해 전화드립니다. 오후 6시 이후로 연락 가능하게 해주세요." })}
                    </div>
                  </div>

                  {showValidation && (
                    <p className="px-1 text-xs text-[var(--color-warm-gray)]">
                      {t({ vi: "Vui lòng nhập đủ thông tin bắt buộc và xác nhận chính sách để đặt lịch.", en: "Complete required details and accept policy terms to confirm booking.", ko: "필수 항목을 모두 입력하고 정책 약관에 동의해 주세요." })}
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
                        {t({ vi: "CHINH SACH DOI HEN VA HUY BO | THONG TIN DAT DICH VU", en: "CANCELLATION POLICY | BOOKING INFORMATION", ko: "예약 취소 정책 | 예약 안내" })}
                      </span>
                      <span className="text-[var(--color-terracotta)]">▾</span>
                    </summary>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-espresso-mid)]">
                      <p>
                        {t({ vi: "Viec den muon co the anh huong lich tri lieu tiep theo va co the lam thay doi hoac rut ngan thoi gian tri lieu cua quy khach. Vui long thong bao it nhat truoc 4 gio de tranh phi huy 100%.", en: "Late arrival may affect following guests and your treatment may be shortened. Please inform us at least 4 hours in advance to avoid a 100% cancellation fee.", ko: "늦은 도착은 다음 고객의 일정에 영향을 줄 수 있으며 시술 시간이 단축될 수 있습니다. 100% 취소 수수료를 피하려면 최소 4시간 전에 알려주세요." })}
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li>{t({ vi: "Dat lich som de co lua chon tot nhat.", en: "Plan in advance to make your best choice.", ko: "미리 예약하여 최선의 선택을 하세요." })}</li>
                        <li>{t({ vi: "Vui long den truoc 15 phut so voi lich hen.", en: "Please arrive 15 minutes before your appointment.", ko: "예약 시간 15분 전에 도착해 주세요." })}</li>
                        <li>{t({ vi: "Vui long cho chung toi biet tinh trang suc khoe.", en: "Please let us know your health condition.", ko: "건강 상태를 알려주세요." })}</li>
                        <li>{t({ vi: "Vui long de tu trang tai phong, khong mang den spa.", en: "Please leave belongings in your room and do not bring them to the spa.", ko: "귀중품은 방에 두고 스파에 가져오지 마세요." })}</li>
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
                      {t({ vi: "Toi da doc va dong y voi chinh sach doi hen, huy bo va thong tin dat dich vu.", en: "I have read and agree to the cancellation policy and booking information.", ko: "예약 취소 정책 및 예약 안내를 읽고 동의합니다." })}
                    </span>
                  </label>
                  {policyMissing && (
                    <p className="mt-1 px-1 text-xs text-[var(--color-terracotta-dark)]">
                      {t({ vi: "Vui lòng xác nhận bạn đã đọc chính sách.", en: "Please confirm you have read the policy.", ko: "정책을 읽었음을 확인해 주세요." })}
                    </p>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleBackToBuildStep}
                      className="btn btn-outline flex-1"
                    >
                      {t({ vi: "Quay lại", en: "Back", ko: "뒤로" })}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting
                        ? t({ vi: "Đang gửi...", en: "Submitting...", ko: "제출 중..." })
                        : t({ vi: "Xác nhận yêu cầu đặt lịch", en: "Confirm Booking Request", ko: "예약 요청 확인" })}
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
  const t = <T,>(v: Record<Locale, T>): T => localize(locale, v);
  const steps = [
    { label: t({ vi: "Dịch vụ", en: "Service", ko: "서비스" }), key: "service", done: hasCart },
    { label: t({ vi: "Lịch hẹn", en: "Schedule", ko: "일정" }), key: "schedule", done: isScheduleReady },
    { label: t({ vi: "Liên hệ", en: "Contact", ko: "연락처" }), key: "contact", done: isContactReady },
  ];

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2" aria-label={t({ vi: "Tiến trình đặt lịch", en: "Booking progress", ko: "예약 진행 상황" })}>
      {steps.map((step) => (
        <span
          key={step.key}
          className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{
            borderColor: step.done ? "var(--color-terracotta)" : "var(--color-sand-dark)",
            color: step.done ? "var(--color-terracotta-dark)" : "var(--color-warm-gray)",
            backgroundColor:
              step.done ||
              (activeStep === "build" && step.key !== "contact") ||
              (activeStep === "contact" && step.key === "contact")
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

function isCouponHour(time: string) {
  const [hourStr] = time.split(":");
  const hour = Number(hourStr);
  if (Number.isNaN(hour)) return false;
  return hour >= 10 && hour <= 19;
}

function isPackageService(categoryId: string) {
  return categoryId === "spa-package";
}

function getQuantityUnitLabel(serviceId: string, locale: Locale) {
  const t = <T,>(v: Record<Locale, T>): T => localize(locale, v);
  if (serviceId === "serena-signature-3-days-long-stay-couple") {
    return t({ vi: "Gói", en: "Package", ko: "패키지" });
  }

  return t({ vi: "Khách", en: "Guests", ko: "인원" });
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
