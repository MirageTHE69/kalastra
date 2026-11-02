"use client";

import { useRef } from "react";
import { STEPS } from "@/lib/content";
import { clamp01, delay, useFrame } from "@/lib/motion";

export default function Process() {
  const list = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!list.current || !line.current) return;
    const r = list.current.getBoundingClientRect();
    line.current.style.transform = `scaleY(${clamp01((window.innerHeight * 0.65 - r.top) / r.height)})`;
  });

  return (
    <section id="process" className="process grid12" data-screen-label="06 Process">
      <div className="proc-l">
        <div data-rv="" className="eyebrow proc-eyebrow">04 — PROCESS</div>
        <h2 className="h2 h2--proc">
          <span className="mask"><span data-rv="up">From drawings</span></span>
          <span className="mask"><span data-rv="up" style={delay(0.1)}>to delivery.</span></span>
        </h2>
        <p data-rv="" style={delay(0.2)} className="proc-lede">
          Most stills ship in 5–7 working days. Walkthroughs in 2–3 weeks.
        </p>
      </div>

      <div ref={list} className="proc-r">
        <div className="proc-track"><div ref={line} className="proc-line" /></div>
        {STEPS.map((st, i) => (
          <div key={st.title} data-rv="" className="step">
            <span className="step-dot" />
            <div className="step-meta">0{i + 1} · {st.time}</div>
            <h3 className="step-title">{st.title}</h3>
            <p className="step-desc">{st.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
