import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/booking-email";

type BookingPayload = {
  locale: "vi" | "en";
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
    serviceId: string;
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
    code: "SAVE20" | "EXTRA30";
    discountVND: number;
    extraMinutes: number;
  } | null;
};

type StoredBooking = BookingPayload & {
  id: string;
  createdAt: string;
};

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");

function getBookingDateCode(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "00";
  const day = parts.find((part) => part.type === "day")?.value ?? "00";

  return `${year}${month}${day}`;
}

function createBookingId(bookings: StoredBooking[], date = new Date()) {
  const dateCode = getBookingDateCode(date);
  const prefix = `SRN-${dateCode}-`;
  const nextSequence =
    bookings.reduce((max, booking) => {
      if (!booking.id.startsWith(prefix)) return max;
      const sequence = Number(booking.id.slice(prefix.length));
      return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
    }, 0) + 1;

  return `${prefix}${String(nextSequence).padStart(3, "0")}`;
}

async function readBookings(): Promise<StoredBooking[]> {
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeBookings(bookings: StoredBooking[]) {
  await fs.mkdir(path.dirname(BOOKINGS_FILE), { recursive: true });
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf8");
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as BookingPayload;
    if (!payload?.customer?.name || !payload?.customer?.phone || !payload?.customer?.email) {
      return NextResponse.json({ ok: false, error: "Missing customer info" }, { status: 400 });
    }
    if (!payload?.schedule?.date || !payload?.schedule?.time) {
      return NextResponse.json({ ok: false, error: "Missing schedule info" }, { status: 400 });
    }
    if (!payload?.items?.length) {
      return NextResponse.json({ ok: false, error: "Booking cart is empty" }, { status: 400 });
    }

    const bookings = await readBookings();
    const createdAt = new Date();
    const record: StoredBooking = {
      ...payload,
      id: createBookingId(bookings, createdAt),
      createdAt: createdAt.toISOString(),
    };
    bookings.unshift(record);
    await writeBookings(bookings);

    try {
      const emailResult = await sendBookingEmails(record);
      if (emailResult.skipped) {
        console.warn(`[booking-email] Skipped for ${record.id}: ${emailResult.reason}`);
      } else if (!emailResult.customerSent || !emailResult.internalSent) {
        console.error(
          `[booking-email] Partial failure for ${record.id}: customerSent=${emailResult.customerSent}, internalSent=${emailResult.internalSent}`,
        );
      }
    } catch (error) {
      console.error(`[booking-email] Unexpected failure for ${record.id}`, error);
    }

    return NextResponse.json({ ok: true, id: record.id });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save booking" }, { status: 500 });
  }
}
