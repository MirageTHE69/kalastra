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

    const scrollToEl = (el: HTMLElement | null, immediate = false) => {
      if (lenis) lenis.scrollTo(el ?? 0, immediate ? { immediate: true, force: true } : { duration: 1.6 });
      else window.scrollTo({ top: el ? el.offsetTop : 0, behavior: immediate ? "auto" : "smooth" });
    };

    // "#id" and "/#id" links scroll smoothly when the target is on this page;
    // otherwise the browser navigates (e.g. from a project page back home).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href");
      if (!href) return;
      const onHome = window.location.pathname === "/";
      let id: string;
      if (href.startsWith("#")) id = href.slice(1);
      else if (href.startsWith("/#")) id = href.slice(2);
      else if (href === "/" && onHome) id = "";
      else return;
      const el = id ? document.getElementById(id) : null;
      if (id && !el) return;
      e.preventDefault();
      scrollToEl(el);
    };
    document.addEventListener("click", onClick);

    // arriving with a hash (e.g. /#work from a project page)
    const hashT = window.setTimeout(() => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (el) scrollToEl(el, true);
    }, 150);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hashT);
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
