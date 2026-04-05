import HeroSection from "./components/home/HeroSection";
import BentoGrid from "./components/home/BentoGrid";
import TradeInWidget from "./components/home/TradeInWidget";
import StatsSection from "./components/home/StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BentoGrid />
      <TradeInWidget />
      <StatsSection />
    </>
  );
}
