import React, { useRef } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Button, { ArrowIcon } from "@/components/ui/Button";
import { experiences } from "@/data/experience";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";

const ExperienceSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

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
        <SectionHeader
          index="06"
          label="Experience"
          title="工作经历"
          description="从工业设计到交互体验，再到产品管理——每一步都在扩展对“人”的理解。"
        />

        <ol className="mt-14 border-t border-line">
          {experiences.map((exp) => (
            <li key={exp.id} className="exp-row border-b border-line">
              <Link
                href={`/experience#${exp.id}`}
                className="group grid gap-4 py-10 transition-colors md:grid-cols-[14rem_1fr_auto] md:gap-10"
              >
                <p className="font-mono text-sm text-muted">{exp.period}</p>
                <div>
                  <h3 className="text-2xl font-semibold text-ink md:text-3xl">{exp.company}</h3>
                  <p className="mt-2 text-base font-medium text-blue-text">{exp.title}</p>
                  <ul className="mt-5 grid gap-2 text-muted md:grid-cols-2 md:gap-x-10">
                    {exp.summary.map((item) => (
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
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button href="/experience" variant="secondary">
            查看完整经历
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
