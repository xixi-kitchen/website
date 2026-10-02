import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import Reveal from "@/components/ui/Reveal";

const groups: { type: Project["type"]; label: string; index: string }[] = [
  { type: "latest", label: "最新项目", index: "01" },
  { type: "past", label: "过往项目", index: "02" },
];

const Projects: NextPage = () => {
  const [search, setSearch] = useState("");

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
          subtitle="智能家居 App 的 0 到 1、外贸 SaaS 系统的体验重构，以及品牌视觉系统升级。"
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
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && <p className="mt-16 text-center text-muted">没有找到匹配的项目，换个关键词试试。</p>}
        </div>
      </div>
    </>
  );
};

export default Projects;
