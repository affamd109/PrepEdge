import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import { SparklesCore } from "@/components/ui/sparkles";
import { importance } from "@/data/importance";

export default function Home() {
  return (
    <div>
      <div className="grid-background" ></div>

      <HeroSection />

      <FeatureSection />

      <Stats />

      <HowItWorks />

      


















    </div>



  );
}
