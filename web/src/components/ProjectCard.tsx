import React from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectCover from "./ui/ProjectCover";
import Tag from "./ui/Tag";
import { ArrowIcon } from "./ui/Button";
import { cardBase, cardInteractive } from "./ui/Card";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const highlight = project.achievements?.highlights?.[0];

  return (
    <Link href={`/projects/${project.slug}`} className={`group flex h-full flex-col ${cardBase} ${cardInteractive}`}>
      <ProjectCover
        id={project.id}
        image={project.image ?? project.gallery?.[0]}
        alt={project.title}
        label={String(project.id).padStart(2, "0")}
        className="aspect-[16/9]"
      />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h3 className="mt-5 text-xl font-semibold text-ink md:text-2xl">{project.title}</h3>
        <p className="mt-3 line-clamp-2 leading-relaxed text-muted">{project.description}</p>
        {highlight && (
          <p className="mt-4 flex items-start gap-2 text-sm text-ink">
            <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" aria-hidden />
            {highlight}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
          查看详情
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
