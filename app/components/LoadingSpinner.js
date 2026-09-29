const STEPS = ["Reading image", "Matching category", "Writing disposal protocol"];

/** Single-purpose busy state: one spinner, one label, the pipeline steps inline. */
export default function LoadingSpinner() {
  return (
    <div
      className="panel mx-auto mt-8 flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl px-6 py-10 text-center"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-7 w-7 animate-spin rounded-full border-2 border-hairline-2 border-t-mint"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-ink">Analysing biomedical waste…</p>
      <p className="eyebrow text-[10px]">{STEPS.join("  ·  ")}</p>
    </div>
  );
}
