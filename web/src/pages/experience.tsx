import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import Reveal from "@/components/ui/Reveal";
import { experiences, timelineEvents, type Experience } from "@/data/experience";
import { useRouter } from "next/router";
import { useI18n } from "@/i18n/useI18n";

const groupsOf = (exp: Experience, isCurrent: boolean, en: boolean) =>
  [
    { title: en ? (isCurrent ? "Responsibilities" : "Work") : isCurrent ? "核心职责" : "工作内容", items: exp.responsibilities },
    { title: en ? "Results" : "主要成就", items: exp.achievements },
    { title: en ? "Skills" : "技能专长", items: exp.skills },
    { title: en ? "Highlights" : "项目亮点", items: exp.highlights },
  ].filter((g): g is { title: string; items: string[] } => Boolean(g.items?.length));

const englishJobs: Record<string, { period: string; company: string; title: string; summary: string[] }> = {
  lifesmart: {
    period: "May 2023 — now",
    company: "Hangzhou Xingzhi Yunqi Technology",
    title: "Lead product manager for software",
    summary: ["Led the app’s third major upgrade", "Refreshed most of the interface", "Ran custom software for partners", "Built a product knowledge base with a model"],
  },
  futong: {
    period: "May 2022 — April 2023",
    company: "Futong Cloud, Hangzhou",
    title: "Interaction designer, head of experience",
    summary: ["Reworked the trade-management flows", "Rebuilt the global buyers section", "Reshaped the business-system process"],
  },
  tairui: {
    period: "April 2021 — April 2022",
    company: "Tederic Machinery",
    title: "Engineer, industrial design",
    summary: ["Rendered new models and updated production standards", "Helped set the company’s visual system", "Led the public site update"],
  },
};

const timelineEn: Record<string, { date: string; description: string }[]> = {
  "2023": [
    { date: "July", description: "The first studio site went live. It is offline now. The next version is in progress." },
    { date: "May–July", description: "Past projects were gathered into a personal site, using what had been learned up to that point." },
  ],
};

const ExperiencePage: NextPage = () => {
  const t = useI18n();
  const en = useRouter().locale === "en";
  return (
  <>
    <Head>
      <title>{`${t.about.experienceTitle} | ${t.meta.title}`}</title>
      <meta name="description" content={t.about.subtitle} />
    </Head>

    <div className="relative isolate">
      <GeometricBackdrop />
      <PageHeader
        label={t.about.experienceLabel}
        title={t.about.experienceTitle}
        subtitle={en ? "From industrial design to interaction, then to product." : "从工业设计到交互，再到产品。"}
      />

      <div className="container-page pb-28">
        <ol className="space-y-6">
          {experiences.map((exp, index) => (
            <li key={exp.id} id={exp.id} className="scroll-mt-24">
              <Reveal>
                <article className="rounded-3xl border border-line bg-surface p-7 md:p-12">
                  <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-12">
                    <div>
                      <p className="font-mono text-sm text-muted">{en && englishJobs[exp.id] ? englishJobs[exp.id].period : exp.period}</p>
                      {index === 0 && (
                        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-1 text-xs font-medium text-[#121214]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#121214]" aria-hidden />
                          {en ? "Current" : "在职"}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-semibold text-ink md:text-3xl">{en && englishJobs[exp.id] ? englishJobs[exp.id].company : exp.company}</h2>
                      <p className="mt-2 text-base font-medium text-blue-text md:text-lg">{en && englishJobs[exp.id] ? englishJobs[exp.id].title : exp.title}</p>

                      {en && englishJobs[exp.id] ? (
                        <ul className="mt-8 space-y-3">
                          {englishJobs[exp.id].summary.map((item) => (
                            <li key={item} className="text-[15px] leading-relaxed text-ink/85">{item}</li>
                          ))}
                        </ul>
                      ) : (
                      <div className="mt-8 space-y-8">
                        {groupsOf(exp, index === 0, en).map((group) => (
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
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}

          {Object.entries(en ? timelineEn : timelineEvents).map(([year, events]) => (
            <li key={year}>
              <Reveal>
                <article className="rounded-3xl border border-dashed border-line p-7 md:p-12">
                  <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-12">
                    <p className="font-mono text-sm text-muted">{en ? `${year} · Personal` : `${year} · 个人项目`}</p>
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

        <p className="mt-16 text-center font-mono text-sm tracking-widest text-muted">{en ? "More is still happening." : "更多经历，还在发生。"}</p>
      </div>
    </div>
  </>
  );
};

export default ExperiencePage;
