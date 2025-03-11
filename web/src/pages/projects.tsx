// src/pages/projects.tsx
import React, { useState } from "react";

import { projects } from "../data/projects";

import ProjectCard from "../components/ProjectCard";

const Projects: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        我的项目
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
        这里是我参与和负责的 20+ 个项目
      </p>

      {/* 🔍 搜索框 */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="搜索项目..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📌 响应式网格布局 */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;