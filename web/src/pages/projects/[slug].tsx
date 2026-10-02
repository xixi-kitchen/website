import React from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectCover from "@/components/ui/ProjectCover";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
const publicProjects = projects.filter((p) => p.type !== "personal");

const typeLabel: Record<Project["type"], string> = {
  latest: "最新项目",
  past: "过往项目",
  personal: "个人项目",
};

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3 leading-relaxed text-ink/85">
        <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" aria-hidden />
        {item}
      </li>
    ))}
  </ul>
);

const Columns: React.FC<{ groups: { title: string; items?: string[] }[] }> = ({ groups }) => {
  const visible = groups.filter((g): g is { title: string; items: string[] } => Boolean(g.items?.length));
  return (
    <div className={`grid gap-4 ${visible.length >= 3 ? "lg:grid-cols-3" : visible.length === 2 ? "md:grid-cols-2" : ""}`}>
      {visible.map((g) => (
        <div key={g.title} className="rounded-2xl border border-line bg-surface p-6">
          <h4 className="text-sm font-semibold text-ink">{g.title}</h4>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted">
            {g.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

/** 把"系统性能提升20%"拆成数字和说明，用大数字展示 */
const splitMetric = (metric: string) => {
  const match = metric.match(/(\d+(?:\.\d+)?%?)/);
  if (!match || match.index === undefined) return { value: null, label: metric };
  return {
    value: match[1],
    label: (metric.slice(0, match.index) + metric.slice(match.index + match[1].length)).replace(/[达到为]+$/, "").trim(),
  };
};

const buildSections = (p: Project): Section[] => {
  const sections: Section[] = [];

  if (p.projectInfo) {
    sections.push({
      id: "background",
      title: "项目背景",
      content: (
        <div className="space-y-8">
          <p className="max-w-3xl text-lg leading-relaxed text-ink/85">{p.projectInfo.background}</p>
          <Columns
            groups={[
              { title: "目标", items: p.projectInfo.objectives },
              { title: "挑战", items: p.projectInfo.challenges },
              { title: "解决方案", items: p.projectInfo.solutions },
            ]}
          />
        </div>
      ),
    });
  }

  if (p.responsibilities?.length) {
    sections.push({
      id: "role",
      title: "我的职责",
      content: (
        <ol className="space-y-4">
          {p.responsibilities.map((item, i) => (
            <li key={item} className="grid grid-cols-[2.5rem_1fr] leading-relaxed text-ink/85">
              <span className="font-mono text-sm leading-[1.75] text-muted">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      ),
    });
  }

  if (p.achievements) {
    const metrics = p.achievements.metrics.map(splitMetric);
    sections.push({
      id: "results",
      title: "项目成果",
      content: (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label + m.value} className="rounded-2xl border border-line bg-surface p-6">
                {m.value ? (
                  <>
                    <p className="text-5xl font-semibold tracking-[-0.03em] text-ink">{m.value}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{m.label}</p>
                  </>
                ) : (
                  <p className="text-base font-medium leading-relaxed text-ink">{m.label}</p>
                )}
              </div>
            ))}
          </div>
          {p.achievements.highlights.length > 0 && <BulletList items={p.achievements.highlights} />}
        </div>
      ),
    });
  }

  if (p.features) {
    sections.push({
      id: "features",
      title: "功能特性",
      content: (
        <Columns
          groups={[
            { title: "核心功能", items: p.features.core },
            { title: "设计特性", items: p.features.design },
            { title: "技术特性", items: p.features.technical },
          ]}
        />
      ),
    });
  }

  if (p.optimizations) {
    sections.push({
      id: "optimizations",
      title: "优化成果",
      content: (
        <Columns
          groups={[
            { title: "流程优化", items: p.optimizations.process },
            { title: "核心优化", items: p.optimizations.core },
            { title: "优化结果", items: p.optimizations.results },
          ]}
        />
      ),
    });
  }

  if (p.futurePlans?.length) {
    sections.push({ id: "next", title: "未来计划", content: <BulletList items={p.futurePlans} /> });
  }

  return sections;
};

interface Props {
  project: Project;
  prev: Pick<Project, "slug" | "title"> | null;
  next: Pick<Project, "slug" | "title"> | null;
}

const ProjectDetail: NextPage<Props> = ({ project, prev, next }) => {
  const sections = buildSections(project);
  const number = String(project.id).padStart(2, "0");

  return (
    <>
      <Head>
        <title>{`${project.title} | 项目 | HUGH·Aix`}</title>
        <meta name="description" content={project.description} />
      </Head>

      <article>
        <header className="container-page pt-10 md:pt-16">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M16 10H5m0 0 4.5-4.5M5 10l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            全部项目
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Project {number} · {typeLabel[project.type]}
            </p>
            <h1 className="mt-5 max-w-4xl text-display font-semibold text-balance text-ink">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-pretty text-muted">{project.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {project.role && <Tag tone="blue">{project.role}</Tag>}
              {project.period && <Tag tone="yellow">{project.period}</Tag>}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <ProjectCover id={project.id} className="mt-12 aspect-[16/9] rounded-3xl md:aspect-[21/9]" />
          </motion.div>
        </header>

        <div className="container-page grid gap-12 py-20 md:grid-cols-[12rem_1fr] md:gap-16 md:py-28">
          <nav aria-label="本页目录" className="hidden md:block">
            <ol className="sticky top-28 space-y-3 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-muted transition-colors hover:text-ink">
                    <span className="font-mono text-xs leading-5">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 space-y-20">
            {sections.map((s, i) => (
              <Reveal key={s.id}>
                <section id={s.id} className="scroll-mt-24">
                  <h2 className="flex items-baseline gap-4 border-b border-line pb-4 text-2xl font-semibold text-ink md:text-3xl">
                    <span className="font-mono text-sm font-normal text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="mt-8">{s.content}</div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <nav aria-label="其他项目" className="border-t border-line">
          <div className="container-page grid md:grid-cols-2">
            {[
              { item: prev, label: "上一个项目", align: "text-left" },
              { item: next, label: "下一个项目", align: "md:text-right" },
            ].map(({ item, label, align }) =>
              item ? (
                <Link
                  key={label}
                  href={`/projects/${item.slug}`}
                  className={`group block border-line py-10 first:border-b md:first:border-b-0 md:first:border-r md:px-8 md:first:pl-0 md:last:pr-0 ${align}`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
                  <span className="mt-3 block text-2xl font-semibold text-ink transition-colors group-hover:text-blue-text">
                    {item.title}
                  </span>
                </Link>
              ) : (
                <span key={label} className="hidden md:block" />
              )
            )}
          </div>
        </nav>
      </article>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: publicProjects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const index = publicProjects.findIndex((p) => p.slug === params?.slug);
  if (index === -1) return { notFound: true };
  const pick = (p?: Project) => (p ? { slug: p.slug, title: p.title } : null);
  return {
    props: {
      project: publicProjects[index],
      prev: pick(publicProjects[index - 1]),
      next: pick(publicProjects[index + 1]),
    },
  };
};

export default ProjectDetail;
