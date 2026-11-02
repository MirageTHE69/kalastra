import { delay } from "@/lib/utils";

export default function Testimonial() {
  return (
    <section className="testimonial" data-screen-label="07 Testimonial">
      <span data-rv="" className="diamond diamond--10" />
      <blockquote data-rv="" className="quote">
        “Our client signed off on the façade from a single dusk render. Kalastra understood the light we had in mind
        before we described it.”
      </blockquote>
      <div data-rv="" style={delay(0.15)} className="eyebrow muted quote-by">
        ANANYA RAO · PRINCIPAL, STUDIO TERRAIN
      </div>
    </section>
  );
}
