import { FOUNDER, PROJECTS, SERVICES } from "@/lib/content";
import { delay } from "@/lib/utils";

const PRINCIPLES = [
  {
    title: "Accurate before beautiful",
    desc: "Every material, colour and fitting is matched to your drawings and specification, so what clients approve on screen is what gets built.",
  },
  {
    title: "Light that tells the story",
    desc: "We choose the hour, the weather and the camera for each view, because the right light is what makes a space feel real.",
  },
  {
    title: "A clear, quick process",
    desc: "Clay views to agree framing first, one consolidated round of comments, and most stills delivered in 5–7 working days.",
  },
];

export default function About() {
  return (
    <article className="about">
      {/* ---------- intro ---------- */}
      <section id="top" className="about-hero">
        <div data-rv="" className="eyebrow sage">ABOUT THE STUDIO</div>
        <h1 className="about-title">
          <span className="mask"><span data-rv="up" style={delay(0.05)}>We show spaces</span></span>
          <span className="mask">
            <span data-rv="up" style={delay(0.15)}>
              <em className="accent">before</em> they exist.
            </span>
          </span>
        </h1>
        <p data-rv="" style={delay(0.3)} className="about-lede">
          Kalastra Studio is an architectural and interior visualisation studio based in Vadodara, Gujarat. We turn
          drawings into photoreal images and walkthroughs for architects, interior designers and developers, so
          their clients can see, feel and approve a space long before it is built.
        </p>
      </section>

      {/* ---------- founder ---------- */}
      <section className="founder grid12">
        <figure data-rv="clip" className="founder-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FOUNDER.photo} alt={FOUNDER.name || "Founder of Kalastra Studio"} />
          <figcaption>
            {FOUNDER.name && <span className="founder-name">{FOUNDER.name}</span>}
            <span className="founder-role">{FOUNDER.role.toUpperCase()}</span>
          </figcaption>
        </figure>

        <div className="founder-text">
          <div data-rv="" className="eyebrow sage founder-label">
            <span className="diamond diamond--6" />
            THE FOUNDER
          </div>
          <p data-rv="" className="founder-intro">
            Kalastra began with a simple belief: nobody should have to imagine a home from a floor plan.
          </p>
          <p data-rv="" style={delay(0.1)} className="founder-para">
            The studio was founded to close the gap between what a designer has in mind and what a client can
            picture. Every project is led personally, from the first look at the drawings to the final retouch, so
            each image is checked against the design, not just made to look good.
          </p>
          <p data-rv="" style={delay(0.15)} className="founder-para">
            Today Kalastra works on apartments, private residences and workspaces across India and remotely
            worldwide, always with the same focus on honest materials, considered light and fast, clear
            communication.
          </p>
          <div data-rv="" style={delay(0.2)} className="about-stats">
            <div><span className="about-stat">{PROJECTS.length}</span><span className="about-stat-label">FEATURED PROJECTS</span></div>
            <div><span className="about-stat">{SERVICES.length}</span><span className="about-stat-label">CORE SERVICES</span></div>
            <div><span className="about-stat">5–7</span><span className="about-stat-label">DAYS PER STILL SET</span></div>
          </div>
        </div>
      </section>

      {/* ---------- principles ---------- */}
      <section className="principles">
        <div className="sec-head">
          <h2 className="h2">
            <span className="mask"><span data-rv="up">How we work</span></span>
          </h2>
          <a href="/#work" data-rv="" className="btn-ghost">See our work</a>
        </div>
        <div className="principles-grid">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} data-rv="" style={delay(i * 0.1)} className="principle">
              <span className="principle-num">0{i + 1}</span>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
