"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiActivity, FiMenu, FiX } from "react-icons/fi";

import { EASE } from "./Reveal";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/heart", label: "Heart risk" },
  { href: "/biosort", label: "BioSort" },
];

/**
 * Floating navbar: detached from the page edges with a margin on the top and
 * both sides, rounded, and lifted with a border + shadow. It drops in from
 * above on load. Once the user scrolls, the shadow deepens so the bar reads
 * as a distinct layer over the content beneath it.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Shadow state: flat at the top of the page, lifted once content passes
  // underneath. A static style change rather than motion, so it applies for
  // reduced-motion users too.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet when a link is clicked.
  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5 lg:px-8"
    >
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-2xl border bg-white/85 pl-4 pr-3 backdrop-blur-md transition-[box-shadow,border-color] duration-300 sm:pl-5 ${
          scrolled
            ? "border-hairline-2 shadow-[0_12px_32px_-16px_rgba(24,40,14,0.28)]"
            : "border-hairline shadow-[0_2px_12px_-6px_rgba(24,40,14,0.12)]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="BioSort AI home">
          <Logo size={28} />
          <span className="text-[17px] font-semibold tracking-tight text-ink">BioSort AI</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-4 py-2 text-sm transition-colors duration-200 hover:text-moss ${
                  active ? "font-medium text-ink" : "text-ink-soft"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute inset-x-4 bottom-1 h-0.5 bg-forest"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/heart" className="btn btn-primary btn-md hidden sm:inline-flex">
            <FiActivity className="text-[15px]" />
            Check risk
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="btn btn-outline btn-md px-3 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            aria-label="Mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-hairline bg-white p-3 shadow-[0_12px_32px_-16px_rgba(24,40,14,0.28)] md:hidden"
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-sage ${
                    pathname === link.href ? "font-medium text-ink" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/heart" onClick={closeMenu} className="btn btn-primary btn-md mt-1 w-full">
                <FiActivity className="text-[15px]" />
                Check heart risk
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
