"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { CLAY_IMG } from "@/lib/content";

export default function ClayToFinal() {
  const [pos, setPos] = useState(52);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  }, []);

  const set = (e: PointerEvent) => {
    const b = box.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="clay" data-screen-label="05 Clay to Final">
      <div className="sec-head sec-head--flush">
        <h2 className="h2">
          <span className="mask"><span data-rv="up">Clay to <em className="accent">final</em>.</span></span>
        </h2>
        <p data-rv="" className="work-lede work-lede--wide">
          Every image starts as an untextured model for you to sign off on massing and camera. Drag to compare.
        </p>
      </div>

      <div
        ref={box}
        data-rv="clip"
        data-cursor="drag"
        className="ba"
        role="slider"
        aria-label="Compare clay model and final render"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture?.(e.pointerId);
          set(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current || (e.pointerType === "mouse" && fine.current)) set(e);
        }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <div className="ba-img" style={{ backgroundImage: `url(${CLAY_IMG})` }} />
        <div
          className="ba-img ba-img--clay"
          style={{ backgroundImage: `url(${CLAY_IMG})`, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <div className="ba-tag ba-tag--clay">CLAY</div>
        <div className="ba-tag ba-tag--final">FINAL</div>
        <div className="ba-handle" style={{ left: `${pos}%` }}>
          <div className="ba-knob" />
        </div>
      </div>
    </section>
  );
}
