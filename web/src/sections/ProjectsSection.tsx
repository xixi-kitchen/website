import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useI18n } from "@/i18n/useI18n";
import { localizeProject } from "@/i18n/localizeProject";

const featured = projects.filter((p) => p.type !== "personal").slice(0, 4);
const bands = ["bg-brand-pink", "bg-brand-blue", "bg-brand-yellow", "bg-brand-pink"];

const ProjectsSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  const t = useI18n();
  const { locale } = useRouter();
  const [reduced, setReduced] = useState(false);
  const pieces = featured.map((project) => localizeProject(project, locale));

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const paint = (clientX: number, clientY: number) => {
    rows.current.forEach((row) => {
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const distance = Math.abs(clientY - (rect.top + rect.height / 2));
      const near = Math.max(0, 1 - distance / (rect.height * 1.35));
      const x = near > 0.08 ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0;
      row.style.setProperty("--near", near.toFixed(3));
      row.style.setProperty("--x", x.toFixed(3));
    });
  };

  const clear = () => {
    rows.current.forEach((row) => {
      row?.style.setProperty("--near", "0");
      row?.style.setProperty("--x", "0");
    });
  };

  return (
    <section
      ref={root}
      className="section-y border-t border-line"
      onPointerMove={(event) => {
        if (reduced || event.pointerType === "touch") return;
        paint(event.clientX, event.clientY);
      }}
      onPointerLeave={clear}
    >
      <div className="container-page">
        <SectionHeader index={t.work.index} label={t.work.label} title={t.work.title} description={t.work.description} />

        {reduced ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {pieces.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <ol className="mt-14 border-t border-line">
            {pieces.map((project, i) => (
              <li key={project.id} className="border-b border-line">
                <Link
                  href={`/projects/${project.slug}`}
                  ref={(node) => {
                    rows.current[i] = node;
                  }}
                  className="group relative block overflow-hidden py-3 md:py-5"
                  style={{ fontWeight: "calc(460 + var(--near, 0) * 300)" }}
                >
                  <span className="flex items-baseline gap-4 px-1 text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.04em] text-ink md:gap-8">
                    <span className="w-[2.2ch] shrink-0 font-mono text-[0.22em] font-normal tracking-normal text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{project.title}</span>
                  </span>
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-y-0 left-0 overflow-hidden text-[#121214] ${bands[i % bands.length]}`}
                    style={{ width: "calc(var(--x, 0) * 100%)" }}
                  >
                    <span className="flex w-[100vw] items-baseline gap-4 px-1 py-3 text-[clamp(2.6rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] md:gap-8 md:py-5">
                      <span className="w-[2.2ch] shrink-0 font-mono text-[0.22em] font-normal tracking-normal opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{project.title}</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-12 flex justify-center">
          <Button href="/projects" variant="secondary">
            {t.work.all}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
