import HeartPredictor from "../components/HeartPredictor";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Heart attack risk predictor",
  description:
    "Enter eleven vitals and clinical markers to get an instant, explainable estimate of heart disease risk from a logistic-regression model running in your browser.",
};

export default function HeartPage() {
  return (
    <div className="relative px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
      {/* Centered intro */}
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-sage px-3.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden="true" />
            <span className="eyebrow text-moss">Heart attack predictor</span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="display mt-7 text-4xl sm:text-6xl">
            Know your <span className="text-moss">number</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Eleven inputs, the same ones recorded during a standard cardiac workup. You will get a
            probability, the band it falls into, and the exact markers behind it — in either
            direction.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        <HeartPredictor />
      </div>
    </div>
  );
}
