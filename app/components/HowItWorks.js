"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "./Reveal";

const STEPS = [
  {
    id: "01",
    title: "Enter your numbers",
    body: "Eleven fields — the same ones recorded during a standard cardiac workup. Sliders and segmented controls keep every value inside the range the model was trained on.",
  },
  {
    id: "02",
    title: "The model scores them",
    body: "Your inputs are one-hot encoded, standardised against the training scaler, then passed through a logistic-regression classifier. The result is a calibrated probability of heart disease.",
  },
  {
    id: "03",
    title: "Read the evidence",
    body: "You get the probability, the risk band, and a ranked breakdown of which markers raised or lowered it — so the number is explainable instead of a black box.",
  },
  {
    id: "04",
    title: "Act on it",
    body: "Clear guidance for the next appointment, plus safe, colour-coded disposal instructions for any biomedical waste your clinic produces along the way.",
  },
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">How it works</p>
            <h2 className="display mt-5 text-3xl sm:text-5xl">
              From numbers to a
              <br />
              <span className="text-mint">next action</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              The heart model is a logistic regression — the same family of model used in clinical
              risk scores. That means every prediction can be traced back to the inputs that produced
              it.
            </p>
          </div>

          <ol className="relative flex flex-col gap-4">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
                className="panel group relative overflow-hidden rounded-2xl p-6 transition-colors duration-500 hover:border-hairline-2 sm:p-7"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs tracking-[0.2em] text-mint">{step.id}</span>
                  <div>
                    <h3 className="text-lg font-medium text-ink sm:text-xl">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                  </div>
                </div>

                <span
                  className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-mint to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
