import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import PricingSection from "./components/sections/PricingSection";
import TestimonialSection from "./components/sections/TestimonialSection";
import CTASection from "./components/sections/CTASection";


export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
