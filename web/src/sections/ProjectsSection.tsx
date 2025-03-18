// src/sections/ProjectsSection.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { projects as projectData } from "../data/projects";
import { motion } from "framer-motion";
import HomeProjectCard from "../components/HomeProjectCard";

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
      {/* 装饰性背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-base/5 via-yellow/5 to-yellow-base/5 dark:from-yellow-base/10 dark:via-yellow/10 dark:to-yellow-base/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-base/10 dark:bg-yellow-base/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-base/10 dark:bg-yellow-base/20 rounded-full blur-3xl"></div>
      </div>

      {/* 内容容器 */}
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl relative">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-dark dark:text-yellow-base mb-4">
            PROJECTS
          </h2>
          <p className="text-lg text-zinc-base dark:text-zinc-light max-w-2xl mx-auto">
            探索我的项目作品，每个项目都凝聚着独特的创意和专业的实现
          </p>
        </motion.div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <HomeProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* 查看更多按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 bg-yellow-base/20 dark:bg-yellow-base/30 text-yellow-dark dark:text-yellow-base rounded-full font-medium hover:bg-yellow-base/30 dark:hover:bg-yellow-base/40 transition-colors duration-300"
          >
            查看所有项目
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
