"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { PROJECTS, ikImg } from "@/lib/content";
import { clamp01, delay, useFrame, useIsMobile } from "@/lib/motion";

/** Pinned section whose track scrolls horizontally on desktop; stacks on mobile. */
export default function Work() {
  const isMobile = useIsMobile();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  const layout = useCallback(() => {
    const wk = section.current, tr = track.current;
    if (!wk || !tr) return;
    const mob = window.innerWidth < 760;
    wk.style.height = mob ? "auto" : `${tr.scrollWidth - window.innerWidth + window.innerHeight}px`;
    if (mob) tr.style.transform = "none";
  }, []);

  useEffect(() => {
    layout();
    const t1 = window.setTimeout(layout, 60);
    const t2 = window.setTimeout(layout, 1200);
    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", layout);
      window.removeEventListener("load", layout);
    };
  }, [layout, isMobile]);

  useFrame(() => {
    const wk = section.current, tr = track.current;
    if (!wk || !tr || isMobile) return;
    const vh = window.innerHeight;
    const r = wk.getBoundingClientRect();
    const pr = clamp01(-r.top / Math.max(1, wk.offsetHeight - vh));
    tr.style.transform = `translate3d(${-pr * (tr.scrollWidth - window.innerWidth)}px,0,0)`;
    if (bar.current) bar.current.style.transform = `scaleX(${pr})`;
  });

  return (
    <section id="work" ref={section} className="work" data-screen-label="04 Selected Work">
      <div className="work-pin">
        <div ref={track} className="work-track">
          <div className="work-intro">
            <div data-rv="" className="eyebrow sage">03 — SELECTED WORK</div>
            <h2 className="work-h2">
              <span className="mask"><span data-rv="up">Places that</span></span>
              <span className="mask">
                <span data-rv="up" style={delay(0.1)}><em className="accent">don’t exist</em> yet.</span>
              </span>
            </h2>
            <p data-rv="" style={delay(0.2)} className="work-lede">
              Recent apartment interiors and residential exteriors, rendered from our clients’ drawings. Open a
              project to see every view.
            </p>
          </div>

          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              data-cursor="view"
              className={`proj ${p.ar === "16/11" ? "proj--wide" : "proj--tall"}`}
              style={{ marginTop: p.mt }}
            >
              <div className="proj-media" style={{ aspectRatio: p.ar }}>
                <div className="proj-img" style={{ backgroundImage: `url("${ikImg(p.cover, 1400)}")` }} />
                <div className="proj-tag">{p.tag}</div>
              </div>
              <div className="proj-meta">
                <span className="proj-name">{p.name}</span>
                <span className="proj-loc">{p.meta}</span>
              </div>
            </Link>
          ))}

          <a href="#quote" className="proj-all">
            Start a project
            <span className="diamond diamond--9" />
          </a>
        </div>

        <div className="work-bar" aria-hidden>
          <div ref={bar} />
        </div>
      </div>
    </section>
  );
}
