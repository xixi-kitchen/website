import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { Ring, Square, Triangle } from "@/components/ui/BrandShapes";

type Strand = "humanity" | "design" | "tech";

const strandIcon: Record<Strand, React.ReactNode> = {
  humanity: <Ring size={22} />,
  design: <Square size={20} />,
  tech: <Triangle size={22} />,
};

const disciplines: { strand: Strand; title: string; desc: string }[] = [
  { strand: "humanity", title: "哲学", desc: "王阳明心学、逻辑学、中国古典哲学与《资本论》" },
  { strand: "humanity", title: "心理学", desc: "研究生学习心理学，专业课 274 分（总分 300）" },
  { strand: "design", title: "工业设计", desc: "本专业，专业排名第一，获得多项工业设计奖项" },
  { strand: "design", title: "交互设计", desc: "完成 Google 交互设计专业认证" },
  { strand: "design", title: "用户体验系统", desc: "通过 Coursera 用户体验设计专业课程认证" },
  { strand: "tech", title: "计算机", desc: "自学编程多年，拥有完全独立编写的个人网站" },
  { strand: "tech", title: "数据分析", desc: "自学 Python 及 NumPy、Pandas、Matplotlib、Scikit-learn 等数据分析库" },
  {
    strand: "tech",
    title: "人工智能",
    desc: "自学机器学习数学基础、算法与神经网络原理，本地部署大模型并调用各类大模型 API",
  },
];

const legend: { strand: Strand; label: string }[] = [
  { strand: "humanity", label: "人文" },
  { strand: "design", label: "设计" },
  { strand: "tech", label: "技术" },
];

const Knowledgebg: React.FC = () => (
  <section className="section-y border-t border-line">
    <div className="container-page">
      <SectionHeader
        index="02"
        label="Knowledge"
        title="跨领域的知识背景"
        description={
          <span className="inline-flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
            {legend.map((l) => (
              <span key={l.strand} className="inline-flex items-center gap-2">
                {strandIcon[l.strand]}
                {l.label}
              </span>
            ))}
          </span>
        }
      />

      <Reveal>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((d, i) => (
            <li key={d.title} className="group flex flex-col bg-surface p-7 transition-colors hover:bg-canvas">
              <div className="flex items-center justify-between">
                <span className="transition-transform duration-500 group-hover:rotate-12">{strandIcon[d.strand]}</span>
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-12 text-2xl font-semibold text-ink">+ {d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{d.desc}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Knowledgebg;
