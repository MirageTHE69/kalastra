"use client";

import { useEffect, useRef, useState } from "react";
import { EASE, clamp01, useFrame } from "@/lib/motion";

/* ---------- Intro loader: logo wipe + counter, then curtains split ---------- */
export function Loader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const L = logo.current, T = top.current, B = bottom.current, I = inner.current;
    if (!L || !T || !B || !I) return;
    L.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], {
      duration: 1400, easing: EASE, fill: "forwards",
    });
    const t0 = performance.now();
    const counter = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / 1400);
      setCount(Math.round(p * 100));
      if (p >= 1) window.clearInterval(counter);
    }, 50);
    const split = window.setTimeout(() => {
      I.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" });
      const opts = { duration: 1100, easing: EASE, fill: "forwards" as const, delay: 150 };
      T.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], opts);
      B.animate([{ transform: "translateY(0)" }, { transform: "translateY(100%)" }], opts);
    }, 1650);
    const done = window.setTimeout(() => setShow(false), 3000);
    return () => {
      window.clearInterval(counter);
      window.clearTimeout(split);
      window.clearTimeout(done);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="loader" aria-hidden>
      <div ref={top} className="loader-curtain loader-curtain--top" />
      <div ref={bottom} className="loader-curtain loader-curtain--bottom" />
      <div ref={inner} className="loader-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={logo} src="/assets/logo-sage.png" alt="Kalastra Studio" className="loader-logo" />
        <div className="loader-count">LOADING · {count}%</div>
      </div>
    </div>
  );
}

/* ---------- Film grain ---------- */
export function Grain() {
  return <div className="grain" aria-hidden />;
}

/* ---------- Top scroll progress line ---------- */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useFrame(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = clamp01(window.scrollY / max);
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    if (dot.current) dot.current.style.left = `${p * 100}%`;
  });
  return (
    <div className="progress" aria-hidden>
      <div ref={bar} className="progress-bar" />
      <div ref={dot} className="progress-dot" />
    </div>
  );
}

/* ---------- Custom cursor (fine pointers only) ---------- */
export function Cursor() {
  const [fine, setFine] = useState(false);
  const [mode, setMode] = useState("");
  const el = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const isFine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    setFine(isFine);
    if (!isFine) return;
    document.documentElement.classList.add("kc");
    const p = pos.current;
    p.mx = p.cx = window.innerWidth / 2;
    p.my = p.cy = window.innerHeight / 2;
    const onMove = (e: PointerEvent) => { p.mx = e.clientX; p.my = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-cursor],a,button");
      setMode(t ? t.getAttribute("data-cursor") || "link" : "");
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("kc");
    };
  }, []);

  useFrame(() => {
    if (!el.current) return;
    const p = pos.current;
    p.cx += (p.mx - p.cx) * 0.2;
    p.cy += (p.my - p.cy) * 0.2;
    el.current.style.transform = `translate3d(${p.cx}px,${p.cy}px,0)`;
  });

  if (!fine) return null;
  return (
    <div ref={el} className="cursor" data-mode={mode} aria-hidden>
      <div className="cursor-shape">
        <span className="cursor-label">{mode === "view" ? "VIEW" : mode === "drag" ? "DRAG" : ""}</span>
      </div>
    </div>
  );
}
