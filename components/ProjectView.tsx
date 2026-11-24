"use client";

import Link from "next/link";
import { useRef } from "react";
import { PROJECTS, ikImg, type Project } from "@/lib/content";
import { delay, useFrame } from "@/lib/motion";

/** First image full width, the rest in pairs; an odd one out goes full width. */
const isFull = (i: number, n: number) => i === 0 || (i === n - 1 && (n - 1) % 2 === 1);

export default function ProjectView({ project, next }: { project: Project; next: Project }) {
  const media = useRef<HTMLDivElement>(null);
  const index = PROJECTS.findIndex((p) => p.slug === project.slug) + 1;
  const pad = (n: number) => String(n).padStart(2, "0");

  useFrame(() => {
    const y = window.scrollY, vh = window.innerHeight;
    if (y > vh * 1.2 || !media.current) return;
    media.current.style.transform = `translate3d(0,${y * 0.35}px,0) scale(${1 + (y / vh) * 0.08})`;
  });

  return (
    <article className="pd">
      {/* ---------- hero ---------- */}
      <section id="top" className="pd-hero">
        <div ref={media} className="pd-hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pd-hero-img"
            src={ikImg(project.cover, 2400)}
            srcSet={`${ikImg(project.cover, 1200)} 1200w, ${ikImg(project.cover, 2400)} 2400w`}
            sizes="100vw"
            alt={`${project.name} — ${project.gallery[0]?.caption ?? project.category}`}
          />
        </div>
        <div className="pd-hero-shade" />
        <div className="pd-hero-text">
          <Link href="/#work" className="pd-back eyebrow" data-rv="" style={delay(0.1)}>
            ← ALL WORK
          </Link>
          <div className="eyebrow sage" data-rv="" style={delay(0.2)}>
            PROJECT {pad(index)} / {pad(PROJECTS.length)} · {project.category.toUpperCase()}
          </div>
          <h1 className="pd-title">
            <span className="mask"><span data-rv="up" style={delay(0.25)}>{project.name}</span></span>
          </h1>
          <p className="pd-lede" data-rv="" style={delay(0.45)}>{project.lede}</p>
        </div>
      </section>

      {/* ---------- facts ---------- */}
      <section className="pd-facts">
        {project.facts.map((f, i) => (
          <div key={f.label} className="pd-fact" data-rv="" style={delay(i * 0.08)}>
            <span className="pd-fact-label">{f.label.toUpperCase()}</span>
            <span className="pd-fact-value">{f.value}</span>
          </div>
        ))}
      </section>

      {/* ---------- story ---------- */}
      <section className="pd-story grid12">
        <div className="eyebrow sage col-label pd-story-label" data-rv="">
          <span className="diamond diamond--6" />
          THE PROJECT
        </div>
        <div className="col-body pd-story-body">
          <p className="pd-intro" data-rv="">{project.intro}</p>
          {project.body.map((para, i) => (
            <p key={i} className="pd-para" data-rv="" style={delay(0.1)}>{para}</p>
          ))}
        </div>
      </section>

      {/* ---------- gallery ---------- */}
      <section className="pd-gallery">
        {project.gallery.map((g, i) => {
          const full = isFull(i, project.gallery.length);
          return (
            <figure key={g.src} className={`pd-fig${full ? " pd-fig--full" : ""}`} data-rv="clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ikImg(g.src, full ? 2400 : 1400)}
                srcSet={`${ikImg(g.src, 800)} 800w, ${ikImg(g.src, 1400)} 1400w, ${ikImg(g.src, 2400)} 2400w`}
                sizes={full ? "100vw" : "(max-width: 759px) 100vw, 50vw"}
                alt={`${project.name} — ${g.caption}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <figcaption>
                <span>{pad(i + 1)}</span>
                {g.caption}
              </figcaption>
            </figure>
          );
        })}
      </section>

      {/* ---------- next project ---------- */}
      <section className="pd-next">
        <div className="eyebrow muted" data-rv="">NEXT PROJECT</div>
        <Link href={`/work/${next.slug}`} className="pd-next-link" data-cursor="view">
          <span className="pd-next-name">
            <span className="mask"><span data-rv="up">{next.name}</span></span>
          </span>
          <span className="pd-next-media" data-rv="clip">
            <span className="pd-next-img" style={{ backgroundImage: `url("${ikImg(next.cover, 1600)}")` }} />
            <span className="proj-tag">{next.tag}</span>
          </span>
        </Link>
      </section>
    </article>
  );
}
