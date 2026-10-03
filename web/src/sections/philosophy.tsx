import React, { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Ring, Square, Triangle } from "@/components/ui/BrandShapes";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";
import { useI18n } from "@/i18n/useI18n";
import { useRouter } from "next/router";

const copy = {
  zh: {
    left: "在遵循人性的前提下，达到最简单的平衡",
    principles: [
      { term: "人性", meaning: "最本质的冲动" },
      { term: "简单", meaning: "极致的低成本" },
      { term: "平衡", meaning: "价值的最大化" },
    ],
    rightTitle: "善用跨领域的底层逻辑，以多面手的视角推动效率",
    rightBody: "用复合思维处理多件事。不必把每个领域都做深，但要掌握各自最核心的方法，把问题拆开，再把人和资源接上。",
    quote: "一个人就是一个团队。每个方面都要懂最基础的原理。",
    kicker: "理念",
  },
  en: {
    left: "Stay with what people actually need, then make the simplest balance.",
    principles: [
      { term: "People", meaning: "The real impulse" },
      { term: "Simple", meaning: "The lowest cost that still works" },
      { term: "Balance", meaning: "The most value from the least" },
    ],
    rightTitle: "Use the basic logic of several fields, and work like a small team.",
    rightBody: "One practice can hold several jobs. You do not have to master every field. You do need the core method of each, so a problem can be split and people can work together.",
    quote: "One person is a team. Every part still needs its first principles.",
    kicker: "Thinking",
  },
};

const Philosophy: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const t = useI18n();
  const text = copy[useRouter().locale === "en" ? "en" : "zh"];

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.fromTo(
        ".philo-card",
        { y: 48, autoAlpha: 0, rotation: (i: number) => (i === 0 ? -2 : 2) },
        {
          y: 0,
          autoAlpha: 1,
          rotation: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-y relative">
      <p className="pointer-events-none absolute right-[4%] top-10 hidden select-none font-mono text-[10px] uppercase tracking-[0.4em] text-muted/50 md:block">
        {text.kicker}
      </p>
      <div className="container-page">
        <SectionHeader index="01" label={t.about.philosophyLabel} title={t.about.philosophyTitle} />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article className="philo-card flex h-full flex-col justify-between gap-14 rounded-3xl bg-brand-pink p-8 text-[#121214] md:p-12">
            <div>
              <div className="flex items-end gap-3">
                <Triangle size={44} className="text-[#121214]" />
                <Square size={40} className="text-brand-yellow" />
              </div>
              <h3 className="mt-10 text-[clamp(1.6rem,2.6vw,2.5rem)] font-semibold leading-[1.2] tracking-tight">{text.left}</h3>
            </div>
            <dl className="divide-y divide-[#121214]/15 border-t border-[#121214]/15">
              {text.principles.map((p) => (
                <div key={p.term} className="philo-row flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-2xl font-semibold md:text-3xl">{p.term}</dt>
                  <dd className="text-base font-medium md:text-lg">{p.meaning}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="philo-card flex h-full flex-col justify-between gap-14 rounded-3xl bg-brand-blue p-8 text-white md:p-12">
            <div>
              <div className="flex items-end gap-3">
                <Ring size={42} className="text-brand-pink" />
                <Square size={40} className="text-brand-yellow" />
              </div>
              <h3 className="mt-10 text-[clamp(1.6rem,2.6vw,2.5rem)] font-semibold leading-[1.2] tracking-tight">{text.rightTitle}</h3>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">{text.rightBody}</p>
            </div>
            <blockquote className="border-l-4 border-brand-yellow pl-5 text-xl font-semibold leading-snug text-brand-yellow md:text-2xl">
              {text.quote}
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
