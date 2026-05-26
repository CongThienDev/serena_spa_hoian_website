import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy — Serena Spa Hội An",
  description: "Serena Spa privacy policy for personal data and booking information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <h1 className="text-h1">Privacy Policy</h1>
          <p className="text-[var(--color-warm-gray)] mt-5">
            We collect only the information needed to confirm bookings, provide treatments, and communicate with guests. Your information is handled securely and never sold to third parties.
          </p>
          <p className="text-[var(--color-warm-gray)] mt-4">
            For any privacy-related request, contact us directly at info@serenaspahoian.com.
          </p>
        </article>
      </section>
    </main>
  );
}
