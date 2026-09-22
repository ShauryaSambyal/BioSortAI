"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiAlertTriangle, FiActivity, FiRefreshCw, FiRotateCcw, FiZap } from "react-icons/fi";

import RiskGauge from "./RiskGauge";
import SegmentedField from "./SegmentedField";
import SliderField from "./SliderField";
import { EASE } from "./Reveal";
import {
  DEFAULT_INPUT,
  FEATURE_COLUMNS,
  FIELD_GROUPS,
  RISK_BANDS,
  predictHeartRisk,
  validateInput,
} from "@/lib/heartModel";

/** Illustrative input sets so the model can be exercised without typing. */
const PRESETS = [
  {
    label: "Reassuring profile",
    hint: "Younger, normotensive, upsloping ST segment",
    value: {
      ...DEFAULT_INPUT,
      age: 34,
      sex: "F",
      restingBP: 112,
      cholesterol: 172,
      maxHR: 178,
      oldpeak: 0,
      fastingBS: 0,
      chestPainType: "ATA",
      restingECG: "Normal",
      exerciseAngina: "N",
      stSlope: "Up",
    },
  },
  {
    label: "Elevated profile",
    hint: "Older, hypertensive, asymptomatic with exertional angina",
    value: {
      ...DEFAULT_INPUT,
      age: 68,
      sex: "M",
      restingBP: 168,
      cholesterol: 342,
      maxHR: 104,
      oldpeak: 3.4,
      fastingBS: 1,
      chestPainType: "ASY",
      restingECG: "ST",
      exerciseAngina: "Y",
      stSlope: "Flat",
    },
  },
];

