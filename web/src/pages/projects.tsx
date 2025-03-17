// src/pages/projects.tsx
import React, { useState } from "react";
import Image from "next/image";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
interface ProjectModalProps {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // 将项目数据转换为符合ProjectCard接口的格式
  const formattedProject = {
    id: String(project.id),
    title: project.title,
    description: project.description || project.subtitle || "",
    image: project.image || undefined,
    tags: project.tags || [],
    link: project.link || undefined,
    details: project.details || [],
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-yellow-base/5 rounded-2xl shadow-2xl transform transition-all border border-yellow-base/20 dark:border-yellow-base/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 弹窗头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-yellow/20 dark:border-yellow/30 bg-white/90 dark:bg-yellow-base/10 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-yellow-dark dark:text-yellow-base">
            {formattedProject.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-yellow-base/70 hover:text-yellow-base dark:text-yellow-base/50 dark:hover:text-yellow-base rounded-full hover:bg-yellow-base/10 dark:hover:bg-yellow-base/20 transition-colors"
            aria-label="关闭"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6">
          

          {/* 项目标签 */}
          {formattedProject.tags && formattedProject.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {formattedProject.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-base/20 dark:bg-yellow-base/20 text-yellow-dark dark:text-yellow-base/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 项目描述 */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-base dark:text-zinc-light/90 mb-4">
              {formattedProject.description}
            </p>

            {/* 项目详情 */}
            {formattedProject.details &&
              formattedProject.details.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xl font-semibold mb-3 text-yellow-dark dark:text-yellow-base">
                    项目详情
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-base dark:text-zinc-light">
                    {formattedProject.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

       
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  // 将项目按类型分类
  const latestProjects = filteredProjects.filter(
    (project) => project.type === "latest"
  );
  const pastProjects = filteredProjects.filter(
    (project) => project.type === "past"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-base/5 via-yellow/5 to-yellow-base/5 dark:from-yellow-base/10 dark:via-yellow/10 dark:to-yellow-base/10 relative overflow-hidden">
      {/* 装饰性图形 */}
      <div className="absolute inset-0 dark:hidden blur-2xl">
        {/* 圆环 */}
        <svg className="absolute top-[15%] left-[10%] w-96 h-96 ">
          <circle
            cx="192"
            cy="192"
            r="100"
            fill="none"
            stroke="#ec4899"
            strokeWidth="48"
            opacity="1"
          />
        </svg>
        <svg className="absolute bottom-[20%] right-[15%] w-96 h-96">
          <circle
            cx="192"
            cy="192"
            r="100"
            fill="none"
            stroke="#ec4899"
            strokeWidth="48"
            opacity="1"
          />
        </svg>

        {/* 三角形 */}
        <svg className="absolute top-[25%] right-[20%] w-64 h-64">
          <path d="M128,0 L256,256 L0,256 Z" fill="#1d4ed8" opacity="1" />
        </svg>
        <svg className="absolute bottom-[30%] left-[25%] w-64 h-64">
          <path d="M128,256 L256,0 L0,0 Z" fill="#1d4ed8" opacity="1" />
        </svg>

        {/* 正方形 */}
        <svg className="absolute top-[40%] left-[35%] w-64 h-64">
          <rect
            x="0"
            y="0"
            width="256"
            height="256"
            fill="#fde047"
            opacity="1"
            rx="16"
          />
        </svg>
        <svg className="absolute top-[60%] right-[30%] w-64 h-64">
          <rect
            x="0"
            y="0"
            width="256"
            height="256"
            fill="#fde047"
            opacity="1"
            rx="16"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 relative">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-start gap-6 sm:gap-10"
        >
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-base via-yellow-base to-pink-base">
              PROJECTS
            </h1>
            <motion.div
              initial={{ scale: 0, rotate: -180, x: -1000 }}
              animate={{ scale: 1, rotate: 0, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 120,
                damping: 10,
              }}
            >
              <Image
                className="w-24 sm:w-32 md:w-40 lg:w-56 h-auto"
                width={224}
                height={254}
                alt=""
                src="Vector.svg"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* 搜索框 */}
        <div className="max-w-md mx-auto mb-12 mt-12">
          <div className="relative group">
            <input
              type="text"
              placeholder="搜索项目..."
              className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-yellow-base/20 dark:border-yellow-base/30 bg-white/50 dark:bg-yellow-base/5 backdrop-blur-sm text-yellow-base dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-base/50 focus:border-yellow-base/50 transition-all duration-300 shadow-sm hover:shadow-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 最新项目 */}
        {latestProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-yellow-base mb-8 flex items-center">
              <span className="w-1 h-6 bg-yellow-base rounded-full mr-3"></span>
              最新项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 过往项目 */}
        {pastProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-yellow-base  mb-8 flex items-center">
              <span className="w-1 h-6 bg-yellow rounded-full mr-3"></span>
              过往项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 个人项目 */}
        {/* {personalProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-yellow-base dark:text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-yellow-base rounded-full mr-3"></span>
              个人项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personalProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-yellow-base dark:text-yellow/70 text-lg">
              没有找到匹配的项目
            </p>
          </div>
        )}
      </div>

      {/* 项目详情弹窗 */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;
