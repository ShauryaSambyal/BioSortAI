"use client";

function formatValue(value, step) {
  if (step >= 1) return String(Math.round(value));
  return value.toFixed(1);
}

export default function SliderField({ field, value, onChange }) {
  const inputId = `field-${field.id}`;
  const progress = ((value - field.min) / (field.max - field.min)) * 100;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={inputId} className="text-sm text-ink">
          {field.label}
        </label>
        <span className="tabular font-mono text-sm text-mint">
          {formatValue(value, field.step)}
          <span className="ml-1 text-[10px] text-ink-faint">{field.unit}</span>
        </span>
      </div>

      <input
        id={inputId}
        name={field.id}
        type="range"
        className="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(event) => onChange(field.id, Number(event.target.value))}
        style={{ "--range-progress": `${progress}%` }}
        aria-describedby={`${inputId}-range`}
      />

      <div
        id={`${inputId}-range`}
        className="tabular flex justify-between font-mono text-[10px] text-ink-faint"
      >
        <span>{field.min}</span>
        <span>{field.max}</span>
      </div>
    </div>
  );
}
