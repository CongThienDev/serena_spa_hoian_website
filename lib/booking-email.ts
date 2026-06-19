import nodemailer from "nodemailer";
import { localize, type Locale } from "@/lib/i18n";

type BookingEmailPayload = {
  id: string;
  locale: Locale;
  customer: {
    name: string;
    phone: string;
    email: string;
    pickupLocation?: string;
    note?: string;
  };
  schedule: {
    date: string;
    time: string;
  };
  items: Array<{
    serviceName: string;
    durationMinutes: number;
    quantity: number;
    unitPriceVND: number;
    lineTotalVND: number;
  }>;
  totals: {
    totalVND: number;
    totalAfterCouponVND: number;
    totalDurationMinutes: number;
  };
  coupon?: {
    code: "SAVE35" | "BUY2PAY1";
    discountVND: number;
  } | null;
  createdAt: string;
};

type SendBookingEmailsResult = {
  skipped: boolean;
  customerSent: boolean;
  internalSent: boolean;
  reason?: string;
};

function getEmailConfig() {
  const user = process.env.BOOKING_EMAIL_USER?.trim();
  const pass = process.env.BOOKING_EMAIL_APP_PASSWORD?.trim();
  const notifyTo = process.env.BOOKING_NOTIFY_TO?.trim() || "serenaspahoian@gmail.com";
  const fromName = process.env.BOOKING_FROM_NAME?.trim() || "Serena Retreat Booking";

  if (!user || !pass) {
    return null;
  }

  return { user, pass, notifyTo, fromName };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(date: string, locale: Locale) {
  const [rawYear = 1970, rawMonth = 1, rawDay = 1] = date
    .split("-")
    .map((part) => Number(part));
  const year = Number.isFinite(rawYear) ? rawYear : 1970;
  const month = Number.isFinite(rawMonth) ? rawMonth : 1;
  const day = Number.isFinite(rawDay) ? rawDay : 1;
  const normalizedDate = new Date(Date.UTC(year, month - 1, day, 12));
  const intlLocale = locale === "vi" ? "vi-VN" : locale === "ko" ? "ko-KR" : "en-US";
  return new Intl.DateTimeFormat(intlLocale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(normalizedDate);
}

function formatCurrency(amount: number) {
  return `${amount.toLocaleString("vi-VN")} VND`;
}

function formatCouponSummary(coupon: BookingEmailPayload["coupon"]) {
  if (!coupon) return null;
  return `${coupon.code} (-${formatCurrency(coupon.discountVND)})`;
}

const BRAND = {
  cream: "#fff5ee",
  warmWhite: "#fffaf7",
  sand: "#ead7ca",
  terracotta: "#c8745a",
  terracottaDark: "#a85c44",
  espresso: "#3d1f0f",
  espressoMid: "#7a4030",
  warmGray: "#8c7268",
  brass: "#c8a97a",
};

function formatItemsHtml(items: BookingEmailPayload["items"]) {
  return items
    .map((item) => {
      const serviceName = escapeHtml(item.serviceName);
      return `<tr>
        <td style="padding:14px 16px;border-bottom:1px solid ${BRAND.sand};font-weight:600;color:${BRAND.espresso};">${serviceName}</td>
        <td style="padding:14px 16px;border-bottom:1px solid ${BRAND.sand};text-align:center;color:${BRAND.warmGray};">${item.durationMinutes} min</td>
        <td style="padding:14px 16px;border-bottom:1px solid ${BRAND.sand};text-align:center;color:${BRAND.warmGray};">${item.quantity}</td>
        <td style="padding:14px 16px;border-bottom:1px solid ${BRAND.sand};text-align:right;color:${BRAND.terracottaDark};font-weight:700;">${formatCurrency(item.lineTotalVND)}</td>
      </tr>`;
    })
    .join("");
}

function formatItemsText(items: BookingEmailPayload["items"]) {
  return items
    .map(
      (item) =>
        `- ${item.serviceName} | ${item.durationMinutes} min | qty ${item.quantity} | ${formatCurrency(item.lineTotalVND)}`,
    )
    .join("\n");
}

function buildCustomerEmail(payload: BookingEmailPayload) {
  const t = <T,>(v: Record<Locale, T>): T => localize(payload.locale, v);
  const customerName = escapeHtml(payload.customer.name);
  const pickupLocation = payload.customer.pickupLocation?.trim();
  const note = payload.customer.note?.trim();
  const itemsHtml = formatItemsHtml(payload.items);
  const formattedDate = formatDate(payload.schedule.date, payload.locale);
  const couponSummary = formatCouponSummary(payload.coupon);

  return {
    subject: t({
      vi: `Xác nhận yêu cầu đặt lịch #${payload.id} - Serena Spa Hội An`,
      en: `Booking request confirmation #${payload.id} - Serena Spa Hoi An`,
      ko: `예약 요청 확인 #${payload.id} - Serena Spa Hoi An`,
    }),
    text: t({
      vi: [
          `Kính chào ${payload.customer.name},`,
          "",
          "Serena Spa Hội An đã nhận được yêu cầu đặt lịch của quý khách.",
          `Ma booking: ${payload.id}`,
          `Ngay: ${formattedDate}`,
          `Gio: ${payload.schedule.time}`,
          "",
          "Dich vu:",
          formatItemsText(payload.items),
          "",
          `Tong thoi luong: ${payload.totals.totalDurationMinutes} phut`,
          `Tong thanh toan: ${formatCurrency(payload.totals.totalAfterCouponVND)}`,
          ...(couponSummary ? [`Coupon: ${couponSummary}`] : []),
          ...(pickupLocation ? [`Diem don: ${pickupLocation}`] : []),
          ...(note ? [`Ghi chu: ${note}`] : []),
          "",
          "Đội ngũ Serena sẽ liên hệ sớm để xác nhận lịch hẹn và chuẩn bị trải nghiệm chu đáo nhất cho quý khách.",
          "Trân trọng,",
          "Serena Spa Hội An",
        ].join("\n"),
      en: [
          `Dear ${payload.customer.name},`,
          "",
          "Serena Spa Hoi An has received your booking request.",
          `Booking ID: ${payload.id}`,
          `Date: ${formattedDate}`,
          `Time: ${payload.schedule.time}`,
          "",
          "Services:",
          formatItemsText(payload.items),
          "",
          `Total duration: ${payload.totals.totalDurationMinutes} min`,
          `Total amount: ${formatCurrency(payload.totals.totalAfterCouponVND)}`,
          ...(couponSummary ? [`Coupon: ${couponSummary}`] : []),
          ...(pickupLocation ? [`Pickup location: ${pickupLocation}`] : []),
          ...(note ? [`Notes: ${note}`] : []),
          "",
          "Our team will contact you shortly to confirm the appointment and prepare your wellness experience with care.",
          "With warm regards,",
          "Serena Spa Hoi An",
        ].join("\n"),
      ko: [
          `안녕하세요 ${payload.customer.name} 고객님,`,
          "",
          "Serena Spa Hoi An에서 예약 요청을 받았습니다.",
          `예약 ID: ${payload.id}`,
          `날짜: ${formattedDate}`,
          `시간: ${payload.schedule.time}`,
          "",
          "서비스:",
          formatItemsText(payload.items),
          "",
          `총 시간: ${payload.totals.totalDurationMinutes}분`,
          `총 금액: ${formatCurrency(payload.totals.totalAfterCouponVND)}`,
          ...(couponSummary ? [`쿠폰: ${couponSummary}`] : []),
          ...(pickupLocation ? [`픽업 장소: ${pickupLocation}`] : []),
          ...(note ? [`메모: ${note}`] : []),
          "",
          "저희 팀이 곧 연락드려 예약을 확인하고 최상의 웰니스 경험을 준비하겠습니다.",
          "감사합니다,",
          "Serena Spa Hoi An",
        ].join("\n"),
    }),
    html: `
      <div style="margin:0;padding:0;background:${BRAND.cream};font-family:Arial,Helvetica,sans-serif;color:${BRAND.espresso};">
        <div style="display:none;max-height:0;overflow:hidden;color:transparent;">
          ${t({ vi: "Serena Spa Hội An đã nhận được yêu cầu đặt lịch của quý khách.", en: "Serena Spa Hoi An has received your booking request.", ko: "Serena Spa Hoi An에서 예약 요청을 받았습니다." })}
        </div>
        <div style="max-width:720px;margin:0 auto;padding:32px 18px;">
          <div style="background:${BRAND.warmWhite};border:1px solid ${BRAND.sand};border-radius:24px;overflow:hidden;box-shadow:0 18px 42px rgba(61,31,15,0.08);">
            <div style="background:${BRAND.espresso};padding:28px 28px 24px;text-align:center;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;letter-spacing:0.08em;color:${BRAND.warmWhite};text-transform:uppercase;">Serena</div>
              <div style="margin-top:6px;font-size:12px;letter-spacing:0.22em;color:${BRAND.sand};text-transform:uppercase;">Spa Hoi An</div>
              <div style="width:64px;height:1px;background:${BRAND.brass};margin:18px auto 0;"></div>
            </div>

            <div style="padding:30px 28px 10px;">
              <p style="margin:0 0 10px;color:${BRAND.terracottaDark};font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">
                ${t({ vi: "Yêu cầu đặt lịch đã được ghi nhận", en: "Booking Request Received", ko: "예약 요청이 접수되었습니다" })}
              </p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;font-weight:400;color:${BRAND.espresso};">
                ${t({ vi: "Cảm ơn quý khách đã chọn Serena Spa Hội An", en: "Thank you for choosing Serena Spa Hoi An", ko: "Serena Spa Hoi An을 선택해 주셔서 감사합니다" })}
              </h1>
              <p style="margin:18px 0 0;font-size:16px;line-height:1.75;color:${BRAND.espressoMid};">
                ${t({ vi: "Kính chào", en: "Dear", ko: "안녕하세요" })} ${customerName},<br />
                ${t({ vi: "Chúng tôi đã nhận được yêu cầu đặt lịch của quý khách. Đội ngũ Serena sẽ liên hệ sớm để xác nhận lịch hẹn và chuẩn bị trải nghiệm thư giãn một cách chu đáo.", en: "We have received your booking request. Our team will contact you shortly to confirm the appointment and prepare your wellness experience with care.", ko: "예약 요청을 받았습니다. 저희 팀이 곧 연락드려 예약을 확인하고 최상의 웰니스 경험을 준비하겠습니다." })}
              </p>
            </div>

            <div style="padding:18px 28px 4px;">
              <div style="background:${BRAND.cream};border:1px solid ${BRAND.sand};border-radius:20px;padding:20px;">
                <p style="margin:0 0 14px;color:${BRAND.warmGray};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
                  ${t({ vi: "Thông tin lịch hẹn", en: "Appointment Details", ko: "예약 정보" })}
                </p>
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:8px 0;color:${BRAND.warmGray};font-size:13px;">${t({ vi: "Mã booking", en: "Booking ID", ko: "예약 ID" })}</td>
                    <td style="padding:8px 0;text-align:right;color:${BRAND.espresso};font-weight:700;">${escapeHtml(payload.id)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:${BRAND.warmGray};font-size:13px;">${t({ vi: "Ngày", en: "Date", ko: "날짜" })}</td>
                    <td style="padding:8px 0;text-align:right;color:${BRAND.espresso};font-weight:700;">${escapeHtml(formattedDate)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:${BRAND.warmGray};font-size:13px;">${t({ vi: "Giờ", en: "Time", ko: "시간" })}</td>
                    <td style="padding:8px 0;text-align:right;color:${BRAND.espresso};font-weight:700;">${escapeHtml(payload.schedule.time)}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="padding:20px 28px 4px;">
              <p style="margin:0 0 12px;color:${BRAND.warmGray};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
                ${t({ vi: "Dịch vụ đã chọn", en: "Selected Services", ko: "선택한 서비스" })}
              </p>
              <table style="width:100%;border-collapse:separate;border-spacing:0;border:1px solid ${BRAND.sand};border-radius:18px;overflow:hidden;background:${BRAND.warmWhite};">
                <thead style="background:#f4e6db;">
                  <tr>
                    <th style="padding:13px 16px;text-align:left;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">${t({ vi: "Dịch vụ", en: "Service", ko: "서비스" })}</th>
                    <th style="padding:13px 16px;text-align:center;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">${t({ vi: "Phút", en: "Min", ko: "분" })}</th>
                    <th style="padding:13px 16px;text-align:center;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">${t({ vi: "SL", en: "Qty", ko: "수량" })}</th>
                    <th style="padding:13px 16px;text-align:right;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">${t({ vi: "Tổng", en: "Amount", ko: "금액" })}</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>
            </div>

            <div style="padding:20px 28px 4px;">
              <div style="background:${BRAND.espresso};border-radius:20px;padding:20px;color:${BRAND.warmWhite};">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;color:${BRAND.sand};">${t({ vi: "Tổng thời lượng", en: "Total duration", ko: "총 시간" })}</td>
                    <td style="padding:6px 0;text-align:right;font-weight:700;">${payload.totals.totalDurationMinutes} min</td>
                  </tr>
                  ${
                    couponSummary
                      ? `<tr>
                          <td style="padding:6px 0;color:${BRAND.sand};">Coupon</td>
                          <td style="padding:6px 0;text-align:right;font-weight:700;">${escapeHtml(couponSummary)}</td>
                        </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:10px 0 0;color:${BRAND.sand};font-size:16px;">${t({ vi: "Tổng thanh toán", en: "Total amount", ko: "총 금액" })}</td>
                    <td style="padding:10px 0 0;text-align:right;font-size:22px;font-weight:700;color:${BRAND.brass};">${formatCurrency(payload.totals.totalAfterCouponVND)}</td>
                  </tr>
                </table>
              </div>
            </div>

            ${
              pickupLocation || note
                ? `<div style="padding:20px 28px 4px;">
                    <div style="border-left:3px solid ${BRAND.terracotta};padding:4px 0 4px 16px;color:${BRAND.espressoMid};font-size:14px;line-height:1.65;">
                      ${pickupLocation ? `<p style="margin:0 0 6px;"><strong>${t({ vi: "Điểm đón", en: "Pickup location", ko: "픽업 장소" })}:</strong> ${escapeHtml(pickupLocation)}</p>` : ""}
                      ${note ? `<p style="margin:0;"><strong>${t({ vi: "Ghi chú", en: "Notes", ko: "메모" })}:</strong> ${escapeHtml(note)}</p>` : ""}
                    </div>
                  </div>`
                : ""
            }

            <div style="padding:24px 28px 30px;">
              <div style="background:${BRAND.cream};border-radius:18px;padding:18px;color:${BRAND.espressoMid};font-size:15px;line-height:1.7;">
                ${t({ vi: "Đây là email xác nhận Serena đã nhận được yêu cầu đặt lịch. Lịch hẹn sẽ được xác nhận chính thức sau khi đội ngũ của chúng tôi liên hệ lại với quý khách.", en: "This email confirms that Serena has received your booking request. Your appointment will be officially confirmed after our team contacts you.", ko: "이 이메일은 Serena가 예약 요청을 받았음을 확인합니다. 저희 팀이 연락드린 후 예약이 공식적으로 확인됩니다." })}
              </div>
              <p style="margin:22px 0 0;color:${BRAND.espressoMid};font-size:15px;line-height:1.7;">
                ${t({ vi: "Trân trọng,", en: "With warm regards,", ko: "감사합니다," })}<br />
                <strong style="color:${BRAND.espresso};">Serena Spa Hoi An</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  };
}

function buildInternalEmail(payload: BookingEmailPayload) {
  const itemsHtml = formatItemsHtml(payload.items);
  const formattedDate = formatDate(payload.schedule.date, "en");
  const pickupLocation = payload.customer.pickupLocation?.trim();
  const note = payload.customer.note?.trim();
  const couponSummary = formatCouponSummary(payload.coupon);

  return {
    subject: `New booking from website: ${payload.customer.name} (${payload.id})`,
    text: [
      "New booking received from website.",
      `Booking ID: ${payload.id}`,
      `Created at: ${payload.createdAt}`,
      `Guest name: ${payload.customer.name}`,
      `Email: ${payload.customer.email}`,
      `Phone: ${payload.customer.phone}`,
      `Date: ${formattedDate}`,
      `Time: ${payload.schedule.time}`,
      "",
      "Services:",
      formatItemsText(payload.items),
      "",
      `Total duration: ${payload.totals.totalDurationMinutes} min`,
      `Total amount: ${formatCurrency(payload.totals.totalAfterCouponVND)}`,
      ...(payload.coupon ? [`Coupon: ${payload.coupon.code}`] : []),
      ...(pickupLocation ? [`Pickup location: ${pickupLocation}`] : []),
      ...(note ? [`Notes: ${note}`] : []),
    ].join("\n"),
    html: `
      <div style="margin:0;padding:0;background:${BRAND.cream};font-family:Arial,Helvetica,sans-serif;color:${BRAND.espresso};">
        <div style="display:none;max-height:0;overflow:hidden;color:transparent;">
          New website booking from ${escapeHtml(payload.customer.name)} for ${escapeHtml(formattedDate)} at ${escapeHtml(payload.schedule.time)}.
        </div>
        <div style="max-width:760px;margin:0 auto;padding:30px 18px;">
          <div style="background:${BRAND.warmWhite};border:1px solid ${BRAND.sand};border-radius:22px;overflow:hidden;box-shadow:0 18px 42px rgba(61,31,15,0.08);">
            <div style="background:${BRAND.espresso};padding:24px 28px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;color:${BRAND.brass};font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">New Website Booking</p>
                    <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:400;color:${BRAND.warmWhite};">
                      ${escapeHtml(payload.customer.name)}
                    </h1>
                  </td>
                  <td style="text-align:right;vertical-align:top;">
                    <span style="display:inline-block;background:${BRAND.terracotta};color:${BRAND.warmWhite};border-radius:999px;padding:8px 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Action Needed</span>
                  </td>
                </tr>
              </table>
            </div>

            <div style="padding:24px 28px 8px;">
              <div style="background:${BRAND.cream};border:1px solid ${BRAND.sand};border-radius:18px;padding:18px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:7px 0;color:${BRAND.warmGray};font-size:13px;">Booking ID</td>
                    <td style="padding:7px 0;text-align:right;color:${BRAND.espresso};font-weight:700;">${escapeHtml(payload.id)}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;color:${BRAND.warmGray};font-size:13px;">Created at</td>
                    <td style="padding:7px 0;text-align:right;color:${BRAND.espresso};font-weight:700;">${escapeHtml(payload.createdAt)}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="padding:16px 28px 8px;">
              <table style="width:100%;border-collapse:separate;border-spacing:0 12px;">
                <tr>
                  <td style="width:50%;vertical-align:top;padding-right:6px;">
                    <div style="border:1px solid ${BRAND.sand};border-radius:18px;padding:18px;background:${BRAND.warmWhite};">
                      <p style="margin:0 0 12px;color:${BRAND.warmGray};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Guest</p>
                      <p style="margin:0 0 8px;color:${BRAND.espressoMid};font-size:14px;">
                        <strong style="color:${BRAND.espresso};">Name:</strong> ${escapeHtml(payload.customer.name)}
                      </p>
                      <p style="margin:0 0 8px;color:${BRAND.espressoMid};font-size:14px;">
                        <strong style="color:${BRAND.espresso};">Phone:</strong> ${escapeHtml(payload.customer.phone)}
                      </p>
                      <p style="margin:0;color:${BRAND.espressoMid};font-size:14px;">
                        <strong style="color:${BRAND.espresso};">Email:</strong>
                        <a href="mailto:${escapeHtml(payload.customer.email)}" style="color:${BRAND.terracottaDark};text-decoration:none;">${escapeHtml(payload.customer.email)}</a>
                      </p>
                    </div>
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:6px;">
                    <div style="border:1px solid ${BRAND.sand};border-radius:18px;padding:18px;background:${BRAND.warmWhite};">
                      <p style="margin:0 0 12px;color:${BRAND.warmGray};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Schedule</p>
                      <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:${BRAND.espresso};">${escapeHtml(formattedDate)}</p>
                      <p style="margin:0;color:${BRAND.terracottaDark};font-size:20px;font-weight:700;">${escapeHtml(payload.schedule.time)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <div style="padding:16px 28px 8px;">
              <p style="margin:0 0 12px;color:${BRAND.warmGray};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Services</p>
              <table style="width:100%;border-collapse:separate;border-spacing:0;border:1px solid ${BRAND.sand};border-radius:18px;overflow:hidden;background:${BRAND.warmWhite};">
                <thead style="background:#f4e6db;">
                  <tr>
                    <th style="padding:13px 16px;text-align:left;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Service</th>
                    <th style="padding:13px 16px;text-align:center;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Min</th>
                    <th style="padding:13px 16px;text-align:center;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Qty</th>
                    <th style="padding:13px 16px;text-align:right;color:${BRAND.espresso};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Amount</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>
            </div>

            <div style="padding:18px 28px 8px;">
              <div style="background:${BRAND.espresso};border-radius:20px;padding:20px;color:${BRAND.warmWhite};">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;color:${BRAND.sand};">Total duration</td>
                    <td style="padding:6px 0;text-align:right;font-weight:700;">${payload.totals.totalDurationMinutes} min</td>
                  </tr>
                  ${
                    couponSummary
                      ? `<tr>
                          <td style="padding:6px 0;color:${BRAND.sand};">Coupon</td>
                          <td style="padding:6px 0;text-align:right;font-weight:700;">${escapeHtml(couponSummary)}</td>
                        </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:10px 0 0;color:${BRAND.sand};font-size:16px;">Total amount</td>
                    <td style="padding:10px 0 0;text-align:right;font-size:22px;font-weight:700;color:${BRAND.brass};">${formatCurrency(payload.totals.totalAfterCouponVND)}</td>
                  </tr>
                </table>
              </div>
            </div>

            ${
              pickupLocation || note
                ? `<div style="padding:18px 28px 8px;">
                    <div style="border-left:4px solid ${BRAND.terracotta};background:${BRAND.cream};border-radius:0 16px 16px 0;padding:16px;color:${BRAND.espressoMid};font-size:14px;line-height:1.65;">
                      ${pickupLocation ? `<p style="margin:0 0 8px;"><strong>Pickup location:</strong> ${escapeHtml(pickupLocation)}</p>` : ""}
                      ${note ? `<p style="margin:0;"><strong>Notes:</strong> ${escapeHtml(note)}</p>` : ""}
                    </div>
                  </div>`
                : ""
            }

            <div style="padding:22px 28px 28px;">
              <a href="mailto:${escapeHtml(payload.customer.email)}?subject=${encodeURIComponent(`Serena Spa Hoi An booking confirmation ${payload.id}`)}" style="display:inline-block;background:${BRAND.terracotta};color:${BRAND.warmWhite};border-radius:999px;padding:13px 18px;font-weight:700;text-decoration:none;">
                Reply to guest
              </a>
              <p style="margin:16px 0 0;color:${BRAND.warmGray};font-size:13px;line-height:1.6;">
                Customer confirmation email has been sent automatically from the booking mailbox. Please review details and contact the guest to confirm the appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  };
}

export async function sendBookingEmails(payload: BookingEmailPayload): Promise<SendBookingEmailsResult> {
  const config = getEmailConfig();
  if (!config) {
    return {
      skipped: true,
      customerSent: false,
      internalSent: false,
      reason: "Missing BOOKING_EMAIL_USER or BOOKING_EMAIL_APP_PASSWORD",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const from = `"${config.fromName}" <${config.user}>`;
  const customerEmail = buildCustomerEmail(payload);
  const internalEmail = buildInternalEmail(payload);

  const [customerResult, internalResult] = await Promise.allSettled([
    transporter.sendMail({
      from,
      to: payload.customer.email,
      subject: customerEmail.subject,
      text: customerEmail.text,
      html: customerEmail.html,
    }),
    transporter.sendMail({
      from,
      to: config.notifyTo,
      subject: internalEmail.subject,
      text: internalEmail.text,
      html: internalEmail.html,
      replyTo: payload.customer.email,
    }),
  ]);

  return {
    skipped: false,
    customerSent: customerResult.status === "fulfilled",
    internalSent: internalResult.status === "fulfilled",
    reason:
      customerResult.status === "rejected" || internalResult.status === "rejected"
        ? "One or more emails failed to send"
        : undefined,
  };
}
