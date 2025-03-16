// src/sections/ProjectsSection.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { projects as projectData } from "../data/projects";
import { motion } from "framer-motion";

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<typeof projectData | null>(null);

  // 加载项目数据
  useEffect(() => {
    if (projectData?.length > 0) {
      setProjects(projectData);
    }
  }, []);

  if (!projects?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-zinc-light dark:text-zinc-light"
        >
          正在加载项目数据...
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-auto md:h-screen bg-yellow-base dark:bg-yellow-dark flex items-center justify-center">
      {/* 内容容器 */}
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl flex flex-col items-start justify-center ">
        {/* 标题区域 */}
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-dark dark:text-zinc-light">
            PROJECTS 
          </h2>

        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.slice(0, 6).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-blue-base dark:bg-blue-dark rounded-lg shadow-md hover:shadow-lg 
                         transition-all duration-300 p-6 border border-gray-200 
                         dark:border-gray-700"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-zinc-">
                {project.title}
              </h3>
              <p className="mt-2 text-zinc-light dark:text-zinc-light">
                {project.subtitle}
              </p>
              <p className="mt-2 text-sm text-zinc-light dark:text-zinc-light">
                {project.period}
              </p>
              {/* <p className="mt-1 text-sm text-zinc-light dark:text-zinc-light">
                角色：{project.role}
              </p> */}
              <p className="mt-4 text-zinc-light dark:text-zinc-light line-clamp-3">
                {project.description}
              </p>

              <Link
                href={`/projects#${project.id}`}
                className="mt-4 inline-flex items-center text-zinc-light hover:text-zinc-light 
                          dark:text-zinc-light dark:hover:text-zinc-light font-medium"
              >
                查看详情
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 查看更多按钮 */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-0 py-3 
                       bg-primary-600 hover:bg-primary-700 text-zinc-dark dark:text-zinc-light font-medium 
                       rounded-lg transition-colors duration-200"
          >
            查看所有项目……
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
