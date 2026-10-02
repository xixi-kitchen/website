import React, { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";

const featured = projects.filter((p) => p.type !== "personal").slice(0, 4);

const ProjectsSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        ".work-card",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeader
          index="07"
          label="Selected Work"
          title="精选项目"
          description="智能家居 App、SaaS 系统与品牌视觉——从 0 到 1，也从 1 到 N。"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <div key={project.id} className="work-card h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/projects" variant="secondary">
            查看全部项目
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
