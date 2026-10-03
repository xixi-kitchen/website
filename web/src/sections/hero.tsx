import React, { useRef } from "react";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/effects/Magnetic";
import GridField from "@/components/effects/GridField";
import { useI18n } from "@/i18n/useI18n";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";

const Hero: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const t = useI18n();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const reveal = () => {
        gsap.set(".hero-line", { yPercent: 0, y: 0, autoAlpha: 1 });
        gsap.set([".hero-fade", ".hero-role", ".hero-shape", ".hero-grid", ".hero-corner", ".hero-watermark", ".hero-rules"], {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
        });
      };

      if (reducedMotion()) {
        reveal();
        return;
      }

      const failsafe = window.setTimeout(reveal, 1600);
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.clearTimeout(failsafe);
          reveal();
        },
      });

      tl.fromTo(".hero-grid", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0)
        .fromTo(".hero-corner", { y: -16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.55 }, 0.1)
        .fromTo(".hero-watermark", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1.1 }, 0)
        .fromTo(".hero-line", { yPercent: 110 }, { yPercent: 0, duration: 0.95, stagger: 0.1 }, 0.12)
        .fromTo(".hero-role", { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, stagger: 0.05, duration: 0.4 }, 0.5)
        .fromTo(".hero-fade", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.55 }, 0.62)
        .fromTo(".hero-shape-square", { scale: 0.2, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.75, transformOrigin: "center" }, 0.28)
        .fromTo(".hero-shape-ring", { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8 }, 0.42)
        .fromTo(".hero-shape-tri", { y: 60, rotation: 18, autoAlpha: 0 }, { y: 0, rotation: 0, autoAlpha: 1, duration: 0.8 }, 0.48)
        .fromTo(".hero-rules", { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, 0.3);

      gsap.to(".hero-shape-square", { y: 12, rotation: 5, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.2 });
      gsap.to(".hero-shape-ring", { y: -14, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.2 });
      gsap.to(".hero-shape-tri", { y: 8, rotation: -6, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.2 });

      gsap.to(".hero-stage", {
        y: 64,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      return () => window.clearTimeout(failsafe);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden">
      <GridField className="hero-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      <div className="hero-rules pointer-events-none absolute left-[min(6vw,4rem)] top-0 hidden h-full w-px bg-line md:block" />
      <div className="hero-rules pointer-events-none absolute right-[min(6vw,4rem)] top-0 hidden h-full w-px bg-line md:block" />

      <p className="hero-watermark pointer-events-none absolute -left-4 top-24 select-none font-semibold leading-none text-ink/[0.05] dark:text-white/[0.06] sm:left-0 sm:text-[clamp(6rem,22vw,18rem)]">
        {t.brand.mark}
      </p>

      <div className="hero-stage relative">
        <div className="container-page flex items-start justify-between pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted md:pt-8">
          <span className="hero-corner">{t.brand.mark} / 2026</span>
          <span className="hero-corner hidden sm:inline">{t.hero.place}</span>
          <span className="hero-corner">{t.hero.edition}</span>
        </div>

        <div className="container-page grid min-h-[calc(100svh-6.5rem)] items-center gap-10 py-12 md:grid-cols-[1.25fr_1fr] md:gap-8 md:py-16">
          <div className="min-w-0">
            <p className="hero-fade font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.hero.eyebrow}</p>

            <h1 className="mt-8 text-[clamp(2.4rem,5.2vw,4.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
              <span className="block overflow-hidden">
                <span className="hero-line block text-[0.45em] font-medium tracking-normal text-muted">{t.hero.line1}</span>
              </span>
              <span className="mt-2 block overflow-hidden">
                <span className="hero-line block text-[1.15em] leading-none">{t.hero.line2}</span>
              </span>
              <span className="mt-4 block overflow-hidden">
                <span className="hero-line block">
                  <span className="relative inline-block text-[#121214]">
                    <span className="absolute inset-x-[-0.08em] inset-y-[0.06em] -z-10 bg-brand-yellow" aria-hidden />
                    {t.hero.line3}
                  </span>
                </span>
              </span>
            </h1>

            <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-ink">{t.hero.body}</p>

            <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button href="/projects">{t.hero.work}</Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact" variant="secondary">
                  {t.hero.contact}
                </Button>
              </Magnetic>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[22rem] md:max-w-none">
            <svg viewBox="0 0 260 240" fill="none" aria-hidden className="h-auto w-full">
              <g className="hero-shape hero-shape-square origin-center [transform-box:fill-box]">
                <rect x="96" y="8" width="140" height="140" fill="#FFF000" />
              </g>
              <g className="hero-shape hero-shape-ring origin-center [transform-box:fill-box]">
                <circle cx="92" cy="128" r="64" stroke="#FF0088" strokeWidth="30" />
              </g>
              <g className="hero-shape hero-shape-tri origin-center [transform-box:fill-box]">
                <path d="M168 84L246 228H90L168 84Z" fill="#5522FF" />
              </g>
            </svg>
            <p className="hero-fade mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:text-left">
              {t.hero.shapes}
            </p>
          </div>
        </div>

        <div className="container-page pb-8">
          <div className="hero-fade flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="scroll-pulse absolute inset-0 border border-muted/40" />
              <span className="h-2 w-2 bg-brand-pink" />
            </span>
            {t.hero.scroll}
            <span className="hidden h-px flex-1 bg-line sm:block" />
            <span className="hidden sm:inline">01 — 03</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
