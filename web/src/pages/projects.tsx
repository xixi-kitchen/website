// src/pages/projects.tsx
import React, { useEffect, useState } from "react";
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-yellow-base/5 rounded-2xl shadow-2xl transform transition-all border border-yellow-base/20 dark:border-yellow-base/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 弹窗头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-yellow/20 dark:border-yellow/30 bg-white/90 dark:bg-yellow-base/10 backdrop-blur-sm">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-yellow-dark dark:text-yellow-base">
                {project.title}
              </h3>
              {project.role && (
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-base/20 dark:bg-yellow-base/20 text-yellow-dark dark:text-yellow-base/80">
                  {project.role}
                </span>
              )}
            </div>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-base/20 dark:bg-yellow-base/20 text-yellow-dark dark:text-yellow-base/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {project.period && (
              <div className="flex items-center gap-2 mt-2 text-sm text-zinc-base dark:text-zinc-light">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {project.period}
              </div>
            )}
          </div>
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
          {/* 项目描述 */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-base mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-zinc-base dark:text-zinc-light/90 text-lg">
                {project.description}
              </p>
            </div>
          </div>

          {/* 主要内容区域 - 使用网格布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧栏 - 项目信息和职责 */}
            <div className="space-y-8">
              {/* 项目信息 */}
              {project.projectInfo && (
                <div className="bg-yellow-base/5 dark:bg-yellow-base/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h4 className="text-xl font-semibold text-yellow-dark dark:text-yellow-base">
                      项目概述
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                        背景
                      </h5>
                      <p className="text-zinc-base dark:text-zinc-light">
                        {project.projectInfo.background}
                      </p>
                    </div>
                    {project.projectInfo.objectives && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          目标
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.projectInfo.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.projectInfo.challenges && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          挑战
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.projectInfo.challenges.map((challenge, index) => (
                            <li key={index}>{challenge}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.projectInfo.solutions && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          解决方案
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.projectInfo.solutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 职责 */}
              {project.responsibilities && (
                <div className="bg-yellow-base/5 dark:bg-yellow-base/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h4 className="text-xl font-semibold text-yellow-dark dark:text-yellow-base">
                      我的职责
                    </h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-base dark:text-zinc-light">
                    {project.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 右侧栏 - 成就和特性 */}
            <div className="space-y-8">
              {/* 成就 */}
              {project.achievements && (
                <div className="bg-yellow-base/5 dark:bg-yellow-base/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-xl font-semibold text-yellow-dark dark:text-yellow-base">
                      项目成就
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {project.achievements.metrics && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          关键指标
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.achievements.metrics.map((metric, index) => (
                            <li key={index}>{metric}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.achievements.highlights && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          项目亮点
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.achievements.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 功能特性 */}
              {project.features && (
                <div className="bg-yellow-base/5 dark:bg-yellow-base/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h4 className="text-xl font-semibold text-yellow-dark dark:text-yellow-base">
                      功能特性
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {project.features.core && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          核心功能
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.features.core.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.features.design && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          设计特性
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.features.design.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.features.technical && (
                      <div>
                        <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                          技术特性
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                          {project.features.technical.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 底部区域 - 优化和未来计划 */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 优化成果 */}
            {project.optimizations && (
              <div className="bg-yellow-base/5 dark:bg-yellow-base/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 className="text-xl font-semibold text-yellow-dark dark:text-yellow-base">
                    优化成果
                  </h4>
                </div>
                <div className="space-y-4">
                  {project.optimizations.process && (
                    <div>
                      <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                        流程优化
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                        {project.optimizations.process.map((process, index) => (
                          <li key={index}>{process}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.optimizations.core && (
                    <div>
                      <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                        核心优化
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                        {project.optimizations.core.map((core, index) => (
                          <li key={index}>{core}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.optimizations.results && (
                    <div>
                      <h5 className="text-lg font-medium mb-2 text-yellow-dark dark:text-yellow-base">
                        优化结果
                      </h5>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-base dark:text-zinc-light">
                        {project.optimizations.results.map((result, index) => (
                          <li key={index}>{result}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 未来计划 */}
            {project.futurePlans && (
              <div className="bg-yellow-base/5 dark:bg-yellow-base/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h4 className="text-xl font-semibold text-yellow-dark dark:text-yellow-base">
                    未来计划
                  </h4>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-zinc-base dark:text-zinc-light">
                  {project.futurePlans.map((plan, index) => (
                    <li key={index}>{plan}</li>
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
  const [positions, setPositions] = useState({
    circle1: { top: "15%", left: "10%" },
    circle2: { bottom: "20%", right: "15%" },
    triangle1: { top: "25%", right: "20%" },
    triangle2: { bottom: "30%", left: "25%" },
    square1: { top: "40%", left: "35%" },
    square2: { top: "60%", right: "30%" }
  });

  useEffect(() => {
    const updatePositions = () => {
      setPositions({
        circle1: {
          top: `${Math.random() * 30 + 5}%`,
          left: `${Math.random() * 20 + 5}%`
        },
        circle2: {
          bottom: `${Math.random() * 30 + 5}%`,
          right: `${Math.random() * 20 + 5}%`
        },
        triangle1: {
          top: `${Math.random() * 30 + 15}%`,
          right: `${Math.random() * 20 + 10}%`
        },
        triangle2: {
          bottom: `${Math.random() * 30 + 15}%`,
          left: `${Math.random() * 20 + 10}%`
        },
        square1: {
          top: `${Math.random() * 30 + 25}%`,
          left: `${Math.random() * 20 + 20}%`
        },
        square2: {
          top: `${Math.random() * 30 + 45}%`,
          right: `${Math.random() * 20 + 15}%`
        }
      });
    };

    const interval = setInterval(updatePositions, 10000); // 每10秒更新一次位置

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-base/5 via-yellow/5 to-yellow-base/5 dark:from-yellow-base/10 dark:via-yellow/10 dark:to-yellow-base/10 relative overflow-hidden">
      {/* 装饰性图形 */}
      <div className="absolute inset-0 dark:hidden blur-2xl">
          {/* 圆环 */}
          <motion.svg 
            className="absolute w-96 h-96"
            initial={positions.circle1}
            animate={positions.circle1}
            transition={{
              duration: 10,
              ease: "easeInOut"
            }}
          >
            <circle
              cx="192"
              cy="192"
              r="100"
              fill="none"
              stroke="#ec4899"
              strokeWidth="48"
              opacity="1"
            />
          </motion.svg>
          <motion.svg 
            className="absolute w-96 h-96"
            initial={positions.circle2}
            animate={positions.circle2}
            transition={{
              duration: 10,
              ease: "easeInOut"
            }}
          >
            <circle
              cx="192"
              cy="192"
              r="100"
              fill="none"
              stroke="#ec4899"
              strokeWidth="48"
              opacity="1"
            />
          </motion.svg>

          {/* 三角形 */}
          <motion.svg 
            className="absolute w-64 h-64"
            initial={positions.triangle1}
            animate={positions.triangle1}
            transition={{
              duration: 10,
              ease: "easeInOut"
            }}
          >
            <path
              d="M128,0 L256,256 L0,256 Z"
              fill="#1d4ed8"
              opacity="1"
            />
          </motion.svg>
          <motion.svg 
            className="absolute w-64 h-64"
            initial={positions.triangle2}
            animate={positions.triangle2}
            transition={{
              duration: 10,
              ease: "easeInOut"
            }}
          >
            <path
              d="M128,256 L256,0 L0,0 Z"
              fill="#1d4ed8"
              opacity="1"
            />
          </motion.svg>

          {/* 正方形 */}
          <motion.svg 
            className="absolute w-64 h-64"
            initial={positions.square1}
            animate={positions.square1}
            transition={{
              duration: 10,
              ease: "easeInOut"
            }}
          >
            <rect
              x="0"
              y="0"
              width="256"
              height="256"
              fill="#fde047"
              opacity="1"
              rx="16"
            />
          </motion.svg>
          <motion.svg 
            className="absolute w-64 h-64"
            initial={positions.square2}
            animate={positions.square2}
            transition={{
              duration: 10,
              ease: "easeInOut"
            }}
          >
            <rect
              x="0"
              y="0"
              width="256"
              height="256"
              fill="#fde047"
              opacity="1"
              rx="16"
            />
          </motion.svg>
        </div>

      <div className="max-w-7xl mx-auto py-16 px-6 relative">
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
