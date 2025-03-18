import React from "react";

interface HomeProjectCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: "latest" | "past" | "personal";
  role?: string;
  period?: string;
  achievements?: {
    metrics: string[];
    highlights: string[];
  };
}

const HomeProjectCard: React.FC<HomeProjectCardProps> = ({
  title,
  description,
  type,
  role,
  period,
  achievements,
  tags,
}) => {
  // 获取项目类型图标
  const getTypeIcon = () => {
    switch (type) {
      case "latest":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "past":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "personal":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group relative bg-white/80 dark:bg-zinc-dark/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-yellow-base/20 dark:border-yellow-base/30">
      {/* 卡片装饰色块 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-base/10 dark:bg-yellow-base/20 rounded-full blur-2xl group-hover:bg-yellow-base/20 dark:group-hover:bg-yellow-base/30 transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-base/10 dark:bg-yellow-base/20 rounded-full blur-2xl group-hover:bg-yellow-base/20 dark:group-hover:bg-yellow-base/30 transition-colors duration-300"></div>

      {/* 卡片内容 */}
      <div className="p-6 relative">
        {/* 项目类型和标题 */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-yellow-base">{getTypeIcon()}</div>
          <h3 className="text-xl font-bold text-yellow-dark dark:text-yellow-base line-clamp-1">
            {title}
          </h3>
        </div>

        {/* 角色和标签 */}
        <div className="flex items-center gap-2 mb-3">
          {role && (
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-yellow-base/20 text-yellow-dark dark:text-yellow-base/80">
              {role}
            </span>
          )}
          {tags && tags.length > 0 && (
            <div className="flex gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-base text-white "
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-base text-white ">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 项目周期 */}
        {period && (
          <div className="flex items-center gap-1 text-sm text-zinc-base dark:text-zinc-light mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {period}
          </div>
        )}

        {/* 项目描述 */}
        <p className="text-zinc-base dark:text-zinc-light line-clamp-2 mb-4">
          {description}
        </p>

        {/* 成就亮点预览 */}
        {achievements?.highlights && achievements.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <svg className="w-4 h-4 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-yellow-dark dark:text-yellow-base">项目亮点</span>
            </div>
            <p className="text-sm text-zinc-base dark:text-zinc-light line-clamp-1">
              {achievements.highlights[0]}
            </p>
          </div>
        )}

        {/* 查看详情按钮 */}
        <div className="flex justify-end">
          <span className="inline-flex items-center text-sm font-medium text-yellow-dark dark:text-yellow-base/80 group-hover:text-yellow-dark/80 dark:group-hover:text-yellow-base/60 transition-colors">
            查看详情
            <svg
              className="ml-1 w-4 h-4"
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
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeProjectCard; 