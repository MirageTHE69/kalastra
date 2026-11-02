import type { CSSProperties } from "react";

export const EASE = "cubic-bezier(0.65,0,0.35,1)";
export const MOBILE_BP = 760;
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Reveal delay helper: style={delay(2)} */
export const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
