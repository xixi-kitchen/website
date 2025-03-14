// src/components/ProjectCard.tsx
import React from "react";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  details: string[];
  type: 'latest' | 'past' | 'personal';
  role?: string;
  period?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  type,
  role,
  period,
}) => {
  // 根据项目类型设置不同的样式
  const getTypeStyle = () => {
    switch (type) {
      case 'latest':
        return 'border-brightblue/20 dark:border-brightblue/30';
      case 'past':
        return 'border-yellow/20 dark:border-yellow/30';
      case 'personal':
        return 'border-deeppink/20 dark:border-deeppink/30';
      default:
        return 'border-gray-200/20 dark:border-gray-700/30';
    }
  };

  return (
    <div className={`group h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative border ${getTypeStyle()}`}>
      {/* 卡片装饰色块 */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/10 dark:bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/20 rounded-full blur-2xl group-hover:bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/20 dark:group-hover:bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/30 transition-colors duration-300`}></div>
      <div className={`absolute bottom-0 left-0 w-32 h-32 bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/10 dark:bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/20 rounded-full blur-2xl group-hover:bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/20 dark:group-hover:bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/30 transition-colors duration-300`}></div>

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
      <div className="p-5 relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h3>
          {role && (
            <span className={`text-sm font-medium px-2 py-1 rounded-full bg-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/10 text-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'} dark:text-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/80`}>
              {role}
            </span>
          )}
        </div>
        {period && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {period}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {description}
        </p>
        
        {/* 查看详情按钮 */}
        <div className="flex justify-end">
          <span className={`inline-flex items-center text-sm font-medium text-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'} dark:text-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/80 group-hover:text-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/80 dark:group-hover:text-${type === 'latest' ? 'brightblue' : type === 'past' ? 'yellow' : 'deeppink'}/60 transition-colors`}>
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