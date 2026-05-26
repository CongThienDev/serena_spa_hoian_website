import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ — Serena Spa Hội An",
  description: "Frequently asked questions about Serena Spa services, booking, and policies.",
  path: "/faq",
});

const faq = [
  ["Do I need to book in advance?", "Advance booking is recommended, especially for peak evening hours. Same-day bookings are welcome when slots are available."],
  ["How early should I arrive?", "Please arrive 10-15 minutes before your appointment to enjoy a calm check-in ritual."],
  ["Can I request a specific therapist?", "Yes. You can mention your preferred therapist during booking and we will do our best to arrange."],
  ["Do you offer couple rooms?", "Yes, we have private couple treatment rooms and curated couple wellness packages."],
];

export default function FaqPage() {
  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-content">
          <SectionHeading eyebrow="Support" title="Frequently Asked Questions" titleAs="h1" className="mb-10" />
          <div className="space-y-4">
            {faq.map(([q, a]) => (
              <div key={q} className="card p-6">
                <h2 className="font-serif text-h4">{q}</h2>
                <p className="text-[var(--color-warm-gray)] mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
