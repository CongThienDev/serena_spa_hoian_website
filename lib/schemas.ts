import { z } from "zod";

/* ── Booking Form Schema ────────────────────────────────────────────────────
   Per API_CONTRACTS.md + BOOKING_FLOW.md
─────────────────────────────────────────────────────────────────────────── */
export const bookingSchema = z.object({
  // Service selection
  service: z.string().min(1, "Please select a service"),
  duration: z.string().optional(),
  addOns: z.array(z.string()).optional().default([]),

  // Scheduling
  date: z
    .string()
    .min(1, "Please select a date")
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Please select a future date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.number().min(1).max(6).default(1),

  // Personal info
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s\-()]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  // Optional
  specialRequests: z.string().max(500, "Message is too long").optional(),
  preferredTherapist: z.string().optional(),
  language: z.enum(["en", "vi", "ko"]).default("en"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

/* ── Contact Form Schema ────────────────────────────────────────────────────
   Per API_CONTRACTS.md
─────────────────────────────────────────────────────────────────────────── */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s\-()]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(2, "Please enter a subject").max(200),
  message: z
    .string()
    .min(10, "Message is too short")
    .max(2000, "Message is too long"),
  language: z.enum(["en", "vi", "ko"]).default("en"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/* ── API Response Types ─────────────────────────────────────────────────────
─────────────────────────────────────────────────────────────────────────── */
export type ApiSuccessResponse = {
  success: true;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
};

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
