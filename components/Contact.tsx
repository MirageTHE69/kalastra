"use client";

import { useRef } from "react";
import { EMAIL } from "@/lib/content";
import { delay, useFrame } from "@/lib/motion";

export default function Contact() {
  const mag = useRef<HTMLAnchorElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const logoShown = useRef(false);

  useFrame(() => {
    const el = logo.current;
    if (!el || logoShown.current) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      logoShown.current = true;
      el.style.clipPath = "inset(0 0% 0 0)";
    }
  });

  return (
    <section id="quote" className="contact" data-screen-label="08 Contact">
      <div className="contact-top">
        <div data-rv="" className="eyebrow sage">05 — START A PROJECT</div>
        <h2 className="contact-h2">
          <span className="mask"><span data-rv="up">Have a project</span></span>
          <span className="mask">
            <span data-rv="up" style={delay(0.1)}>on the <em className="accent">drawing board?</em></span>
          </span>
        </h2>
        <div data-rv="" style={delay(0.2)} className="contact-row">
          <a
            ref={mag}
            href={`mailto:${EMAIL}`}
            className="magnet"
            onMouseMove={(e) => {
              const el = mag.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
            }}
            onMouseLeave={() => {
              if (mag.current) mag.current.style.transform = "translate(0,0)";
            }}
          >
            Get a Quote
            <span className="diamond diamond--7" />
          </a>
          <div className="contact-lines">
            <a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a>
            <span className="eyebrow eyebrow--sm muted">WHATSAPP · +91 00000 00000</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-cols">
          <div className="footer-col">
            <span className="footer-label">STUDIO</span>
            <span className="footer-about">
              Architectural visualisation
              <br />
              Pune, India · Remote worldwide
            </span>
          </div>
          <div className="footer-col">
            <span className="footer-label">NAVIGATE</span>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#studio">Studio</a>
          </div>
          <div className="footer-col">
            <span className="footer-label">CONTACT</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="#">WhatsApp</a>
          </div>
          <div className="footer-col">
            <span className="footer-label">FOLLOW</span>
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={logo} src="/assets/logo-sage.png" alt="Kalastra Studio" className="footer-logo" />
        </div>

        <div className="footer-bottom">
          <span>© 2026 KALASTRA STUDIO. ALL RIGHTS RESERVED.</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </section>
  );
}
