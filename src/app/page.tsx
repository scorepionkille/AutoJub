import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PromoSection from "@/components/PromoSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PromoSection />
      <Footer />
    </main>
  );
}
