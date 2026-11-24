import type { Metadata } from "next";
import { MotionProvider } from "@/lib/motion";
import { Cursor, Grain, ScrollProgress } from "@/components/Overlays";
import Header from "@/components/Header";
import About from "@/components/About";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "About — Kalastra Studio",
  description:
    "Kalastra Studio is an architectural and interior visualisation studio in Vadodara, Gujarat, creating photoreal renders and walkthroughs for architects, designers and developers.",
};

export default function AboutPage() {
  return (
    <MotionProvider>
      <div className="site">
        <Grain />
        <Cursor />
        <ScrollProgress />
        <Header />
        <main>
          <About />
          <Contact />
        </main>
      </div>
    </MotionProvider>
  );
}
