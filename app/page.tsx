import DeckProvider from "@/components/providers/DeckProvider";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navigation from "@/components/layout/Navigation";
import SectionIndicator from "@/components/layout/SectionIndicator";
import SlideCounter from "@/components/layout/SlideCounter";
import BackToTop from "@/components/layout/BackToTop";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Subjects from "@/components/sections/Subjects";
import Classes from "@/components/sections/Classes";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <DeckProvider>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />
      <Navigation />
      <SectionIndicator />
      <SlideCounter />
      <BackToTop />
      <main>
        <Hero />
        <About />
        <Subjects />
        <Classes />
        <Contact />
      </main>
    </DeckProvider>
  );
}
