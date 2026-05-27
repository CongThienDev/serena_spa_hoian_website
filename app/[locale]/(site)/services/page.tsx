import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import { normalizeLocale } from "@/lib/i18n";
import LocalizedServicesClient from "@/components/sections/LocalizedServicesClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/services");
}

export default async function LocalizedServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  return <LocalizedServicesClient locale={locale} />;
}
