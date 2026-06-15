import type { Metadata } from "next";
import { normalizeLocale } from "@/lib/i18n";
import ServiceSlugPage, {
  buildServiceMetadata,
} from "@/app/(site)/services/[slug]/page";
import { SERVICES } from "@/data/services";

export function generateStaticParams() {
  return SERVICES.flatMap((service) => [
    { locale: "vi", slug: service.slug },
    { locale: "en", slug: service.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  return buildServiceMetadata(slug, locale);
}

export default async function LocalizedServiceSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  return <ServiceSlugPage params={Promise.resolve({ slug })} locale={locale} />;
}
