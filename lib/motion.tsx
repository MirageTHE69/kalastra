"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type FrameFn = () => void;

type MotionCtx = {
  subscribe: (fn: FrameFn) => () => void;
  isMobile: boolean;
};

const Ctx = createContext<MotionCtx | null>(null);

export { EASE, MOBILE_BP, clamp01, delay } from "./utils";
import { MOBILE_BP } from "./utils";

/**
 * Runs Lenis smooth scrolling, a single requestAnimationFrame loop that
 * scroll-driven components subscribe to, smooth anchor links, and the
 * [data-rv] scroll reveals.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const subs = useRef(new Set<FrameFn>());
  const [isMobile, setIsMobile] = useState(false);

  // viewport
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BP);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // smooth scroll + frame loop + anchor links
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.085 });

    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      subs.current.forEach((fn) => fn());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el && id) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el ?? 0, { duration: 1.6 });
      else window.scrollTo({ top: el ? el.offsetTop : 0, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  // scroll reveals
  useEffect(() => {
    const targets = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          targets.get(en.target)?.forEach((el) => el.classList.add("rv-in"));
          io.unobserve(en.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll("[data-rv]").forEach((el) => {
      if (el.classList.contains("rv-in")) return;
      // "up" lines slide inside an overflow mask, so observe the mask
      const t = el.getAttribute("data-rv") === "up" && el.parentElement ? el.parentElement : el;
      const list = targets.get(t) ?? [];
      list.push(el);
      targets.set(t, list);
      io.observe(t);
    });

    // safety net once the loader has cleared
    const t = window.setTimeout(() => {
      targets.forEach((els, target) => {
        const r = target.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) els.forEach((el) => el.classList.add("rv-in"));
      });
    }, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [isMobile]);

  const value = useRef<MotionCtx>({
    subscribe: (fn) => {
      subs.current.add(fn);
      return () => subs.current.delete(fn);
    },
    isMobile: false,
  });
  value.current = { ...value.current, isMobile };

  return <Ctx.Provider value={value.current}>{children}</Ctx.Provider>;
}

function useMotion() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Must be used inside <MotionProvider>");
  return ctx;
}

export const useIsMobile = () => useMotion().isMobile;

/** Run a callback on every animation frame (always sees latest props/state). */
export function useFrame(fn: FrameFn) {
  const { subscribe } = useMotion();
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => subscribe(() => ref.current()), [subscribe]);
}
