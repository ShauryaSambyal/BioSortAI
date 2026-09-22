"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiActivity, FiMenu, FiX } from "react-icons/fi";

import Logo from "./Logo";
import { EASE } from "./Reveal";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/heart", label: "Heart risk" },
  { href: "/biosort", label: "BioSort" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // The bar tightens and solidifies once the hero scrolls away.
  const background = useTransform(
    scrollY,
    [0, 90],
    ["rgba(7, 11, 16, 0.35)", "rgba(7, 11, 16, 0.86)"],
  );
  const borderColor = useTransform(
    scrollY,
    [0, 90],
    ["rgba(26, 36, 48, 0.35)", "rgba(36, 49, 63, 0.9)"],
  );
  const blur = useTransform(scrollY, [0, 90], ["blur(6px)", "blur(18px)"]);

  // Close the mobile sheet on navigation. Handled on click rather than in an
  // effect so we don't trigger a cascading render after the route changes.
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <motion.div
        style={{ background, borderColor, backdropFilter: blur, WebkitBackdropFilter: blur }}
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 sm:px-5"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="BioSort AI home">
          <Logo size={30} />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-ink">BioSort AI</span>
            <span className="eyebrow mt-1 text-[9px]">Clinical Triage</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-full px-4 py-2 text-sm transition-colors"
                style={{ color: active ? "#e8eef5" : "#9aa9bb" }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-hairline-2 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
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
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden md:hidden"
            aria-label="Mobile"
          >
            <div className="panel flex flex-col gap-1 rounded-2xl p-2">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white/[0.06]"
                  style={{ color: pathname === link.href ? "#e8eef5" : "#9aa9bb" }}
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
    </header>
  );
}
