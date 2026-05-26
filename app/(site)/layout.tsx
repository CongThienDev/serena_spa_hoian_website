import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import FloatingContactWidget from "@/components/layout/FloatingContactWidget";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
