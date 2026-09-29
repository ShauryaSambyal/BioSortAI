"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiActivity, FiTrash2 } from "react-icons/fi";

import { EASE } from "./Reveal";

export default function ClosingCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-4 pb-8 pt-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="cut-plate relative overflow-hidden bg-sage px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <p className="eyebrow">Start now</p>
          <h2 className="display mx-auto mt-6 max-w-3xl text-3xl sm:text-5xl">
            The earliest signal is the one you <span className="text-moss">act on</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Two minutes, no sign-up, no data leaving your device. Run the numbers, then decide what to
            do with them.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/heart" className="btn btn-primary btn-lg">
              <FiActivity className="text-base" aria-hidden="true" />
              Check heart attack risk
            </Link>
            <Link href="/biosort" className="btn btn-outline btn-lg">
              <FiTrash2 className="text-base" aria-hidden="true" />
              Segregate biomedical waste
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
