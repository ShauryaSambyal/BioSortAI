"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "./Reveal";

/** Colour categories as defined by the Bio-Medical Waste Management Rules, 2016. */
const CATEGORIES = [
  {
    name: "Yellow",
    colour: "#fbbf24",
    summary: "Human anatomical, soiled, chemical and microbiological waste",
    examples: [
      "Anatomical waste and tissues",
      "Soiled dressings and swabs",
      "Expired or discarded medicines",
      "Chemical and microbiological waste",
    ],
  },
  {
    name: "Red",
    colour: "#fb7185",
    summary: "Contaminated recyclable plastic",
    examples: [
      "IV tubing and bottles",
      "Urine bags and catheters",
      "Examination gloves",
      "Contaminated plastic packaging",
    ],
  },
  {
    name: "White",
    colour: "#e8eef5",
    summary: "Sharps in puncture-proof containers",
    examples: [
      "Needles and syringes",
      "Scalpel blades",
      "Broken ampoules",
      "Suture needles",
    ],
  },
  {
    name: "Blue",
    colour: "#60a5fa",
    summary: "Glassware and metallic waste",
    examples: [
      "Broken and discarded glass",
      "Glass bottles and vials",
      "Metallic implants",
      "Cardboard and paper waste",
    ],
  },
];

export default function WasteCategoryLegend() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Reference</p>
        <h2 className="display mt-5 max-w-2xl text-2xl sm:text-4xl">
          The four colour categories, and what belongs in each.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
          BioSort assigns a category to every item it reads. Use this as a quick sanity check on the
          classification, and as a training aid for your team.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <motion.article
              key={category.name}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
              className="panel panel-interactive flex flex-col rounded-2xl p-6"
            >
              <span
                className="h-1.5 w-12 rounded-full"
                style={{ background: category.colour }}
                aria-hidden="true"
              />
              <h3 className="mt-5 text-lg font-medium" style={{ color: category.colour }}>
                {category.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-faint">{category.summary}</p>

              <ul className="mt-5 flex flex-col gap-2.5 border-t border-hairline pt-5">
                {category.examples.map((example) => (
                  <li key={example} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                    <span
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: category.colour }}
                      aria-hidden="true"
                    />
                    {example}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <p className="eyebrow mt-8 text-[10px] text-ink-faint">
          Categories per the Bio-Medical Waste Management Rules, 2016 — always defer to your
          facility&apos;s SOP.
        </p>
      </div>
    </section>
  );
}
