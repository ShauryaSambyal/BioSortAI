import ImageUploader from "../components/ImageUploader";
import Reveal from "../components/Reveal";
import WasteCategoryLegend from "../components/WasteCategoryLegend";

export const metadata = {
  title: "Biomedical waste segregation",
  description:
    "Upload a photo of a biomedical waste item and BioSort AI identifies it, assigns the correct colour category, flags the risk level and writes out the safe disposal protocol.",
};

export default function BioSortPage() {
  return (
    <div className="relative px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-sage px-3.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden="true" />
            <span className="eyebrow text-moss">Biomedical waste segregation</span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="display mt-7 text-4xl sm:text-6xl">
            Sort it <span className="text-moss">safely</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Photograph the item in front of you. BioSort AI identifies it, assigns the correct waste
            category, flags the risk level and writes out how to dispose of it.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        <ImageUploader />
      </div>

      <WasteCategoryLegend />
    </div>
  );
}
