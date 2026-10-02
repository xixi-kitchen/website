import React, { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Ring, Square, Triangle } from "@/components/ui/BrandShapes";
import { gsap, useGSAP, ScrollTrigger, reducedMotion } from "@/lib/gsap-client";

const stats = [
  { value: 8, unit: "次", label: "各项奖学金", accent: "bg-brand-yellow" },
  { value: 21, unit: "项", label: "各类奖项", accent: "bg-brand-pink" },
  { value: 2, unit: "项", label: "专利", accent: "bg-brand-blue" },
];

const honors = [
  { icon: <Ring size={22} />, text: "上海市级优秀毕业生" },
  { icon: <Triangle size={24} />, text: "优秀新人、优秀员工" },
  { icon: <Square size={20} />, text: "开创生产可用性 RoomMap 功能" },
];

const Honor: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(".honor-num").forEach((el, i) => {
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            el.textContent = "0";
            gsap.to(obj, {
              val: stats[i].value,
              duration: 1.4,
              ease: "power2.out",
              snap: { val: 1 },
              onUpdate: () => {
                el.textContent = String(Math.round(obj.val));
              },
            });
          },
        });
      });

      gsap.from(".honor-chip", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".honor-chip", start: "top 90%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-y">
      <div className="container-page">
        <SectionHeader index="05" label="Honors" title="荣誉与认可" />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8">
              <span className={`absolute right-6 top-6 h-3 w-3 rounded-full ${s.accent}`} aria-hidden />
              <p className="flex items-baseline gap-2 text-ink">
                <span className="honor-num text-[clamp(4rem,8vw,6.5rem)] font-semibold leading-none tracking-[-0.04em]">{s.value}</span>
                <span className="text-xl text-muted">{s.unit}</span>
              </p>
              <p className="mt-6 text-lg font-medium text-ink">{s.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {honors.map((h) => (
            <li key={h.text} className="honor-chip flex items-center gap-4 bg-surface px-8 py-6 text-lg font-medium text-ink">
              <span className="shrink-0">{h.icon}</span>
              {h.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Honor;
