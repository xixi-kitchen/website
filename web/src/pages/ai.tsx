import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
interface AISkill {
  category: string;
  items: string[];
}

interface AIProject {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

const aiSkills: AISkill[] = [
  {
    category: "机器学习",
    items: [
      "深度学习（CNN、RNN、Transformer）",
      "计算机视觉（目标检测、图像分割）",
      "自然语言处理（文本分类、命名实体识别）",
      "强化学习（Q-learning、策略梯度）",
    ],
  },
  {
    category: "框架与工具",
    items: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face Transformers",
      "OpenCV",
      "scikit-learn",
    ],
  },
  {
    category: "AI 应用领域",
    items: ["计算机视觉", "自然语言处理", "语音识别", "推荐系统", "智能决策"],
  },
];

const aiProjects: AIProject[] = [
  {
    title: "智能图像识别系统",
    description:
      "基于深度学习的商品识别系统，支持多类别商品检测和分类，准确率达到98%。",
    technologies: ["PyTorch", "YOLOv5", "OpenCV"],
    link: "https://github.com/yourusername/project1",
  },
  {
    title: "智能客服机器人",
    description:
      "基于BERT的智能客服系统，实现意图识别和实体抽取，提升客服效率60%。",
    technologies: ["Transformers", "BERT", "FastAPI"],
    link: "https://github.com/yourusername/project2",
  },
  {
    title: "个性化推荐系统",
    description: "基于协同过滤和深度学习的推荐系统，为用户提供个性化内容推荐。",
    technologies: ["TensorFlow", "scikit-learn", "Redis"],
    link: "https://github.com/yourusername/project3",
  },
];

const learningDirections = [
  {
    title: "大语言模型研究",
    description:
      "研究 GPT、BERT 等大语言模型的原理和应用，探索模型优化和部署方案。",
    status: "进行中",
  },
  {
    title: "多模态学习",
    description: "探索文本、图像、语音等多模态数据的融合学习方法和应用。",
    status: "计划中",
  },
  {
    title: "AI 系统架构",
    description: "研究 AI 系统的架构设计、性能优化和部署策略。",
    status: "进行中",
  },
];

const AIPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>AI 专刊 | HUGH·Aix</title>
        <meta name="description" content="AI 技术研究、项目经验和学习方向" />
      </Head>

      <div className="w-full min-h-screen bg-gradient-to-br from-blue-base/5 via-yellow-base/5 to-pink-base/5 dark:from-blue-base/10 dark:via-yellow-base/10 dark:to-pink-base/10 relative overflow-hidden">
        {/* 装饰性色块 */}
        {/* 装饰性图形 */}
        <div className="absolute inset-0 dark:hidden blur-2xl">
          {/* 圆环 */}
          <svg className="absolute top-[15%] left-[10%] w-96 h-96 ">
            <circle
              cx="192"
              cy="192"
              r="100"
              fill="none"
              stroke="#ec4899"
              strokeWidth="48"
              opacity="1"
            />
          </svg>
          <svg className="absolute bottom-[20%] right-[15%] w-96 h-96">
            <circle
              cx="192"
              cy="192"
              r="100"
              fill="none"
              stroke="#ec4899"
              strokeWidth="48"
              opacity="1"
            />
          </svg>

          {/* 三角形 */}
          <svg className="absolute top-[25%] right-[20%] w-64 h-64">
            <path
              d="M128,0 L256,256 L0,256 Z"
              fill="#1d4ed8"
              opacity="1"
            />
          </svg>
          <svg className="absolute bottom-[30%] left-[25%] w-64 h-64">
            <path
              d="M128,256 L256,0 L0,0 Z"
              fill="#1d4ed8"
              opacity="1"
            />
          </svg>

          {/* 正方形 */}
          <svg className="absolute top-[40%] left-[35%] w-64 h-64">
            <rect
              x="0"
              y="0"
              width="256"
              height="256"
              fill="#fde047"
              opacity="1"
              rx="16"
            />
          </svg>
          <svg className="absolute top-[60%] right-[30%] w-64 h-64">
            <rect
              x="0"
              y="0"
              width="256"
              height="256"
              fill="#fde047"
              opacity="1"
              rx="16"
            />
          </svg>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-8 relative">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-start gap-6 sm:gap-10"
          >
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-base via-yellow-base to-pink-base">
                AI 专刊
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
          {/* AI 技能 */}
          <section className="mb-12 mt-12">
            <h2 className="text-2xl font-semibold text-zinc-dark dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-base rounded-full"></span>
              AI 技能树
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/50 dark:bg-blue-base/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-base/20 dark:border-blue-base/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* 卡片装饰色块 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-base/10 dark:bg-blue-base/20 rounded-full blur-2xl group-hover:bg-blue-base/20 dark:group-hover:bg-blue-base/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-yello-basevia-yellow-base/10 dark:bg-yello-basevia-yellow-base/20 rounded-full blur-2xl group-hover:bg-yello-basevia-yellow-base/20 dark:group-hover:bg-yello-basevia-yellow-base/30 transition-colors duration-300"></div>

                  <h3 className="text-xl font-semibold text-zinc-dark dark:text-white mb-4 relative">
                    {skill.category}
                  </h3>
                  <ul className="space-y-2 relative">
                    {skill.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-zinc-base dark:text-yello-basevia-yellow-base/90 hover:text-blue-base dark:hover:text-blue-base/80 transition-colors duration-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI 项目 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-dark dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-yello-basevia-yellow-base rounded-full"></span>
              AI 项目经验
            </h2>
            <div className="space-y-6">
              {aiProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/50 dark:bg-blue-base/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yello-basevia-yellow-base/20 dark:border-yello-basevia-yellow-base/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* 卡片装饰色块 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yello-basevia-yellow-base/10 dark:bg-yello-basevia-yellow-base/20 rounded-full blur-2xl group-hover:bg-yello-basevia-yellow-base/20 dark:group-hover:bg-yello-basevia-yellow-base/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-base/10 dark:bg-pink-base/20 rounded-full blur-2xl group-hover:bg-pink-base/20 dark:group-hover:bg-pink-base/30 transition-colors duration-300"></div>

                  <h3 className="text-xl font-semibold text-zinc-dark dark:text-white mb-2 relative">
                    {project.title}
                  </h3>
                  <p className="text-zinc-base dark:text-yello-basevia-yellow-base/90 mb-4 relative">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 relative">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-base/10 dark:bg-blue-base/20 text-blue-base dark:text-blue-base/80 rounded-full text-sm hover:bg-blue-base/20 dark:hover:bg-blue-base/30 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-base dark:text-pink-base/80 hover:text-pink-base/80 dark:hover:text-pink-base/60 transition-colors duration-200 relative"
                    >
                      查看项目 →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* 学习方向 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-dark dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-base rounded-full"></span>
              学习方向
            </h2>
            <div className="space-y-6">
              {learningDirections.map((direction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/50 dark:bg-blue-base/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-base/20 dark:border-pink-base/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* 卡片装饰色块 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-base/10 dark:bg-pink-base/20 rounded-full blur-2xl group-hover:bg-pink-base/20 dark:group-hover:bg-pink-base/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-base/10 dark:bg-blue-base/20 rounded-full blur-2xl group-hover:bg-blue-base/20 dark:group-hover:bg-blue-base/30 transition-colors duration-300"></div>

                  <div className="flex justify-between items-start relative">
                    <h3 className="text-xl font-semibold text-zinc-dark dark:text-white">
                      {direction.title}
                    </h3>
                    <span className="px-3 py-1 bg-yellow-base/10 dark:bg-yellow-base hover:bg-yellow-base/20 text-yellow-base dark:text-yellow-light rounded-full text-sm">
                      {direction.status}
                    </span>
                  </div>
                  <p className="text-zinc-base dark:text-yellow-base mt-2 relative">
                    {direction.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AIPage;
