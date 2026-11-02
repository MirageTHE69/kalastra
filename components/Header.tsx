"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL, NAV } from "@/lib/content";
import { useFrame, useIsMobile } from "@/lib/motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const last = useRef(false);

  useFrame(() => {
    const s = window.scrollY > 40;
    if (s !== last.current) {
      last.current = s;
      setScrolled(s);
    }
  });

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  const menuItems = [...NAV, { label: "Contact", href: "#quote" }];

  return (
    <>
      <header className={`hdr${scrolled ? " is-scrolled" : ""}`}>
        <a href="#top" className="hdr-logo" aria-label="Kalastra Studio — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-sage.png" alt="Kalastra Studio" />
        </a>

        <nav className="hdr-nav" aria-label="Primary">
          <div className="hdr-links">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hdr-link">
                {n.label}
                <span className="hdr-link-line" />
                <span className="hdr-link-dot" />
              </a>
            ))}
          </div>
          <a href="#quote" className="btn-pill btn-pill--sm">Get a Quote</a>
        </nav>

        <button
          className={`burger${open ? " is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {menuItems.map((m, i) => (
          <a key={m.href} href={m.href} onClick={() => setOpen(false)} className="menu-link" tabIndex={open ? 0 : -1}>
            <span>0{i + 1}</span>
            {m.label}
          </a>
        ))}
        <div className="menu-foot">
          <span>{EMAIL.toUpperCase()}</span>
          <span>INSTAGRAM · BEHANCE · LINKEDIN</span>
        </div>
      </div>
    </>
  );
}
