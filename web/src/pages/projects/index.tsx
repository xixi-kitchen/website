import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/useI18n";
import { localizeProject } from "@/i18n/localizeProject";
import { useRouter } from "next/router";

const ProjectStage = dynamic(() => import("@/components/work/ProjectStage"), {
  ssr: false,
  loading: () => <div className="mt-10 h-[70vh] rounded-3xl bg-night" />,
});

const groups: { type: Project["type"]; index: string }[] = [
  { type: "latest", index: "01" },
  { type: "past", index: "02" },
];

const Projects: NextPage = () => {
  const [search, setSearch] = useState("");
  const [reduced, setReduced] = useState(false);
  const t = useI18n();
  const { locale } = useRouter();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

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
        <title>{`${t.work.pageTitle} | ${t.meta.title}`}</title>
        <meta name="description" content={t.work.pageSubtitle} />
      </Head>

      <div className="relative isolate">
        <GeometricBackdrop />
        <PageHeader
          label={t.work.label}
          title={t.work.pageTitle}
          subtitle={t.work.pageSubtitle}
        />

        <div className="container-page pb-28">
          <label className="relative block max-w-md">
            <span className="sr-only">{t.work.search}</span>
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder={t.work.search}
              className="h-12 w-full rounded-full border border-line bg-surface pl-11 pr-5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          {!reduced && filtered.length > 0 && (
            <ProjectStage projects={filtered.map((project) => localizeProject(project, locale))} />
          )}

          {reduced && groups.map((group) => {
            const items = filtered.filter((p) => p.type === group.type);
            if (items.length === 0) return null;
            return (
              <section key={group.type} className="mt-16">
                <div className="flex items-baseline justify-between border-b border-line pb-4">
                  <h2 className="text-2xl font-semibold text-ink">
                    <span className="mr-3 font-mono text-sm text-muted">{group.index}</span>
                    {group.type === "latest" ? t.work.latest : t.work.past}
                  </h2>
                  <span className="font-mono text-sm text-muted">{items.length}</span>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {items.map((project, i) => (
                    <Reveal key={project.id} delay={(i % 2) * 0.06} className="h-full">
                      <ProjectCard project={localizeProject(project, locale)} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && <p className="mt-16 text-center text-muted">{t.work.empty}</p>}
        </div>
      </div>
    </>
  );
};

export default Projects;
