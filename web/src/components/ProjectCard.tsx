// src/components/ProjectCard.tsx
import React from "react";


interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  details: string[];
  type: "latest" | "past" | "personal";
  role?: string;
  period?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  type,
  role,
  period,
}) => {
  // 根据项目类型设置不同的样式
  const getTypeStyle = () => {
    switch (type) {
      case "latest":
        return "border-yellow-base/20 dark:border-yellow-base/30";
      case "past":
        return "border-yellow-base/20 dark:border-yellow-base/30";
      case "personal":
        return "border-yellow-base/20 dark:border-yellow-base/30";
      default:
        return "border-zinc-base/20 dark:border-zinc-dark/30";
    }
  };

  return (
    <div
      className={`group h-full bg-white/50 dark:bg-zinc-dark/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative border ${getTypeStyle()}`}
    >
      {/* 卡片装饰色块 */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/10 dark:bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/20 rounded-full blur-2xl group-hover:bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/20 dark:group-hover:bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/30 transition-colors duration-300`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-32 h-32 bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/10 dark:bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/20 rounded-full blur-2xl group-hover:bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/20 dark:group-hover:bg-${
          type === "latest"
            ? "yellow-base"
            : type === "past"
            ? "yellow-base"
            : "yellow-base"
        }/30 transition-colors duration-300`}
      ></div>

      

      {/* 卡片内容 */}
      <div className="p-5 relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-yellow-dark dark:text-yellow-base line-clamp-1">
            {title}
          </h3>
          {role && (
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full text-zinc-base 
                bg-${
                type === "latest"
                  ? "yellow-dark"
                  : type === "past"
                  ? "yellow-dark"
                  : "yellow-dark"
              }/10 
              text-${
                type === "latest"
                  ? "yellow-dark"
                  : type === "past"
                  ? "yellow-dark"
                  : "yellow-dark"
              }/80`}
            >
              {role}
            </span>
          )}
        </div>
        {period && (
          <p className="text-sm text-zinc-base dark:text-zinc-base mb-2">
            {period}
          </p>
        )}
        <p className="text-zinc-base dark:text-zinc-light line-clamp-3 mb-4">
          {description}
        </p>

        {/* 查看详情按钮 */}
        <div className="flex justify-end">
          <span
            className={`inline-flex items-center text-sm font-medium text-${
              type === "latest"
                ? "yellow-dark"
                : type === "past"
                ? "yellow-dark"
                : "yellow-dark"
            } dark:text-${
              type === "latest"
                ? "yellow-base"
                : type === "past"
                ? "yellow-base"
                : "yellow-base"
            }/80 group-hover:text-${
              type === "latest"
                ? "yellow-dark"
                : type === "past"
                ? "yellow-dark"
                : "yellow-dark"
            }/80 dark:group-hover:text-${
              type === "latest"
                ? "yellow-base"
                : type === "past"
                ? "yellow-base"
                : "yellow-base"
            }/60 transition-colors`}
          >
            查看详情
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

export default ProjectCard;
