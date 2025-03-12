// src/pages/projects.tsx
import React, { useState } from "react";
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
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 弹窗头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200/70 dark:border-gray-700/70 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formattedProject.title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
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
              <img 
                src={formattedProject.image} 
                alt={formattedProject.title} 
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
                  className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* 项目描述 */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">{formattedProject.description}</p>
            
            {/* 项目详情 */}
            {formattedProject.details && formattedProject.details.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">项目详情</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
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
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
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

  // 将项目数据转换为符合ProjectCard接口的格式
  const formattedProjects = filteredProjects.map(project => ({
    id: String(project.id),
    title: project.title,
    description: project.description || project.subtitle || "",
    image: project.image || undefined,
    tags: project.tags || [],
    link: project.link || undefined,
    details: project.details || []
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            我的项目
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            这里是我参与和负责的 20+ 个项目
          </p>
        </div>

        {/* 搜索框 */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="搜索项目..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formattedProjects.map((project) => (
            <div key={project.id} onClick={() => setSelectedProject(filteredProjects.find(p => String(p.id) === project.id) || null)}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
        
        {/* 无结果提示 */}
        {formattedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">没有找到匹配的项目</p>
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