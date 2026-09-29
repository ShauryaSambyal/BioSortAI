"use client";

import { motion, useReducedMotion } from "framer-motion";

import StatCounter from "./StatCounter";
import { EASE } from "./Reveal";
import { RISK_BANDS } from "@/lib/heartModel";

const CX = 140;
const CY = 140;
const R = 108;
const VIEW_W = 280;
const VIEW_H = 168;

/** Point on the arc for a normalised position, 0 = left, 1 = right. */
function pointOnArc(t, radius = R) {
  const angle = Math.PI * t;
  return {
    x: CX - radius * Math.cos(angle),
    y: CY - radius * Math.sin(angle),
  };
}

const VALUE_MAX = 1;

/** Band boundaries as ticks where the scale actually changes meaning. */
const TICKS = RISK_BANDS.slice(0, -1).map((band) => band.max);

export default function RiskGauge({ probability, band, playKey }) {
  const reduceMotion = useReducedMotion();
  const value = Math.min(Math.max(probability, 0), VALUE_MAX);
  const arcPath = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full max-w-[340px]"
        role="img"
        aria-label={`Estimated probability of heart disease: ${(probability * 100).toFixed(1)} percent`}
      >
        <defs>
          <linearGradient id="gauge-value" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={band.stroke} stopOpacity="0.55" />
            <stop offset="100%" stopColor={band.stroke} />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={arcPath}
          fill="none"
          stroke="#e6e9e0"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Faint band segments so the thresholds are visible before scoring */}
        {RISK_BANDS.map((segment) => {
          const from = Math.min(segment.min, VALUE_MAX) / VALUE_MAX;
          const to = Math.min(segment.max === Infinity ? VALUE_MAX : segment.max, VALUE_MAX) / VALUE_MAX;
          if (to <= from) return null;

          const start = pointOnArc(from, R - 17);
          const end = pointOnArc(to, R - 17);
          const largeArc = to - from > 0.5 ? 1 : 0;

          return (
            <path
              key={segment.key}
              d={`M ${start.x} ${start.y} A ${R - 17} ${R - 17} 0 ${largeArc} 1 ${end.x} ${end.y}`}
              fill="none"
              stroke={segment.stroke}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.28"
            />
          );
        })}

        {/* Value arc */}
        <motion.path
          d={arcPath}
          fill="none"
          stroke="url(#gauge-value)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: value } : { pathLength: 0 }}
          animate={{ pathLength: value }}
          transition={{ duration: 1.25, ease: EASE }}
        />

        {/* Threshold ticks */}
        {TICKS.map((tick) => {
          const inner = pointOnArc(tick, R + 10);
          const outer = pointOnArc(tick, R + 19);
          return (
            <g key={tick}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="#d2d6c6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}

        <text x={CX - R + 4} y={CY + 22} className="fill-ink-faint" fontSize="10" textAnchor="middle">
          0%
        </text>
        <text x={CX + R - 4} y={CY + 22} className="fill-ink-faint" fontSize="10" textAnchor="middle">
          100%
        </text>
      </svg>

      {/* Readout sits under the arc so the number is never clipped */}
      <div className="-mt-8 flex flex-col items-center">
        <p className="display text-6xl text-ink sm:text-7xl">
          <StatCounter
            value={probability * 100}
            decimals={1}
            suffix="%"
            duration={1400}
            immediate
            playKey={playKey}
          />
        </p>
        <p
          className="mt-3 rounded-full border px-4 py-1.5 text-sm font-medium"
          style={{
            color: band.stroke,
            borderColor: `${band.stroke}55`,
            background: `${band.stroke}14`,
          }}
        >
          {band.label}
        </p>
      </div>
    </div>
  );
}
