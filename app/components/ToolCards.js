"use client";

import Image from "next/image";
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
    tone: "moss",
    image:
      "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A clinician in scrubs holding a heart-shaped stethoscope",
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
    image:
      "https://images.unsplash.com/photo-1763310225071-af00bef26d1c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "An orange biohazard bin standing above a stack of medical supplies",
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
            const isMoss = tool.tone === "moss";

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
                  className="panel panel-interactive group relative flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-sage-2">
                    <Image
                      src={tool.image}
                      alt={tool.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-forest/10 to-transparent" />

                    <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white/90 text-forest shadow-sm backdrop-blur">
                      <tool.icon className="text-lg" aria-hidden="true" />
                    </span>

                    <FiArrowUpRight
                      className="absolute right-5 top-5 text-xl text-white/80 transition-colors duration-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <p className="eyebrow">{tool.kicker}</p>
                    <h3 className="display mt-3 text-2xl text-ink sm:text-3xl">{tool.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">{tool.description}</p>

                    <ul className="mt-7 flex flex-col gap-3">
                      {tool.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-ink-soft">
                          <FiCheck
                            className={`mt-0.5 shrink-0 ${isMoss ? "text-moss" : "text-coral"}`}
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-ink">
                      {tool.cta}
                      <span
                        className={`h-px w-8 transition-all duration-300 group-hover:w-12 ${
                          isMoss ? "bg-moss" : "bg-coral"
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
