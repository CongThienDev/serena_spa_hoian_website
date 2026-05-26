"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, CONTACT, type NavItem } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation drawer — slides in from the right.
 * Per MOBILE_UX.md: hamburger menu, full-screen overlay, tap targets 44px.
 * Per WIREFRAMES/interactions/service-hover.md: mobile accordion pattern.
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "lg:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11",
          "text-[var(--color-espresso)] hover:text-[var(--color-terracotta)]",
          "transition-colors duration-200"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
      >
        <span
          className={cn(
            "block w-5 h-px bg-current transition-all duration-300 origin-center",
            isOpen && "translate-y-[7px] rotate-45"
          )}
        />
        <span
          className={cn(
            "block w-5 h-px bg-current transition-all duration-300",
            isOpen && "opacity-0 scale-x-0"
          )}
        />
        <span
          className={cn(
            "block w-5 h-px bg-current transition-all duration-300 origin-center",
            isOpen && "-translate-y-[7px] -rotate-45"
          )}
        />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-nav lg:hidden"
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              "fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-nav",
              "bg-[var(--color-cream)] flex flex-col overflow-y-auto"
            )}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-sand)]">
              <Link
                href="/"
                onClick={close}
                className="font-serif text-xl text-[var(--color-espresso)]"
              >
                Serena Spa
              </Link>
              <button
                onClick={close}
                className="w-11 h-11 flex items-center justify-center text-[var(--color-espresso-mid)]"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <ul className="flex-1 px-6 py-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  onClose={close}
                />
              ))}
            </ul>

            {/* Bottom — contact actions */}
            <div className="px-6 py-6 border-t border-[var(--color-sand)] space-y-3">
              <Link
                href="/booking"
                onClick={close}
                className="btn btn-primary w-full justify-center"
              >
                Book Now
              </Link>
              <a
                href={`tel:${CONTACT.phone}`}
                className="btn btn-outline w-full justify-center"
              >
                Call Us
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

type MobileNavItemProps = {
  item: NavItem;
  isActive: boolean;
  onClose: () => void;
};

function MobileNavItem({ item, isActive, onClose }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            "flex-1 py-3 text-base font-medium",
            "text-[var(--color-espresso)] hover:text-[var(--color-terracotta)]",
            "transition-colors duration-200",
            isActive && "text-[var(--color-terracotta)]"
          )}
        >
          {item.label}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className={cn(
              "w-10 h-10 flex items-center justify-center",
              "text-[var(--color-warm-gray)] hover:text-[var(--color-terracotta)]",
              "transition-colors duration-200"
            )}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
            aria-expanded={isExpanded}
          >
            <svg
              className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180")}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Accordion children */}
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden pl-4"
          >
            {item.children?.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onClose}
                  className={cn(
                    "block py-2.5 text-sm",
                    "text-[var(--color-espresso-mid)] hover:text-[var(--color-terracotta)]",
                    "transition-colors duration-200"
                  )}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
