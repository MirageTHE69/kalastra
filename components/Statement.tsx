"use client";

import { useRef } from "react";
import { STATEMENT, STATEMENT_ACCENTS } from "@/lib/content";
import { clamp01, useFrame } from "@/lib/motion";

const WORDS = STATEMENT.split(" ");

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useFrame(() => {
    const st = ref.current;
    if (!st) return;
    const vh = window.innerHeight;
    const r = st.getBoundingClientRect();
    if (r.top > vh || r.bottom < 0) return;
    const pr = clamp01((vh * 0.82 - r.top) / (r.height + vh * 0.25));
    const ws = st.children as HTMLCollectionOf<HTMLElement>;
    const n = ws.length;
    for (let i = 0; i < n; i++) ws[i].style.opacity = String(0.14 + 0.86 * clamp01(pr * n * 1.15 - i));
  });

  return (
    <section id="studio" className="statement grid12" data-screen-label="02 Statement">
      <div data-rv="" className="eyebrow statement-label col-label">
        <span className="diamond diamond--6" />
        01 — THE STUDIO
      </div>
      <p ref={ref} className="statement-text col-body">
        {WORDS.map((w, i) => (
          <span key={i} className={STATEMENT_ACCENTS.has(w) ? "accent" : undefined}>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
