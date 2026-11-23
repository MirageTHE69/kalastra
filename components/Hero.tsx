"use client";

import { useEffect, useRef } from "react";
import { HERO_VIDEO } from "@/lib/content";
import { delay, useFrame } from "@/lib/motion";

export default function Hero() {
  const media = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reel = useRef<HTMLSpanElement>(null);

  // React doesn't reliably render the `muted` attribute, and browsers only
  // autoplay muted video, so force it on and kick off playback.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    // The reel opens on ~2s of black; skip it on first play so the splash
    // screen shows footage. Later loops play the full video.
    const skipIntro = () => {
      if (v.currentTime < HERO_VIDEO.startAt) v.currentTime = HERO_VIDEO.startAt;
    };
    if (v.readyState >= 1) skipIntro();
    else v.addEventListener("loadedmetadata", skipIntro, { once: true });
    v.play().catch(() => {});
    return () => v.removeEventListener("loadedmetadata", skipIntro);
  }, []);

  useFrame(() => {
    const v = video.current;
    if (v && reel.current && v.duration) {
      reel.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
    }
    const y = window.scrollY, vh = window.innerHeight;
    if (y >= vh * 1.3 || !media.current || !text.current) return;
    media.current.style.transform = `translate3d(0,${y * 0.4}px,0) scale(${1 + (y / vh) * 0.1})`;
    text.current.style.transform = `translate3d(0,${y * -0.15}px,0)`;
    text.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.65)));
  });

  return (
    <section id="top" className="hero" data-screen-label="01 Hero">
      <div ref={media} className="hero-media">
        <video
          ref={video}
          className="hero-video"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-vignette" />

      <div ref={text} className="hero-text">
        <div style={{ overflow: "hidden" }}>
          <div data-rv="up" style={delay(2)} className="hero-eyebrow">
            ARCHITECTURAL AND INTERIOR VISUALISATION STUDIO
          </div>
        </div>
        <h1 className="hero-title">
          <span className="mask"><span data-rv="up" style={delay(1.9)}>Envision space</span></span>
          <span className="mask"><span data-rv="up" style={delay(2)}><em className="accent">before</em> its</span></span>
          <span className="mask"><span data-rv="up" style={delay(2.1)}>existence.</span></span>
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
          <div data-rv="" style={delay(2.5)} className="ticks" aria-hidden>
            <div className="tick tick--reel is-active">
              <span>SHOWREEL</span>
              <span className="tick-bar"><span ref={reel} className="tick-fill tick-fill--reel" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
