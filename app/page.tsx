import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import PricingSection from "./components/sections/PricingSection";
import TestimonialSection from "./components/sections/TestimonialSection";
import CTASection from "./components/sections/CTASection";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
