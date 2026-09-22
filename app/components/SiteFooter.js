import Link from "next/link";
import { FiAlertTriangle, FiGithub } from "react-icons/fi";

import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-hairline px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="text-[15px] font-semibold tracking-tight">BioSort AI</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Two tools for safer clinical practice: a heart-attack risk screen built on a validated
            logistic-regression model, and an assistant that sorts biomedical waste by category.
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Tools</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
            <li>
              <Link href="/heart" className="transition-colors hover:text-mint">
                Heart attack predictor
              </Link>
            </li>
            <li>
              <Link href="/biosort" className="transition-colors hover:text-mint">
                Biomedical waste segregation
              </Link>
            </li>
            <li>
              <Link href="/" className="transition-colors hover:text-mint">
                Back to top
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Model</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
            <li>Logistic regression</li>
            <li>15 clinical features</li>
            <li>Version logreg-1</li>
            <li className="flex items-center gap-2">
              <FiGithub className="text-[13px]" />
              Runs entirely in your browser
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="panel flex items-start gap-3 rounded-2xl p-4">
          <FiAlertTriangle className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <strong className="font-medium text-ink">Not medical advice.</strong> These tools are for
            education and triage support only. A prediction is a statistical estimate from population
            data, not a diagnosis — always consult a qualified clinician about your heart health.
          </p>
        </div>
        <p className="mt-8 text-xs text-ink-faint">
          © {new Date().getFullYear()} BioSort AI. Predictions are computed locally; no health data
          leaves your device.
        </p>
      </div>
    </footer>
  );
}
