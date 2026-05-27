"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/data/site";
import { getDictionary } from "@/data/i18n";
import { localeFromPathname, withLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ContactAction = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
};

/**
 * FloatingContactWidget — fixed right-side contact buttons.
 * Desktop: stacked icon buttons on the right edge.
 * Mobile: bottom sticky bar (Call | Zalo | WhatsApp | Book).
 * Per MOBILE_UX.md: sticky bottom bar on mobile.
 * Per GLOBAL_STATES.md: primary conversion entry points.
 */
export default function FloatingContactWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getDictionary(locale);

  const actions: ContactAction[] = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20treatment%20at%20Serena%20Spa.`,
      color: "bg-[#25D366]",
      hoverColor: "hover:bg-[#1ebe5d]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      id: "zalo",
      label: "Zalo",
      href: `https://zalo.me/${CONTACT.zalo.replace(/\D/g, "")}`,
      color: "bg-[#0068FF]",
      hoverColor: "hover:bg-[#0057d9]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.123a.315.315 0 01-.308.252h-1.08a.314.314 0 01-.307-.38l.19-.877h-3.744l-.432 1.018a.315.315 0 01-.29.191H8.44a.315.315 0 01-.29-.437l3.85-8.9a.315.315 0 01.29-.191h4.963c.149 0 .273.105.309.25v.001zm-3.45.876l-1.497 3.483h2.386l.548-2.547-.008-.007-1.429-.929z" />
        </svg>
      ),
    },
    {
      id: "phone",
      label: "Call Us",
      href: `tel:${CONTACT.phone}`,
      color: "bg-[var(--color-terracotta)]",
      hoverColor: "hover:bg-[var(--color-terracotta-dark)]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ── Desktop: vertical stack on the right edge ──────────────────── */}
      <div
        className="hidden md:flex fixed right-5 bottom-10 flex-col items-center gap-2 z-float"
        role="complementary"
        aria-label="Quick contact"
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className={cn(
            "w-12 h-12 rounded-full bg-[var(--color-terracotta)] text-white",
            "shadow-[var(--shadow-float)] hover:bg-[var(--color-terracotta-dark)]",
            "transition-all duration-200 flex items-center justify-center",
            isExpanded && "rotate-45"
          )}
          aria-label={isExpanded ? "Close contact options" : "Open contact options"}
          aria-expanded={isExpanded}
        >
          <svg className="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Action buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center gap-2 absolute bottom-14"
            >
              {actions.map((action, i) => (
                <motion.a
                  key={action.id}
                  href={action.href}
                  target={action.id !== "phone" ? "_blank" : undefined}
                  rel={action.id !== "phone" ? "noopener noreferrer" : undefined}
                  aria-label={action.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.18, delay: i * 0.05 }}
                  className={cn(
                    "group relative w-11 h-11 rounded-full text-white flex items-center justify-center",
                    "shadow-[var(--shadow-float)] transition-all duration-200",
                    "hover:-translate-y-0.5 hover:shadow-lg",
                    action.color,
                    action.hoverColor
                  )}
                >
                  {action.icon}
                  {/* Tooltip */}
                  <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[var(--color-espresso)] text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {action.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile: sticky bottom bar ──────────────────────────────────── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-float"
        role="navigation"
        aria-label="Quick contact"
      >
        <div className="bg-[var(--color-warm-white)] border-t border-[var(--color-sand)] grid grid-cols-4 divide-x divide-[var(--color-sand)]">
          {/* Call */}
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex flex-col items-center justify-center gap-1 py-3 text-[var(--color-espresso)] hover:text-[var(--color-terracotta)] transition-colors duration-200 min-h-[56px]"
            aria-label="Call us"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-[10px] font-medium tracking-wide">{t.mobileNav.callUs}</span>
          </a>

          {/* Zalo */}
          <a
            href={`https://zalo.me/${CONTACT.zalo.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 text-[#0068FF] hover:opacity-80 transition-opacity duration-200 min-h-[56px]"
            aria-label="Zalo"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.123a.315.315 0 01-.308.252h-1.08a.314.314 0 01-.307-.38l.19-.877h-3.744l-.432 1.018a.315.315 0 01-.29.191H8.44a.315.315 0 01-.29-.437l3.85-8.9a.315.315 0 01.29-.191h4.963c.149 0 .273.105.309.25v.001zm-3.45.876l-1.497 3.483h2.386l.548-2.547-.008-.007-1.429-.929z" />
            </svg>
            <span className="text-[10px] font-medium tracking-wide">Zalo</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20treatment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 text-[#25D366] hover:opacity-80 transition-opacity duration-200 min-h-[56px]"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-[10px] font-medium tracking-wide">WhatsApp</span>
          </a>

          {/* Book Now */}
          <Link
            href={withLocalePath(locale, "/booking")}
            className="flex flex-col items-center justify-center gap-1 py-3 bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-dark)] transition-colors duration-200 min-h-[56px]"
            aria-label="Book a treatment"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-medium tracking-wide">{t.header.bookNow}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
