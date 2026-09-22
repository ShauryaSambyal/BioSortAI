"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiActivity, FiArrowUpRight, FiCheck, FiTrash2 } from "react-icons/fi";

import { EASE } from "./Reveal";

const TOOLS = [
  {
    href: "/heart",
    icon: FiActivity,
    kicker: "Risk screening",
    title: "Heart attack predictor",
    description:
      "Eleven inputs, one probability. The model estimates your likelihood of heart disease and shows the exact markers that moved the number — in either direction.",
    points: [
      "Logistic regression on 15 clinical features",
      "Per-marker attribution, not just a score",
      "Computed in your browser — nothing is uploaded",
    ],
    cta: "Check my risk",
    tone: "mint",
  },
  {
    href: "/biosort",
    icon: FiTrash2,
    kicker: "Waste compliance",
    title: "Biomedical waste segregation",
    description:
      "Photograph the item in front of you. BioSort AI identifies it, assigns the correct waste category, flags the risk level and writes out the disposal protocol.",
    points: [
      "Image classification of clinical waste",
      "Category, risk level and handling guidance",
      "Colour-coded disposal instructions",
    ],
    cta: "Classify an item",
    tone: "coral",
  },
];

export default function ToolCards() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Two tools, one platform</p>
        <h2 className="display mt-5 max-w-2xl text-3xl sm:text-5xl">
          Pick the decision you need to make.
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {TOOLS.map((tool, index) => {
            const accent = tool.tone === "mint" ? "mint" : "coral";

            return (
              <motion.div
                key={tool.href}
                initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
              >
                <Link
                  href={tool.href}
                  className="panel panel-interactive edge-lit group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-9"
                >
                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline-2 ${
                        accent === "mint" ? "bg-mint/10 text-mint" : "bg-coral/10 text-coral"
                      }`}
                    >
                      <tool.icon className="text-xl" aria-hidden="true" />
                    </span>
                    <FiArrowUpRight className="text-xl text-ink-faint transition-colors duration-300 group-hover:text-mint" aria-hidden="true" />
                  </div>

                  <p className="eyebrow relative mt-7">{tool.kicker}</p>
                  <h3 className="display relative mt-3 text-2xl text-ink sm:text-3xl">
                    {tool.title}
                  </h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-ink-soft">
                    {tool.description}
                  </p>

                  <ul className="relative mt-7 flex flex-col gap-3">
                    {tool.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-ink-soft">
                        <FiCheck
                          className={`mt-0.5 shrink-0 ${
                            accent === "mint" ? "text-mint" : "text-coral"
                          }`}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <span className="relative mt-9 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    {tool.cta}
                    <span
                      className={`h-px w-8 transition-all duration-500 group-hover:w-14 ${
                        accent === "mint" ? "bg-mint" : "bg-coral"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
