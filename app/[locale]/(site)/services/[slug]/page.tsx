import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { normalizeLocale } from "@/lib/i18n";
import ServiceSlugPage, {
  generateMetadata as generateBaseMetadata,
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
  const base = await generateBaseMetadata({ params: Promise.resolve({ slug }) });
  const path = `/services/${slug}`;

  return {
    ...base,
    alternates: {
      canonical: absoluteUrl(`/${locale}${path}`),
      languages: {
        vi: absoluteUrl(`/vi${path}`),
        en: absoluteUrl(`/en${path}`),
        "x-default": absoluteUrl(`/vi${path}`),
      },
    },
    openGraph: {
      ...base.openGraph,
      url: absoluteUrl(`/${locale}${path}`),
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
  };
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
