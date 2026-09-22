import ClosingCta from "./components/ClosingCta";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ModelInputs from "./components/ModelInputs";
import StatsBand from "./components/StatsBand";
import ToolCards from "./components/ToolCards";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ToolCards />
      <HowItWorks />
      <ModelInputs />
      <ClosingCta />
    </>
  );
}
