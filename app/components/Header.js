"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiActivity, FiMenu, FiX } from "react-icons/fi";

import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/heart", label: "Heart risk" },
  { href: "/biosort", label: "BioSort" },
];

/**
 * Flat bordered bar: always readable, no scroll-linked effects. The active
 * link is underlined rather than pill-highlighted, so navigation is obvious.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile sheet when a link is clicked.
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
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
                    className="absolute inset-x-4 -bottom-px h-0.5 bg-forest"
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

      {open && (
        <nav
          className="border-t border-hairline bg-white md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
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
        </nav>
      )}
    </header>
  );
}
