import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.type !== "personal").slice(0, 4);

const ProjectsSection: React.FC = () => (
  <section className="section-y border-t border-line">
    <div className="container-page">
      <SectionHeader
        index="07"
        label="Selected Work"
        title="精选项目"
        description="智能家居 App、SaaS 系统与品牌视觉——从 0 到 1，也从 1 到 N。"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 0.08} className="h-full">
            <ProjectCard project={project} href={`/projects?project=${project.id}`} />
          </Reveal>
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

export default ProjectsSection;
