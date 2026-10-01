import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-hairline px-4 py-14 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <div className="flex items-center gap-2.5">
          <Logo size={30} />
          <span className="text-[15px] font-semibold tracking-tight">BioSort AI</span>
        </div>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
          Two tools for safer clinical practice: a heart-attack risk screen built on a validated
          logistic-regression model, and an assistant that sorts biomedical waste by category.
        </p>
      </div>
    </footer>
  );
}
