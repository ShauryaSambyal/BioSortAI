"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SegmentedField({ field, value, onChange }) {
  const reduceMotion = useReducedMotion();
  const groupId = `seg-${field.id}`;

  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label={field.label}>
      <span className="text-sm text-ink">{field.label}</span>

      <div className="seg-track">
        {field.options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={selected}
              data-selected={selected}
              title={option.hint ?? option.label}
              onClick={() => onChange(field.id, option.value)}
              className="seg-option"
            >
              {selected &&
                (reduceMotion ? (
                  <span className="seg-thumb" aria-hidden="true" />
                ) : (
                  <motion.span
                    layoutId={groupId}
                    className="seg-thumb"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                ))}
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
