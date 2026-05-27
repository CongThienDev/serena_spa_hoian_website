import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
export { default } from "@/app/(site)/gallery/page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/gallery");
}
