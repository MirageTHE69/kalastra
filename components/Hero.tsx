"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/lib/content";
import { delay, useFrame } from "@/lib/motion";

const INTERVAL = 5200;

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const media = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), INTERVAL);
  }, []);

  useEffect(() => {
    start();
    return () => window.clearInterval(timer.current);
  }, [start]);

  useFrame(() => {
    const y = window.scrollY, vh = window.innerHeight;
    if (y >= vh * 1.3 || !media.current || !text.current) return;
    media.current.style.transform = `translate3d(0,${y * 0.4}px,0) scale(${1 + (y / vh) * 0.1})`;
    text.current.style.transform = `translate3d(0,${y * -0.15}px,0)`;
    text.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.65)));
  });

  return (
    <section id="top" className="hero" data-screen-label="01 Hero">
      <div ref={media} className="hero-media">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.label}
            className={`hero-slide${slide === i ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${s.img})` }}
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-vignette" />

      <div ref={text} className="hero-text">
        <div style={{ overflow: "hidden" }}>
          <div data-rv="up" style={delay(2)} className="hero-eyebrow">
            ARCHITECTURAL VISUALISATION STUDIO · EST. 2021
          </div>
        </div>
        <h1 className="hero-title">
          <span className="mask"><span data-rv="up" style={delay(1.9)}>Architecture,</span></span>
          <span className="mask"><span data-rv="up" style={delay(2)}>rendered <em className="accent">before</em></span></span>
          <span className="mask"><span data-rv="up" style={delay(2.1)}>it’s built.</span></span>
        </h1>

        <div className="hero-bottom">
          <div data-rv="" style={delay(2.3)} className="hero-cta">
            <p className="hero-lede">
              Photoreal exteriors, interiors and walkthroughs for architects, developers and interior studios.
            </p>
            <div className="hero-buttons">
              <a href="#work" className="btn-pill">View Work <span className="diamond" /></a>
              <a href="#quote" className="btn-ghost">Get a Quote</a>
            </div>
          </div>
          <div data-rv="" style={delay(2.5)} className="ticks">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.label}
                className={`tick${slide === i ? " is-active" : ""}`}
                onClick={() => { setSlide(i); start(); }}
              >
                <span>0{i + 1} {s.label}</span>
                <span className="tick-bar"><span className="tick-fill" /></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
