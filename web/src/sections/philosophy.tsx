import React, { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Ring, Square, Triangle } from "@/components/ui/BrandShapes";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";

const principles = [
  { term: "人性", meaning: "最本质的冲动" },
  { term: "简单", meaning: "极致的低成本" },
  { term: "平衡", meaning: "价值的最大化" },
];

const Philosophy: React.FC = () => {
  const root = useRef<HTMLElement>(null);

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
        01 — Philosophy
      </p>
      <div className="container-page">
        <SectionHeader
          index="01"
          label="Philosophy"
          title="我的设计理念"
          description="设计不止于产品，而是对人性的理解、对系统的优化。"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article className="philo-card flex h-full flex-col justify-between gap-14 rounded-3xl bg-brand-pink p-8 text-[#121214] md:p-12">
            <div>
              <div className="flex items-end gap-3">
                <Triangle size={44} className="text-[#121214]" />
                <Square size={40} className="text-brand-yellow" />
              </div>
              <h3 className="mt-10 text-[clamp(1.6rem,2.6vw,2.5rem)] font-semibold leading-[1.2] tracking-tight">
                在遵循人性的前提下，
                <br />
                达到最简单的平衡
              </h3>
            </div>
            <dl className="divide-y divide-[#121214]/15 border-t border-[#121214]/15">
              {principles.map((p) => (
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
              <h3 className="mt-10 text-[clamp(1.6rem,2.6vw,2.5rem)] font-semibold leading-[1.2] tracking-tight">
                善用跨领域底层逻辑
                <br />
                以多面手视角驱动效率
              </h3>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
                以复合型思维支撑多维任务，虽无需深耕每个领域，但擅长通过掌握学科核心方法论，快速解析模块化问题并实现资源协作。
              </p>
            </div>
            <blockquote className="border-l-4 border-brand-yellow pl-5 text-xl font-semibold leading-snug text-brand-yellow md:text-2xl">
              “一个人就是一个团队，每一个方面都需要懂——最基础的原理和原则。”
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
