import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import ProjectCover from "@/components/ui/ProjectCover";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

const ListBlock: React.FC<{ title?: string; items?: string[] }> = ({ title, items }) =>
  items && items.length > 0 ? (
    <div>
      {title && <h5 className="mb-2 text-sm font-semibold text-ink">{title}</h5>}
      <ul className="space-y-1.5 text-[15px] leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-2xl border border-line p-6">
    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{title}</h4>
    <div className="mt-4 space-y-5">{children}</div>
  </section>
);

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-night/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-surface sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ProjectCover id={project.id} className="aspect-[21/9]" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#121214] transition hover:bg-white"
          aria-label="关闭"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h3 id="project-modal-title" className="mt-5 text-title font-semibold text-ink">
            {project.title}
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{project.description}</p>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {project.projectInfo && (
              <Panel title="项目概述">
                <div>
                  <h5 className="text-sm font-semibold text-ink">背景</h5>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.projectInfo.background}</p>
                </div>
                <ListBlock title="目标" items={project.projectInfo.objectives} />
                <ListBlock title="挑战" items={project.projectInfo.challenges} />
                <ListBlock title="解决方案" items={project.projectInfo.solutions} />
              </Panel>
            )}
            <div className="space-y-5">
              {project.responsibilities && (
                <Panel title="我的职责">
                  <ListBlock items={project.responsibilities} />
                </Panel>
              )}
              {project.achievements && (
                <Panel title="项目成就">
                  <ListBlock title="关键指标" items={project.achievements.metrics} />
                  <ListBlock title="项目亮点" items={project.achievements.highlights} />
                </Panel>
              )}
            </div>
            {project.features && (
              <Panel title="功能特性">
                <ListBlock title="核心功能" items={project.features.core} />
                <ListBlock title="设计特性" items={project.features.design} />
                <ListBlock title="技术特性" items={project.features.technical} />
              </Panel>
            )}
            {project.optimizations && (
              <Panel title="优化成果">
                <ListBlock title="流程优化" items={project.optimizations.process} />
                <ListBlock title="核心优化" items={project.optimizations.core} />
                <ListBlock title="优化结果" items={project.optimizations.results} />
              </Panel>
            )}
            {project.futurePlans && (
              <Panel title="未来计划">
                <ListBlock items={project.futurePlans} />
              </Panel>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const groups: { type: Project["type"]; label: string; index: string }[] = [
  { type: "latest", label: "最新项目", index: "01" },
  { type: "past", label: "过往项目", index: "02" },
];

const Projects: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const selected = useMemo(() => {
    const id = Number(router.query.project);
    return projects.find((p) => p.id === id) ?? null;
  }, [router.query.project]);

  const setSelected = (project: Project | null) => {
    router.push(
      { pathname: "/projects", query: project ? { project: project.id } : {} },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  const keyword = search.trim().toLowerCase();
  const filtered = projects.filter(
    (p) =>
      p.type !== "personal" &&
      (!keyword ||
        p.title.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        p.tags.some((t) => t.toLowerCase().includes(keyword)))
  );

  return (
    <>
      <Head>
        <title>项目 | HUGH·Aix</title>
        <meta name="description" content="HUGH·Aix 的项目作品：智能家居 App、SaaS 系统交互改版、品牌视觉系统等。" />
      </Head>

      <div className="relative isolate">
        <GeometricBackdrop />
        <PageHeader
          label="Projects"
          title="项目作品"
          subtitle="智能家居 App 的 0 到 1、外贸 SaaS 系统的体验重构，以及品牌视觉系统升级。点击卡片查看项目详情。"
        />

        <div className="container-page pb-28">
          <label className="relative block max-w-md">
            <span className="sr-only">搜索项目</span>
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="搜索项目名称、描述或标签"
              className="h-12 w-full rounded-full border border-line bg-surface pl-11 pr-5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          {groups.map((group) => {
            const items = filtered.filter((p) => p.type === group.type);
            if (items.length === 0) return null;
            return (
              <section key={group.type} className="mt-16">
                <div className="flex items-baseline justify-between border-b border-line pb-4">
                  <h2 className="text-2xl font-semibold text-ink">
                    <span className="mr-3 font-mono text-sm text-muted">{group.index}</span>
                    {group.label}
                  </h2>
                  <span className="font-mono text-sm text-muted">{items.length}</span>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {items.map((project, i) => (
                    <Reveal key={project.id} delay={(i % 2) * 0.06} className="h-full">
                      <ProjectCard project={project} onSelect={setSelected} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && <p className="mt-16 text-center text-muted">没有找到匹配的项目，换个关键词试试。</p>}
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
};

export default Projects;
