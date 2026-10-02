import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import Reveal from "@/components/ui/Reveal";
import { experiences, timelineEvents, type Experience } from "@/data/experience";

const groupsOf = (exp: Experience, isCurrent: boolean) =>
  [
    { title: isCurrent ? "核心职责" : "工作内容", items: exp.responsibilities },
    { title: "主要成就", items: exp.achievements },
    { title: "技能专长", items: exp.skills },
    { title: "项目亮点", items: exp.highlights },
  ].filter((g): g is { title: string; items: string[] } => Boolean(g.items?.length));

const ExperiencePage: NextPage = () => (
  <>
    <Head>
      <title>经历 | HUGH·Aix</title>
      <meta name="description" content="HUGH·Aix 的职业经历：智能家居软件产品负责人、SaaS 交互设计负责人、工业设计研发工程师。" />
    </Head>

    <div className="relative isolate">
      <GeometricBackdrop />
      <PageHeader
        label="Chronological Experience"
        title="经历编年"
        subtitle="从工业设计到交互体验，再到产品管理。每一段经历都在扩展我对“人”与“系统”的理解。"
      />

      <div className="container-page pb-28">
        <ol className="space-y-6">
          {experiences.map((exp, index) => (
            <li key={exp.id} id={exp.id} className="scroll-mt-24">
              <Reveal>
                <article className="rounded-3xl border border-line bg-surface p-7 md:p-12">
                  <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-12">
                    <div>
                      <p className="font-mono text-sm text-muted">{exp.period}</p>
                      {index === 0 && (
                        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-1 text-xs font-medium text-[#121214]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#121214]" aria-hidden />
                          在职
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-semibold text-ink md:text-3xl">{exp.company}</h2>
                      <p className="mt-2 text-base font-medium text-blue-text md:text-lg">{exp.title}</p>

                      <div className="mt-8 space-y-8">
                        {groupsOf(exp, index === 0).map((group) => (
                          <section key={group.title}>
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{group.title}</h3>
                            <ol className="mt-4 space-y-3">
                              {group.items.map((item, i) => (
                                <li key={item} className="grid grid-cols-[2rem_1fr] text-[15px] leading-relaxed text-ink/85">
                                  <span className="font-mono text-xs leading-[1.9] text-muted">{String(i + 1).padStart(2, "0")}</span>
                                  {item}
                                </li>
                              ))}
                            </ol>
                          </section>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}

          {Object.entries(timelineEvents).map(([year, events]) => (
            <li key={year}>
              <Reveal>
                <article className="rounded-3xl border border-dashed border-line p-7 md:p-12">
                  <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-12">
                    <p className="font-mono text-sm text-muted">{year} · 个人项目</p>
                    <ol className="space-y-6">
                      {events.map((event) => (
                        <li key={event.date}>
                          <p className="text-base font-semibold text-ink">{event.date}</p>
                          <p className="mt-2 text-[15px] leading-relaxed text-muted">{event.description}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="mt-16 text-center font-mono text-sm tracking-widest text-muted">更多经历，正在体验中 ……</p>
      </div>
    </div>
  </>
);

export default ExperiencePage;
