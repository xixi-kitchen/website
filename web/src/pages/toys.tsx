import React, { useState } from "react";
import { toys, Toy } from "../data/toys";
import { motion } from "framer-motion"; 
import Image from "next/image";
interface ToyCardProps {
  toy: Toy;
  onClick: () => void;
}

const ToyCard: React.FC<ToyCardProps> = ({ toy, onClick }) => {
  const statusColors = {
    completed: "bg-green-500",
    "in-progress": "bg-yellow-base",
    planned: "bg-blue-500",
  };

  const statusText = {
    completed: "已完成",
    "in-progress": "进行中",
    planned: "计划中",
  };

  return (
    <div
      className="group relative bg-white/50 dark:bg-blue-base/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-base/20 dark:border-blue-base/30 hover:border-blue-base/50 dark:hover:border-blue-base/60 transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* 装饰性色块 */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-pink-base/10 dark:bg-pink-base/20 rounded-full blur-2xl group-hover:bg-pink-base/20 dark:group-hover:bg-pink-base/30 transition-all"></div>
      <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-yellow-base/10 dark:bg-yellow-base/20 rounded-full blur-2xl group-hover:bg-yellow-base/20 dark:group-hover:bg-yellow-base/30 transition-all"></div>

      <div className="relative">
        {/* 标题和状态 */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-zinc-dark dark:text-white group-hover:text-blue-base dark:group-hover:text-blue-base/90 transition-colors">
            {toy.title}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
              statusColors[toy.status]
            }`}
          >
            {statusText[toy.status]}
          </span>
        </div>

        {/* 描述 */}
        <p className="text-zinc-base dark:text-yellow-base/90 mb-4">
          {toy.description}
        </p>

        {/* 技术栈 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {toy.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-full bg-blue-base/10 dark:bg-blue-base/20 text-blue-base dark:text-blue-base/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {toy.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-full bg-pink-base/10 dark:bg-pink-base/20 text-pink-base dark:text-pink-base/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ToyModalProps {
  toy: Toy;
  onClose: () => void;
}

const ToyModal: React.FC<ToyModalProps> = ({ toy, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-blue-base/5 rounded-2xl shadow-2xl border border-blue-base/20 dark:border-blue-base/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 弹窗头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-yellow-base/20 dark:border-yellow-base/30 bg-white/90 dark:bg-blue-base/10 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-zinc-dark dark:text-white">
            {toy.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-pink-base/70 hover:text-pink-base dark:text-pink-base/50 dark:hover:text-pink-base rounded-full hover:bg-pink-base/10 dark:hover:bg-pink-base/20 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
          <div className="prose dark:prose-invert max-w-none">
            {/* 描述 */}
            <p className="text-zinc-dark dark:text-yellow-base/90 mb-6">
              {toy.description}
            </p>

            {/* 灵感来源 */}
            {toy.inspiration && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-zinc-dark dark:text-white mb-2">
                  灵感来源
                </h4>
                <p className="text-zinc-dark dark:text-yellow-base/90">
                  {toy.inspiration}
                </p>
              </div>
            )}

            {/* 功能特点 */}
            {toy.features && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-zinc-dark dark:text-white mb-2">
                  功能特点
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-zinc-dark dark:text-yellow-base/90">
                  {toy.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 技术栈 */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-zinc-dark dark:text-white mb-2">
                技术栈
              </h4>
              <div className="flex flex-wrap gap-2">
                {toy.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-blue-base/10 dark:bg-blue-base/20 text-blue-base dark:text-blue-base/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 链接 */}
            <div className="flex gap-4">
              {toy.link && (
                <a
                  href={toy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-pink-base text-white rounded-lg hover:bg-pink-base/80 transition-colors"
                >
                  查看演示
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {toy.github && (
                <a
                  href={toy.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-base text-white rounded-lg hover:bg-blue-base/80 transition-colors"
                >
                  GitHub
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toys: React.FC = () => {
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);
  const [filter, setFilter] = useState<
    "all" | "completed" | "in-progress" | "planned"
  >("all");

  const filteredToys = toys.filter(
    (toy) => filter === "all" || toy.status === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-base/5 via-yellow-base/5 to-pink-base/5 dark:from-blue-base/10 dark:via-yellow-base/10 dark:to-pink-base/10 relative overflow-hidden">
      {/* 装饰性色块 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-base/20 dark:bg-blue-base/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-base/20 dark:bg-yellow-base/30 rounded-full blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-base/20 dark:bg-pink-base/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto py-16 px-6 relative">
        {/* 提醒横幅 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-pink-base/10 dark:bg-pink-base/20 border border-pink-base/20 dark:border-pink-base/30 rounded-lg p-4 mb-8"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-pink-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-pink-base dark:text-pink-base/90">
              本页面正在设计构建中，内容与布局可能会持续更新，不代表最终效果。
            </p>
          </div>
        </motion.div>

        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-start gap-6 sm:gap-10"
        >
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-base via-yellow-base to-pink-base">
              TOYS
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

        {/* 筛选器 */}
        <div className="flex justify-center gap-4 mb-12 mt-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "all"
                ? "bg-blue-base text-white"
                : "bg-blue-base/10 dark:bg-blue-base/20 text-blue-base dark:text-blue-base/90 hover:bg-blue-base/20 dark:hover:bg-blue-base/30"
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "completed"
                ? "bg-green-500 text-white"
                : "bg-green-500/10 dark:bg-green-500/20 text-green-500 dark:text-green-500/90 hover:bg-green-500/20 dark:hover:bg-green-500/30"
            }`}
          >
            已完成
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "in-progress"
                ? "bg-yellow-base text-white"
                : "bg-yellow-base/10 dark:bg-yellow-base/20 text-yellow-base dark:text-yellow-base/90 hover:bg-yellow-base/20 dark:hover:bg-yellow-base/30"
            }`}
          >
            进行中
          </button>
          <button
            onClick={() => setFilter("planned")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "planned"
                ? "bg-blue-500 text-white"
                : "bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 dark:text-blue-500/90 hover:bg-blue-500/20 dark:hover:bg-blue-500/30"
            }`}
          >
            计划中
          </button>
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredToys.map((toy) => (
            <ToyCard
              key={toy.id}
              toy={toy}
              onClick={() => setSelectedToy(toy)}
            />
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredToys.length === 0 && (
          <div className="text-center py-12">
            <p className="text-pink-base/70 dark:text-yellow-base/70 text-lg">
              暂时没有相关项目
            </p>
          </div>
        )}
      </div>

      {/* 项目详情弹窗 */}
      {selectedToy && (
        <ToyModal toy={selectedToy} onClose={() => setSelectedToy(null)} />
      )}
    </div>
  );
};

export default Toys;
