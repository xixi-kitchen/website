// src/pages/projects.tsx
import React, { useState } from "react";
import Image from "next/image";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

interface ProjectModalProps {
  project: typeof projects[0] | null;
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
    details: project.details || []
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md transition-all duration-300" onClick={onClose}>
      <div 
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-brightblue/5 rounded-2xl shadow-2xl transform transition-all border border-brightblue/20 dark:border-brightblue/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 弹窗头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-yellow/20 dark:border-yellow/30 bg-white/90 dark:bg-brightblue/10 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formattedProject.title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-deeppink/70 hover:text-deeppink dark:text-deeppink/50 dark:hover:text-deeppink rounded-full hover:bg-deeppink/10 dark:hover:bg-deeppink/20 transition-colors"
            aria-label="关闭"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 弹窗内容 */}
        <div className="p-6">
          {/* 项目图片 */}
          {formattedProject.image && (
            <div className="mb-6 overflow-hidden rounded-lg shadow-md">
              <Image 
                src={formattedProject.image} 
                alt={formattedProject.title} 
                width={800}
                height={400}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          {/* 项目标签 */}
          {formattedProject.tags && formattedProject.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {formattedProject.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm font-medium rounded-full bg-brightblue/10 dark:bg-brightblue/20 text-brightblue dark:text-brightblue/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* 项目描述 */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-yellow/90 mb-4">{formattedProject.description}</p>
            
            {/* 项目详情 */}
            {formattedProject.details && formattedProject.details.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">项目详情</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-yellow/90">
                  {formattedProject.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* 项目链接 */}
            {formattedProject.link && (
              <div className="mt-8">
                <a 
                  href={formattedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-deeppink text-white rounded-lg hover:bg-deeppink/80 transition-colors"
                >
                  查看项目
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
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
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  // 将项目按类型分类
  const latestProjects = filteredProjects.filter(project => project.type === 'latest');
  const pastProjects = filteredProjects.filter(project => project.type === 'past');
  const personalProjects = filteredProjects.filter(project => project.type === 'personal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-brightblue/5 via-yellow/5 to-deeppink/5 dark:from-brightblue/10 dark:via-yellow/10 dark:to-deeppink/10 relative overflow-hidden">
      {/* 装饰性色块 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brightblue/20 dark:bg-brightblue/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow/20 dark:bg-yellow/30 rounded-full blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-deeppink/20 dark:bg-deeppink/30 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto py-16 px-6 relative">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brightblue via-yellow to-deeppink">
            我的项目
          </h2>
          <p className="text-xl text-gray-600 dark:text-yellow/80 max-w-2xl mx-auto">
            这里是我参与和负责的项目集合
          </p>
        </div>

        {/* 搜索框 */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-deeppink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="搜索项目..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-brightblue/20 dark:border-brightblue/30 bg-white/50 dark:bg-brightblue/5 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brightblue focus:border-transparent transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 最新项目 */}
        {latestProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-brightblue rounded-full mr-3"></span>
              最新项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestProjects.map((project) => (
                <div key={project.id} onClick={() => setSelectedProject(project)}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 过往项目 */}
        {pastProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-yellow rounded-full mr-3"></span>
              过往项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastProjects.map((project) => (
                <div key={project.id} onClick={() => setSelectedProject(project)}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 个人项目 */}
        {personalProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-deeppink rounded-full mr-3"></span>
              个人项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personalProjects.map((project) => (
                <div key={project.id} onClick={() => setSelectedProject(project)}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-deeppink/70 dark:text-yellow/70 text-lg">没有找到匹配的项目</p>
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