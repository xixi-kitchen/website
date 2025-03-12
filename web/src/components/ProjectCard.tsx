// src/components/ProjectCard.tsx
import React from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  details?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
}) => {
  return (
    <div className="group h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      {/* 卡片图片 */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {/* 标签显示在图片上 */}
          {tags && tags.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 卡片内容 */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {description}
        </p>
        
        {/* 查看详情按钮 */}
        <div className="flex justify-end">
          <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
            查看详情
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;