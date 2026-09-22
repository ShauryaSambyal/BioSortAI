"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiActivity, FiArrowRight, FiCpu, FiTrash2, FiZap } from "react-icons/fi";

import { EASE } from "./Reveal";

/**
 * Each headline line rises in as a block. Deliberately calm: the hero is
 * above the fold, so nothing here is tied to scroll position.
 */
const LINES = [
  { id: "risk", lead: "Catch", highlight: "heart risk", tail: "early.", delay: 0.08 },
  { id: "sort", lead: "Sort", highlight: "clinical waste", tail: "safely.", delay: 0.18 },
];

const TRUST = [
  { icon: FiCpu, label: "15 clinical markers" },
  { icon: FiZap, label: "Runs on your device" },
  { icon: FiActivity, label: "Logistic regression" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      {/* One soft bloom for depth behind the headline. */}
      <div
        className="glow glow-mint left-1/2 top-[-280px] h-[440px] w-[760px] -translate-x-1/2 opacity-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-14 text-center sm:px-6 sm:pt-20">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="panel mx-auto inline-flex items-center gap-2.5 rounded-full px-4 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
          <span className="eyebrow text-ink-soft">AI-assisted clinical triage</span>
        </motion.p>

        {/* Typography is set with utilities rather than the `.display` helper so the
            leading here is not overridden by that class's tighter value. */}
        <h1 className="mt-7 text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[3.25rem] sm:leading-[1.07] lg:text-[4rem]">
          {LINES.map((line) => (
            <motion.span
              key={line.id}
              className="block"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: line.delay, ease: EASE }}
            >
              {line.lead} <span className="text-gradient">{line.highlight}</span> {line.tail}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft"
        >
          Enter your vitals for an instant heart-attack risk estimate, or photograph biomedical waste
          to get the safe disposal protocol. Everything runs in your browser.
        </motion.p>

        {/* The two doors into the product. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <Link href="/heart" className="btn btn-primary btn-lg">
            <FiActivity className="text-base" aria-hidden="true" />
            Check heart attack risk
            <FiArrowRight className="text-sm opacity-70" aria-hidden="true" />
          </Link>

          <Link href="/biosort" className="btn btn-outline btn-lg">
            <FiTrash2 className="text-base" aria-hidden="true" />
            Segregate biomedical waste
          </Link>
        </motion.div>

        <motion.ul
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
        >
          {TRUST.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-[13px] text-ink-faint">
              <item.icon className="text-sm text-mint/80" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
