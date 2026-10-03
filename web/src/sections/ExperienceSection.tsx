import React, { useRef } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Button, { ArrowIcon } from "@/components/ui/Button";
import { experiences } from "@/data/experience";
import { useRouter } from "next/router";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";
import { useI18n } from "@/i18n/useI18n";

const ExperienceSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const t = useI18n();
  const en = useRouter().locale === "en";
  const english: Record<string, { period: string; company: string; title: string; summary: string[] }> = {
    lifesmart: {
      period: "2023.5 — now",
      company: "Hangzhou Xingzhi Yunqi Technology",
      title: "Lead product manager for software",
      summary: ["Led the app’s third major upgrade", "Refreshed most of the interface", "Ran custom software for partners", "Built a product knowledge base with a model"],
    },
    futong: {
      period: "2022.5 — 2023.4",
      company: "Futong Cloud, Hangzhou",
      title: "Interaction designer, head of experience",
      summary: ["Reworked the trade-management flows", "Rebuilt the global buyers section", "Reshaped the business-system process"],
    },
    tairui: {
      period: "2021.4 — 2022.4",
      company: "Tederic Machinery",
      title: "Engineer, industrial design",
      summary: ["Designed machines and their use", "Moved between the workshop and the screen"],
    },
  };

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        ".exp-row",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeader index="06" label={t.about.experienceLabel} title={t.about.experienceTitle} />

        <ol className="mt-14 border-t border-line">
          {experiences.map((exp) => {
            const view = en && english[exp.id] ? english[exp.id] : exp;
            return (
            <li key={exp.id} className="exp-row border-b border-line">
              <Link
                href={`/experience#${exp.id}`}
                className="group grid gap-4 py-10 transition-colors md:grid-cols-[14rem_1fr_auto] md:gap-10"
              >
                <p className="font-mono text-sm text-muted">{view.period}</p>
                <div>
                  <h3 className="text-2xl font-semibold text-ink md:text-3xl">{view.company}</h3>
                  <p className="mt-2 text-base font-medium text-blue-text">{view.title}</p>
                  <ul className="mt-5 grid gap-2 text-muted md:grid-cols-2 md:gap-x-10">
                    {view.summary.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed">
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-canvas md:flex">
                  <ArrowIcon />
                </span>
              </Link>
            </li>
            );
          })}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button href="/experience" variant="secondary">
            {t.about.experienceMore}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
