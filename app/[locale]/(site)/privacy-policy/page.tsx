import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import { normalizeLocale } from "@/lib/i18n";
import PrivacyPolicyPage from "@/app/(site)/privacy-policy/page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/privacy-policy");
}

export default async function LocalizedPrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  return <PrivacyPolicyPage locale={locale} />;
}