/** Where the probability sits across the four risk bands. */
function BandScale({ probability, band }) {
  return (
    <div className="relative pb-6">
      <div className="flex h-2 w-full overflow-hidden rounded-full">
        {RISK_BANDS.map((segment) => {
          const upper = segment.max === Infinity ? 1 : segment.max;
          const width = (upper - segment.min) * 100;
          if (width <= 0) return null;
          return (
            <span
              key={segment.key}
              className="h-full transition-opacity duration-500"
              style={{
                width: `${width}%`,
                background: segment.stroke,
                opacity: segment.key === band.key ? 0.95 : 0.2,
              }}
            />
          );
        })}
      </div>

      <motion.span
        className="absolute top-[-4px] h-4 w-[3px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)]"
        style={{ left: `${probability * 100}%` }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
        aria-hidden="true"
      />

      {RISK_BANDS.slice(0, -1).map((segment) => (
        <span
          key={segment.key}
          className="tabular absolute top-4 -translate-x-1/2 font-mono text-[10px] text-ink-faint"
          style={{ left: `${segment.max * 100}%` }}
        >
          {Math.round(segment.max * 100)}%
        </span>
      ))}
    </div>
  );
}

function FactorList({ title, items, tone }) {
  if (!items.length) {
    return (
      <div>
        <p className="eyebrow">{title}</p>
        <p className="mt-4 text-sm text-ink-faint">No marker in this group moved the score.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 flex flex-col gap-4">
        {items.map((item, index) => (
          <motion.li
            key={item.feature}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.07, ease: EASE }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm leading-snug text-ink-soft">{item.label}</span>
              <span className="tabular shrink-0 font-mono text-xs" style={{ color: tone }}>
                ×{item.oddsMultiplier.toFixed(2)}
              </span>
            </div>
            <div className="risk-bar mt-2">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(item.share * 100, 4)}%` }}
                transition={{ duration: 0.9, delay: 0.45 + index * 0.07, ease: EASE }}
                style={{ background: tone }}
              />
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function HeartPredictor() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [result, setResult] = useState(null);
  const [scoring, setScoring] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  const timerRef = useRef(null);
  const resultRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const errors = validateInput(input);
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!result || !resultRef.current) return;
    resultRef.current.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [result, reduceMotion]);

  const update = (id, value) => {
    setInput((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasErrors || scoring) return;

    // The model is synchronous and effectively instant; the brief scoring state
    // exists so the reveal reads as a transition rather than a flicker.
    const prediction = predictHeartRisk(input);
    setScoring(true);
    setResult(null);

    timerRef.current = window.setTimeout(
      () => {
        setResult(prediction);
        setPlayKey((key) => key + 1);
        setScoring(false);
      },
      reduceMotion ? 0 : 420,
    );
  };

  const reset = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setInput(DEFAULT_INPUT);
    setResult(null);
    setScoring(false);
  };

  return (
    <div className="relative">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="panel edge-lit relative mx-auto flex w-full max-w-3xl flex-col gap-10 rounded-3xl p-6 sm:p-10"
      >
        {FIELD_GROUPS.map((group, groupIndex) => (
          <fieldset key={group.id} className="flex flex-col gap-7">
            <div className="flex flex-col gap-1.5 border-b border-hairline pb-4">
              <legend className="eyebrow text-mint">
                {String(groupIndex + 1).padStart(2, "0")} — {group.title}
              </legend>
              <p className="text-xs text-ink-faint">{group.caption}</p>
            </div>

            {group.id === "vitals" ? (
              <div className="grid gap-x-9 gap-y-7 sm:grid-cols-2">
                {group.fields.map((field) => (
                  <SliderField
                    key={field.id}
                    field={field}
                    value={input[field.id]}
                    onChange={update}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-7">
                {group.fields.map((field) => (
                  <SegmentedField
                    key={field.id}
                    field={field}
                    value={input[field.id]}
                    onChange={update}
                  />
                ))}
              </div>
            )}
          </fieldset>
        ))}

        <div className="flex flex-col gap-4 border-t border-hairline pt-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1">Try a preset</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                title={preset.hint}
                onClick={() => {
                  setInput(preset.value);
                  setResult(null);
                }}
                className="rounded-full border border-hairline-2 bg-white/[0.03] px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-mint/50 hover:text-ink"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.button
              type="submit"
              disabled={scoring || hasErrors}
              whileHover={scoring || hasErrors ? undefined : { y: -2 }}
              whileTap={scoring || hasErrors ? undefined : { scale: 0.985 }}
              className="btn btn-primary btn-lg flex-1"
            >
              {scoring ? (
                <>
                  <FiRefreshCw className="animate-spin text-base" />
                  Scoring {FEATURE_COLUMNS.length} features…
                </>
              ) : (
                <>
                  <FiActivity className="text-base" />
                  Estimate my heart attack risk
                </>
              )}
            </motion.button>

            <button type="button" onClick={reset} className="btn btn-outline btn-lg sm:w-auto">
              <FiRotateCcw className="text-sm" />
              Reset
            </button>
          </div>

          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-faint">
            <FiZap className="mt-0.5 shrink-0 text-mint/70" aria-hidden="true" />
            Everything is computed locally in your browser. No input is transmitted or stored.
          </p>
        </div>
      </form>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={playKey}
            ref={resultRef}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mx-auto mt-8 w-full max-w-3xl scroll-mt-28"
          >
            <div className="panel edge-lit relative overflow-hidden rounded-3xl p-6 sm:p-10">
              <div
                className="glow left-1/2 top-[-120px] h-[300px] w-[520px] -translate-x-1/2 opacity-60"
                style={{ background: `radial-gradient(circle, ${result.band.stroke}55, transparent 68%)` }}
                aria-hidden="true"
              />

              <div className="relative flex flex-col items-center">
                <p className="eyebrow">Estimated probability of heart disease</p>
                <div className="mt-6 w-full max-w-sm">
                  <RiskGauge
                    probability={result.probability}
                    band={result.band}
                    playKey={playKey}
                  />
                </div>
                <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-ink-soft">
                  {result.band.blurb}
                </p>
              </div>

              <div className="relative mt-10">
                <BandScale probability={result.probability} band={result.band} />
              </div>

              <div className="relative mt-8 grid gap-10 border-t border-hairline pt-8 sm:grid-cols-2">
                <FactorList
                  title="Markers raising risk"
                  items={result.contributors}
                  tone={result.band.stroke}
                />
                <FactorList title="Markers lowering risk" items={result.protectors} tone="#34d399" />
              </div>

              <div className="relative mt-9 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
                <div className="bg-abyss px-4 py-3.5">
                  <p className="eyebrow text-[10px]">Model log-odds</p>
                  <p className="tabular mt-1.5 font-mono text-sm text-ink">
                    z = {result.logOdds.toFixed(2)}
                  </p>
                </div>
                <div className="bg-abyss px-4 py-3.5">
                  <p className="eyebrow text-[10px]">Features scored</p>
                  <p className="tabular mt-1.5 font-mono text-sm text-ink">{result.vector.length}</p>
                </div>
                <div className="bg-abyss px-4 py-3.5">
                  <p className="eyebrow text-[10px]">Model version</p>
                  <p className="tabular mt-1.5 font-mono text-sm text-ink">
                    {result.modelVersion}
                  </p>
                </div>
              </div>

              <div className="relative mt-7 flex items-start gap-3 rounded-2xl border border-amber/25 bg-amber/[0.06] p-4">
                <FiAlertTriangle className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  This is a statistical estimate from population data, not a diagnosis. Risk scores
                  can be wrong in both directions. Take this result to a qualified clinician — do not
                  use it to start, stop or change any treatment.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
