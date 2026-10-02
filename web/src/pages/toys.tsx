import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { toys, type Toy } from "@/data/toys";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import Tag, { type TagTone } from "@/components/ui/Tag";
import { cardBase, cardInteractive } from "@/components/ui/Card";

type Filter = "all" | Toy["status"];

const statusMeta: Record<Toy["status"], { label: string; tone: TagTone }> = {
  completed: { label: "已完成", tone: "blue" },
  "in-progress": { label: "进行中", tone: "yellow" },
  planned: { label: "计划中", tone: "neutral" },
};

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "completed", label: "已完成" },
  { value: "in-progress", label: "进行中" },
  { value: "planned", label: "计划中" },
];

const ToyModal: React.FC<{ toy: Toy; onClose: () => void }> = ({ toy, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-night/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-surface p-7 sm:rounded-3xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-ink"
          aria-label="关闭"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <Tag tone={statusMeta[toy.status].tone}>{statusMeta[toy.status].label}</Tag>
        <h3 className="mt-4 pr-12 text-3xl font-semibold text-ink">{toy.title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{toy.description}</p>

        {toy.inspiration && (
          <section className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">灵感来源</h4>
            <p className="mt-3 text-ink/85">{toy.inspiration}</p>
          </section>
        )}
        {toy.features && (
          <section className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">功能特点</h4>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/85 marker:text-line">
              {toy.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}
        <section className="mt-8">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">技术栈</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {toy.techStack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </section>

        {(toy.link || toy.github) && (
          <div className="mt-10 flex gap-3">
            {toy.link && (
              <a href={toy.link} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-canvas">
                查看演示
              </a>
            )}
            {toy.github && (
              <a href={toy.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink">
                GitHub
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Toys: NextPage = () => {
  const [selected, setSelected] = useState<Toy | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const visible = toys.filter((t) => filter === "all" || t.status === filter);

  return (
    <>
      <Head>
        <title>创意实验 | HUGH·Aix</title>
        <meta name="description" content="HUGH·Aix 的创意小玩意与个人实验项目。" />
      </Head>

      <div className="relative isolate">
        <GeometricBackdrop />
        <PageHeader
          label="Toys · Beta"
          title="创意实验"
          subtitle="工作之外的小玩意：有些已经能玩，有些还躺在计划里。"
          note="本页面正在设计构建中，内容与布局会持续更新。"
        />

        <div className="container-page pb-28">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="按状态筛选">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`h-10 rounded-full px-5 text-sm transition-colors ${
                  filter === f.value ? "bg-ink text-canvas" : "border border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {visible.map((toy) => (
              <button
                key={toy.id}
                type="button"
                onClick={() => setSelected(toy)}
                className={`group flex flex-col p-7 text-left ${cardBase} ${cardInteractive}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-ink">{toy.title}</h3>
                  <Tag tone={statusMeta[toy.status].tone}>{statusMeta[toy.status].label}</Tag>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{toy.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {toy.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {visible.length === 0 && <p className="mt-16 text-center text-muted">这个分类下暂时还没有项目。</p>}
        </div>
      </div>

      <AnimatePresence>{selected && <ToyModal toy={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
};

export default Toys;
