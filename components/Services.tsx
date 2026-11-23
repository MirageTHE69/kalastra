"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/content";

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="services" data-screen-label="03 Services">
      <div className="sec-head">
        <h2 className="h2">
          <span className="mask mask--tight"><span data-rv="up">What we render</span></span>
        </h2>
        <div data-rv="" className="eyebrow muted">02 — SERVICES</div>
      </div>

      <div data-rv="clip" className="acc">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`acc-item${active === i ? " is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <div className="acc-img" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="acc-shade" />
            <div className="acc-num">0{i + 1}</div>
            <div className="acc-body">
              <h3 className="acc-title">{s.title}</h3>
              {/* collapses to zero height when inactive so the title never gets pushed out of a closed card */}
              <div className="acc-desc-wrap">
                <div className="acc-desc">
                  {s.desc.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
