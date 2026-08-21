import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../sections/HeroSection";
import { IntegrationsSection } from "../sections/IntegrationsSection";
import { CommandSection } from "../sections/CommandSection";
import { DashboardSection } from "../sections/DashboardSection";
import { HiveSection } from "../sections/HiveSection";
import { ClosingSection } from "../sections/ClosingSection";

export function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <HeroSection />
        <IntegrationsSection />
        <CommandSection />
        <DashboardSection />
        <HiveSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}
