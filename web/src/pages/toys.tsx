import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { toys, type Toy } from "@/data/toys";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import Tag, { type TagTone } from "@/components/ui/Tag";
import { cardBase, cardInteractive } from "@/components/ui/Card";
import { useRouter } from "next/router";

type Filter = "all" | Toy["status"];

const statusTone: Record<Toy["status"], TagTone> = {
  completed: "blue",
  "in-progress": "yellow",
  planned: "neutral",
};

const filters: { value: Filter }[] = [
  { value: "all" },
  { value: "completed" },
  { value: "in-progress" },
  { value: "planned" },
];

const toyEn: Record<number, Pick<Toy, "title" | "description" | "tags" | "features" | "inspiration" | "techStack">> = {
  1: {
    title: "Desktop pet",
    description: "A desktop companion for work, with weather and schedule reminders.",
    tags: ["Desktop", "Intelligence", "Play"],
    techStack: ["Desktop shell", "Interface", "Types", "Local model"],
    features: ["Animation", "Conversation", "Weather", "Schedule", "Custom look"],
    inspiration: "A small companion while working.",
  },
  2: {
    title: "Snippet maker",
    description: "Turn a plain description into a code snippet, in more than one language.",
    tags: ["Tool", "Intelligence", "Speed"],
    techStack: ["Site", "Model interface", "Layout"],
    features: ["Words to code", "Several languages", "Highlighting", "Copy once"],
    inspiration: "Make programming more direct.",
  },
};

const localizeToy = (toy: Toy, en: boolean): Toy => (en && toyEn[toy.id] ? { ...toy, ...toyEn[toy.id] } : toy);

const ToyModal: React.FC<{ toy: Toy; onClose: () => void; en: boolean }> = ({ toy, onClose, en }) => {
  const view = localizeToy(toy, en);
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
          aria-label={en ? "Close" : "关闭"}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <Tag tone={statusTone[view.status]}>{en ? (view.status === "completed" ? "Done" : view.status === "in-progress" ? "In progress" : "Planned") : view.status === "completed" ? "已完成" : view.status === "in-progress" ? "进行中" : "计划中"}</Tag>
        <h3 className="mt-4 pr-12 text-3xl font-semibold text-ink">{view.title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{view.description}</p>

        {view.inspiration && (
          <section className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{en ? "Source" : "灵感来源"}</h4>
            <p className="mt-3 text-ink/85">{view.inspiration}</p>
          </section>
        )}
        {view.features && (
          <section className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{en ? "Features" : "功能特点"}</h4>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/85 marker:text-line">
              {view.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}
        <section className="mt-8">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{en ? "Stack" : "技术栈"}</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {view.techStack.map((item) => (
              <Tag key={item}>{item}</Tag>
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
  const en = useRouter().locale === "en";
  const visible = toys.filter((item) => filter === "all" || item.status === filter).map((item) => localizeToy(item, en));
  const statusLabel = (status: Toy["status"]) =>
    en
      ? status === "completed"
        ? "Done"
        : status === "in-progress"
          ? "In progress"
          : "Planned"
      : status === "completed"
        ? "已完成"
        : status === "in-progress"
          ? "进行中"
          : "计划中";
  const filterLabel = (value: Filter) => (value === "all" ? (en ? "All" : "全部") : statusLabel(value));

  return (
    <>
      <Head>
        <title>创意实验 | HUGH·Aix</title>
        <meta name="description" content="HUGH·Aix 的创意小玩意与个人实验项目。" />
      </Head>

      <div className="relative isolate">
        <GeometricBackdrop />
        <PageHeader
          label={en ? "Lab" : "实验"}
          title={en ? "Play" : "创意实验"}
          subtitle={en ? "Small things made beside the studio work." : "正事旁边的小东西。有的已经能玩，有的还在计划里。"}
          note={en ? "This page is still being built." : "这一页还在继续写。"}
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
                {filterLabel(f.value)}
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
                  <Tag tone={statusTone[toy.status]}>{statusLabel(toy.status)}</Tag>
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

          {visible.length === 0 && <p className="mt-16 text-center text-muted">{en ? "Nothing in this group yet." : "这个分类下暂时还没有项目。"}</p>}
        </div>
      </div>

      <AnimatePresence>{selected && <ToyModal toy={selected} en={en} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
};

export default Toys;
