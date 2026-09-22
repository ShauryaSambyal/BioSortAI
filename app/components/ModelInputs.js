"use client";

import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";
import { FIELD_GROUPS, FEATURE_COLUMNS } from "@/lib/heartModel";

/**
 * Shows exactly what the model consumes. Sourced from the same `FIELD_GROUPS`
 * that drives the predictor form, so this section can never drift from the
 * deployed form.
 */
export default function ModelInputs() {
  const fields = FIELD_GROUPS.flatMap((group) =>
    group.fields.map((field) => ({ ...field, group: group.title })),
  );

  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Inside the model</p>
            <h2 className="display mt-5 text-3xl sm:text-5xl">
              What the model
              <br />
              actually reads.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Nothing hidden, nothing hand-waved. These are the inputs, and the classifier expands
              them into{" "}
              <span className="text-ink">{FEATURE_COLUMNS.length} engineered features</span> before
              scoring.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-faint">
              Categorical fields are one-hot encoded with the first category dropped as the reference
              level; continuous fields are standardised against the means and scales the model was
              trained on.
            </p>
          </Reveal>

          <StaggerGroup
            className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2"
            stagger={0.05}
          >
            {fields.map((field) => (
              <StaggerItem key={field.id} className="bg-abyss">
                <div className="group h-full bg-abyss px-5 py-5 transition-colors duration-500 hover:bg-panel">
                  <p className="eyebrow text-[10px] text-ink-faint">{field.group}</p>
                  <p className="mt-2.5 text-sm text-ink">{field.label}</p>
                  <p className="mt-1.5 font-mono text-[11px] text-mint/80">
                    {field.kind === "slider"
                      ? `${field.min}–${field.max} ${field.unit}`
                      : field.options.map((option) => option.label).join(" · ")}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
