import { MotionProvider } from "@/lib/motion";
import { Cursor, Grain, Loader, ScrollProgress } from "@/components/Overlays";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import Work from "@/components/Work";
import ClayToFinal from "@/components/ClayToFinal";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <MotionProvider>
      <div className="site">
        <Loader />
        <Grain />
        <Cursor />
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <Statement />
          <Services />
          <Work />
          <ClayToFinal />
          <Process />
          <Testimonial />
          <Contact />
        </main>
      </div>
    </MotionProvider>
  );
}
