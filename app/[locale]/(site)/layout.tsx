import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import FloatingContactWidget from "@/components/layout/FloatingContactWidget";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function LocalizedSiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingContactWidget />
    </>
  );
}
