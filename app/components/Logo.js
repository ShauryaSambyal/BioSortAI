/**
 * BioSort AI mark: a vitals trace passing through a heart outline.
 * Static by design — the mark is part of the shell on every page, so it does
 * not animate.
 */
export default function Logo({ size = 34, className = "" }) {
  return (
    <svg
      viewBox="0 0 34 34"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M17 28.4S4.6 21 4.6 12.9A6.4 6.4 0 0 1 17 9.2a6.4 6.4 0 0 1 12.4 3.7C29.4 21 17 28.4 17 28.4Z"
        stroke="#18280e"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17.5h4.2l2.1-5.6 3.1 10.4 2.6-8 1.7 3.2h4.3"
        stroke="#3f7308"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
