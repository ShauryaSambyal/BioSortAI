"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiTrash2, FiX } from "react-icons/fi";

import { EASE } from "./Reveal";

const RISK_STYLES = {
  high: { stroke: "#be123c", label: "High risk", tint: "rgba(190,18,60,0.09)" },
  medium: { stroke: "#b45309", label: "Medium risk", tint: "rgba(180,83,9,0.09)" },
  low: { stroke: "#3f7308", label: "Low risk", tint: "rgba(63,115,8,0.09)" },
};

function riskStyle(riskLevel) {
  return RISK_STYLES[String(riskLevel ?? "").toLowerCase()] ?? RISK_STYLES.low;
}

function Stat({ icon: Icon, label, value, tone = "#3f7308" }) {
  return (
    <div className="bg-abyss px-5 py-5">
      <p className="eyebrow text-[10px]">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <Icon className="shrink-0 text-sm" style={{ color: tone }} aria-hidden="true" />
        <p className="text-base font-medium capitalize text-ink">{value || "Unknown"}</p>
      </div>
    </div>
  );
}

export default function ResultCard({ result, onClose }) {
  const risk = result ? riskStyle(result.riskLevel) : null;

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mt-8 w-full max-w-3xl"
        >
          <div className="panel relative overflow-hidden rounded-2xl p-6 sm:p-9">
            <div className="relative flex items-start justify-between gap-4 border-b border-hairline pb-5">
              <div>
                <p className="eyebrow">BioSort analysis</p>
                <h2 className="mt-2.5 flex items-center gap-2.5 text-xl font-medium text-ink sm:text-2xl">
                  <FiCheckCircle className="text-mint" aria-hidden="true" />
                  Classification complete
                </h2>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost btn-md px-2.5"
                  aria-label="Dismiss result"
                >
                  <FiX className="text-lg" />
                </button>
              )}
            </div>

            <div className="relative mt-6 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
              <Stat icon={FiInfo} label="Detected object" value={result.detected} />
              <Stat icon={FiTrash2} label="Waste category" value={result.category} />
              <Stat
                icon={FiAlertTriangle}
                label="Risk level"
                value={risk.label}
                tone={risk.stroke}
              />
            </div>

            <div className="relative mt-6 rounded-2xl border border-hairline bg-panel-2/60 p-5 sm:p-6">
              <p className="eyebrow flex items-center gap-2">
                <FiTrash2 className="text-mint" aria-hidden="true" />
                Recommended disposal method
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                {result.disposal || "No disposal instructions were returned for this item."}
              </p>
            </div>

            <div className="relative mt-6 flex items-start gap-3 rounded-2xl border border-amber/25 bg-amber/[0.06] p-4">
              <FiAlertTriangle className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <p className="text-[13px] leading-relaxed text-ink-soft">
                Always handle biomedical waste with the appropriate personal protective equipment, and
                follow your facility&apos;s standard operating procedure over any automated output.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
