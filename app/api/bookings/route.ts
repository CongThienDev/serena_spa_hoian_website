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

function getBookingDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "00";
  const day = parts.find((part) => part.type === "day")?.value ?? "00";
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  const second = parts.find((part) => part.type === "second")?.value ?? "00";

  return {
    dateCode: `${year}${month}${day}`,
    timeCode: `${hour}${minute}${second}`,
  };
}

function createBookingId(date = new Date()) {
  const { dateCode, timeCode } = getBookingDateParts(date);
  const millisecondCode = String(date.getMilliseconds()).padStart(3, "0");
  return `SRN-${dateCode}-${timeCode}-${millisecondCode}`;
}

function isReadonlyFilesystemError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? error.code : undefined;
  return code === "EROFS" || code === "EPERM";
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
      id: createBookingId(createdAt),
      createdAt: createdAt.toISOString(),
    };
    const nextBookings = [record, ...bookings];
    let persistedToFile = false;

    try {
      await writeBookings(nextBookings);
      persistedToFile = true;
    } catch (error) {
      if (isReadonlyFilesystemError(error)) {
        console.warn(`[booking-storage] Skipped file write for ${record.id}: read-only filesystem`);
      } else {
        throw error;
      }
    }

    let emailResult:
      | {
          skipped: boolean;
          customerSent: boolean;
          internalSent: boolean;
          reason?: string;
        }
      | null = null;
    try {
      emailResult = await sendBookingEmails(record);
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

    if (
      !persistedToFile &&
      (!emailResult || emailResult.skipped || (!emailResult.customerSent && !emailResult.internalSent))
    ) {
      return NextResponse.json(
        { ok: false, error: "Booking could not be persisted or emailed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, id: record.id });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save booking" }, { status: 500 });
  }
}
