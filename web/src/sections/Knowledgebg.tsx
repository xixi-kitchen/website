import React, { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Ring, Square, Triangle } from "@/components/ui/BrandShapes";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";
import { useI18n } from "@/i18n/useI18n";
import { useRouter } from "next/router";

type Strand = "humanity" | "design" | "tech";

const strandIcon: Record<Strand, React.ReactNode> = {
  humanity: <Ring size={22} />,
  design: <Square size={20} />,
  tech: <Triangle size={22} />,
};

const knowledgeCopy = {
  zh: {
    legend: [
      { strand: "humanity" as const, label: "人文" },
      { strand: "design" as const, label: "设计" },
      { strand: "tech" as const, label: "技术" },
    ],
    items: [
      { strand: "humanity" as const, title: "哲学", desc: "心学、逻辑、古典哲学与政治经济学" },
      { strand: "humanity" as const, title: "心理学", desc: "研究生阶段学习心理学，专业课二百七十四分，满分三百分" },
      { strand: "design" as const, title: "工业设计", desc: "本专业，专业排名第一，获得多项工业设计奖项" },
      { strand: "design" as const, title: "交互设计", desc: "完成交互设计专业认证" },
      { strand: "design" as const, title: "体验系统", desc: "完成用户体验设计专业课程" },
      { strand: "tech" as const, title: "计算机", desc: "自学编程多年，独立写过这个网站" },
      { strand: "tech" as const, title: "数据分析", desc: "自学数据处理、统计和可视化" },
      { strand: "tech" as const, title: "人工智能", desc: "自学机器学习的数学、算法和神经网络，并在本地部署大模型" },
    ],
  },
  en: {
    legend: [
      { strand: "humanity" as const, label: "Humanities" },
      { strand: "design" as const, label: "Design" },
      { strand: "tech" as const, label: "Technology" },
    ],
    items: [
      { strand: "humanity" as const, title: "Philosophy", desc: "Ethics of the mind, logic, classical philosophy, and political economy." },
      { strand: "humanity" as const, title: "Psychology", desc: "Graduate study in psychology, with a subject score of 274 out of 300." },
      { strand: "design" as const, title: "Industrial design", desc: "His major. Ranked first in the program, with several design awards." },
      { strand: "design" as const, title: "Interaction", desc: "Finished a professional certificate in interaction design." },
      { strand: "design" as const, title: "Experience systems", desc: "Finished a professional course in experience design." },
      { strand: "tech" as const, title: "Computing", desc: "Taught himself to program, and built this site alone." },
      { strand: "tech" as const, title: "Data", desc: "Taught himself data handling, statistics, and charts." },
      { strand: "tech" as const, title: "Intelligence", desc: "Taught himself the math, algorithms, and networks behind machine learning, and runs models locally." },
    ],
  },
};

const Knowledgebg: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const t = useI18n();
  const text = knowledgeCopy[useRouter().locale === "en" ? "en" : "zh"];

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        ".know-cell",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.55,
          stagger: { each: 0.05, from: "start" },
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeader
          index="02"
        label={t.about.knowledgeLabel}
        title={t.about.knowledgeTitle}
          description={
            <span className="inline-flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
              {text.legend.map((l) => (
                <span key={l.strand} className="inline-flex items-center gap-2">
                  {strandIcon[l.strand]}
                  {l.label}
                </span>
              ))}
            </span>
          }
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {text.items.map((d, i) => (
            <li key={d.title} className="know-cell group flex flex-col bg-surface p-7 transition-colors hover:bg-canvas">
              <div className="flex items-center justify-between">
                <span className="transition-transform duration-500 group-hover:rotate-12">{strandIcon[d.strand]}</span>
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-12 text-2xl font-semibold text-ink">+ {d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{d.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Knowledgebg;
