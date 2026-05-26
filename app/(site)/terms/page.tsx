import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions — Serena Spa Hội An",
  description: "Booking terms, cancellation policy, and service conditions at Serena Spa Hội An.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <h1 className="text-h1">Terms & Conditions</h1>
          <p className="text-[var(--color-warm-gray)] mt-5">
            Appointments are subject to availability. Please inform us in advance for cancellations or rescheduling to ensure the best service experience for all guests.
          </p>
          <p className="text-[var(--color-warm-gray)] mt-4">
            By confirming a booking, you agree to our treatment and arrival policies.
          </p>
        </article>
      </section>
    </main>
  );
}
