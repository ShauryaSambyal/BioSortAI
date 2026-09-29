"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiActivity, FiArrowRight, FiCheck, FiTrash2 } from "react-icons/fi";

import { EASE } from "./Reveal";

/**
 * Hero photography: a smartwatch showing a live heart-rate trace, washed in
 * sage so the oversized vitals trace reads on top of it.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1659366100463-9e29a63adcc2?auto=format&fit=crop&w=1800&q=80";

const TRUST = [
  "Runs entirely in your browser",
  "No sign-up, no data collected",
  "Logistic regression on 15 markers",
];

/** One ECG cycle, repeated so the trace can be animated end to end. */
const VITALS_PATH = [
  "M 0 70",
  "H 90",
  "Q 96 70 102 62 Q 108 54 114 62 Q 120 70 126 70",
  "H 168",
  "L 176 70 L 184 78 L 196 14 L 208 122 L 220 70",
  "H 268",
  "Q 276 70 288 52 Q 302 70 312 70",
  "H 400",
  "L 408 70 L 416 78 L 428 14 L 440 122 L 452 70",
  "H 500",
  "Q 508 70 520 52 Q 534 70 544 70",
  "H 632",
  "L 640 70 L 648 78 L 660 14 L 672 122 L 684 70",
  "H 760",
].join(" ");

/**
 * The page-gutter ledger. spade.com runs a stack of thin rules down each
 * edge of the hero, alternating a full-width and a short dash. It is the
 * cheapest way to make a white page feel drawn rather than blank.
 */
function LedgerColumn({ side }) {
  return (
    <div
      className={`ledger-col max-lg:hidden ${side === "left" ? "left-0" : "right-0 items-end"}`}
      aria-hidden="true"
    >
      {Array.from({ length: 48 }).map((_, index) => (
        <span
          key={index}
          className={`h-px shrink-0 ${index % 5 === 0 ? "w-[18px]" : "w-[10px]"}`}
          style={{ background: "var(--color-forest)" }}
        />
      ))}
    </div>
  );
}

/** Animated vitals trace that sits over the hero photograph. */
function VitalsTrace() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 760 140"
      className="h-auto w-full"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d={VITALS_PATH}
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, delay: 0.45, ease: "easeInOut" }}
      />
    </svg>
  );
}

/**
 * The hero, rebuilt on spade.com's background concept: a white page with a
 * ledger of rules in each gutter, holding a sage plate whose corners are
 * notched rather than rounded. Content inside is centred and typographic,
 * with a washed photograph carrying the vitals trace as the one graphic.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden bg-white">
      <LedgerColumn side="left" />
      <LedgerColumn side="right" />

      <div className="relative px-5 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="cut-plate relative overflow-hidden bg-sage">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            <motion.span
              {...enter(0)}
              className="eyebrow inline-flex items-center gap-2.5 text-moss"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden="true" />
              AI-assisted clinical triage
            </motion.span>

            <motion.h1
              {...enter(0.08)}
              className="display mt-7 max-w-3xl text-balance text-[2.6rem] leading-[1.03] text-ink sm:text-6xl lg:text-[4.25rem]"
            >
              Clinical answers, <span className="text-moss">in seconds.</span>
            </motion.h1>

            <motion.p
              {...enter(0.16)}
              className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              Check your heart-attack risk from eleven vitals, or photograph biomedical waste to get
              its disposal protocol — free, instant, nothing leaves your device.
            </motion.p>

            <motion.div
              {...enter(0.24)}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link href="/heart" className="btn btn-primary btn-lg">
                <FiActivity aria-hidden="true" />
                Check heart attack risk
                <FiArrowRight className="text-sm opacity-70" aria-hidden="true" />
              </Link>

              <Link href="/biosort" className="btn btn-outline btn-lg">
                <FiTrash2 aria-hidden="true" />
                Segregate biomedical waste
              </Link>
            </motion.div>

            <motion.ul
              {...enter(0.32)}
              className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5"
            >
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <FiCheck className="text-sm text-moss" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Washed photograph carrying the vitals trace — the one hero graphic. */}
          <motion.div
            {...enter(0.4)}
            className="relative mx-auto w-full max-w-[900px] px-5 pb-10 sm:px-10 sm:pb-14"
          >
            <div className="cut-plate relative aspect-[900/435] w-full overflow-hidden bg-sage-3">
              <Image
                src={HERO_IMAGE}
                alt="A person checking the heart-rate trace on their smartwatch"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-sage/50" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center px-8 sm:px-16">
                <VitalsTrace />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
