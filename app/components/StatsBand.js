"use client";

import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";
import StatCounter from "./StatCounter";

const STATS = [
  {
    value: 17.9,
    decimals: 1,
    suffix: "M",
    label: "Deaths from cardiovascular disease worldwide, every year",
    source: "WHO",
  },
  {
    value: 80,
    suffix: "%",
    label: "Of premature heart attacks and strokes are preventable",
    source: "WHO",
  },
  {
    value: 23.3,
    decimals: 1,
    suffix: "M",
    label: "Projected cardiovascular deaths by 2030",
    source: "WHO",
  },
  {
    value: 15,
    label: "Clinical features read for every single prediction",
    source: "This model",
  },
];

export default function StatsBand() {
  return (
    <section className="relative bg-sage px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">The stakes</p>
          <h2 className="display mt-5 max-w-3xl text-3xl sm:text-5xl">
            Most heart attacks are <span className="text-coral">detectable</span> before they happen.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
            Cardiovascular disease rarely announces itself. The signals sit quietly in numbers your
            clinic already collects — blood pressure, cholesterol, an ECG trace, how your heart
            responds to effort. This platform reads those same signals and puts a number on them.
          </p>
        </Reveal>

        <StaggerGroup className="cut-plate mt-16 grid gap-px overflow-hidden bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} className="bg-abyss">
              <div className="group h-full bg-abyss p-7 transition-colors duration-500 hover:bg-sage">
                <p className="display text-4xl text-ink sm:text-5xl">
                  <StatCounter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix ?? ""}
                  />
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{stat.label}</p>
                <p className="eyebrow mt-5 text-[10px] text-ink-faint">{stat.source}</p>
                <span className="mt-6 block h-px w-10 bg-hairline-2 transition-all duration-500 group-hover:w-20 group-hover:bg-mint" />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
