import React, { useEffect, useState } from "react";
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
    category: "数据分析",
    items: ["数据清洗", "数据处理", "数据可视化", "数据挖掘", "数据分析"],
  },
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
    <>
      <Head>
        <title>AI 专刊 | HUGH·Aix</title>
        <meta name="description" content="AI 技术研究、项目经验和学习方向" />
      </Head>

      <div className="w-full min-h-screen bg-gradient-to-br from-blue-base/5 via-yellow-base/5 to-pink-base/5 dark:from-blue-base/10 dark:via-yellow-base/10 dark:to-pink-base/10 relative overflow-hidden">
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
            className="w-full flex flex-col items-start gap-6 sm:gap-10 mb-12"
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

          {/* 主要内容区域 - 使用网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* 左侧列 */}
            <div className="space-y-6">
              {/* 数据分析卡片 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/50 dark:bg-blue-base/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-base/20 dark:border-blue-base/30 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-zinc-dark dark:text-white mb-4">数据分析</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-base/5 dark:bg-blue-base/10 rounded-lg">
                    <h4 className="font-medium text-zinc-dark dark:text-white mb-2">知识内容</h4>
                    <ul className="list-disc list-inside text-zinc-base dark:text-zinc-300 space-y-1">
                      {aiSkills[0].items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-base/5 dark:bg-blue-base/10 rounded-lg">
                    <h4 className="font-medium text-zinc-dark dark:text-white mb-2">使用工具</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"].map((tool, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-base/10 dark:bg-blue-base/20 text-blue-base rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 中间列 */}
            <div className="space-y-6">
              {/* 机器学习卡片 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/50 dark:bg-yellow-base/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-base/20 dark:border-yellow-base/30 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-zinc-dark dark:text-white mb-4">机器学习</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-base/5 dark:bg-yellow-base/10 rounded-lg">
                    <h4 className="font-medium text-zinc-dark dark:text-white mb-2">知识内容</h4>
                    <ul className="list-disc list-inside text-zinc-base dark:text-zinc-300 space-y-1">
                      {aiSkills[1].items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-base/5 dark:bg-yellow-base/10 rounded-lg">
                    <h4 className="font-medium text-zinc-dark dark:text-white mb-2">使用工具</h4>
                    <div className="flex flex-wrap gap-2">
                      {["scikit-learn", "TensorFlow", "PyTorch", "Keras"].map((tool, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-base/10 dark:bg-yellow-base/20 text-yellow-base rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 右侧列 */}
            <div className="space-y-6">
              {/* 深度学习卡片 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/50 dark:bg-pink-base/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-base/20 dark:border-pink-base/30 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-zinc-dark dark:text-white mb-4">深度学习</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-pink-base/5 dark:bg-pink-base/10 rounded-lg">
                    <h4 className="font-medium text-zinc-dark dark:text-white mb-2">知识内容</h4>
                    <ul className="list-disc list-inside text-zinc-base dark:text-zinc-300 space-y-1">
                      {["神经网络架构", "卷积神经网络", "循环神经网络", "Transformer", "注意力机制"].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-pink-base/5 dark:bg-pink-base/10 rounded-lg">
                    <h4 className="font-medium text-zinc-dark dark:text-white mb-2">使用工具</h4>
                    <div className="flex flex-wrap gap-2">
                      {["PyTorch", "Hugging Face", "TensorFlow", "JAX"].map((tool, index) => (
                        <span key={index} className="px-2 py-1 bg-pink-base/10 dark:bg-pink-base/20 text-pink-base rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 下半部分内容 - 使用网格布局 */}
          <div className="mt-20 pt-16 pb-12 bg-gradient-to-br from-blue-base/5 via-transparent to-pink-base/5 dark:from-blue-base/10 dark:via-transparent dark:to-pink-base/10 border-t border-gray-100/50 dark:border-gray-800/50 relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-base/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-base/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 左侧内容区域（占据2/3宽度） */}
                <div className="lg:col-span-2 space-y-8">
                  {/* 研究方向部分 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-blue-base/20 dark:border-blue-base/30 transition-all duration-300"
                  >
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-base to-pink-base bg-clip-text text-transparent mb-6">
                      AI 应用领域研究方向
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-zinc-dark dark:text-white">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-base rounded-full animate-pulse"></div>
                        <span className="font-medium">当前进度：</span>
                        <span className="text-blue-base font-semibold">MCP 服务搭建与使用</span>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium text-zinc-dark dark:text-white flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          已完成：
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["AI 知识库搭建及使用", "AI 开发环境搭建及使用", "大语言模型应用开发", "多模态模型集成应用"].map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 p-3 bg-blue-base/5 dark:bg-blue-base/10 rounded-lg group-hover:bg-blue-base/10 dark:group-hover:bg-blue-base/20 transition-colors duration-300"
                            >
                              <span className="text-zinc-base dark:text-zinc-300">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* AI创意部分 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-pink-base/20 dark:border-pink-base/30 transition-all duration-300"
                  >
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-base to-yellow-base bg-clip-text text-transparent mb-6">
                      AI 创意实验室
                    </h2>
                    <div className="space-y-8">
                      {/* 旅游软件 */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-gradient-to-br from-pink-base/5 to-transparent dark:from-pink-base/10 rounded-xl border border-pink-base/10 dark:border-pink-base/20"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-pink-base/10 rounded-lg">
                            <svg className="w-6 h-6 text-pink-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-medium text-zinc-dark dark:text-white">智能旅行助手</h3>
                        </div>
                        <p className="text-zinc-base dark:text-zinc-300 mb-4 leading-relaxed">
                          输入目的地后，可以连串完成景点的搜索、挑选、组合整理，可以用用户选择一个个城市的景点，智能规划最优路线，并生成完整的旅行清单。
                        </p>
                        <div className="space-y-3">
                          <div className="font-medium text-zinc-dark dark:text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            功能特点
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                              "智能路线规划",
                              "景点推荐系统",
                              "实时天气集成",
                              "交通方案优化",
                              "住宿智能匹配",
                              "行程文档导出"
                            ].map((feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 p-3 bg-pink-base/5 dark:bg-pink-base/10 rounded-lg"
                              >
                                <svg className="w-4 h-4 text-pink-base flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-zinc-base dark:text-zinc-300">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>

                      {/* 天气软件 */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-gradient-to-br from-yellow-base/5 to-transparent dark:from-yellow-base/10 rounded-xl border border-yellow-base/10 dark:border-yellow-base/20"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-yellow-base/10 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-medium text-zinc-dark dark:text-white">个人天气助理</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "智能降雨预警提醒",
                            "个性化穿衣建议",
                            "出行计划天气分析",
                            "智能衣物搭配推荐"
                          ].map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 bg-yellow-base/5 dark:bg-yellow-base/10 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-yellow-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-zinc-base dark:text-zinc-300">{feature}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* 其他软件 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-6 bg-gradient-to-br from-blue-base/5 to-transparent dark:from-blue-base/10 rounded-xl border border-blue-base/10 dark:border-blue-base/20"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-base/10 rounded-lg">
                              <svg className="w-6 h-6 text-blue-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-medium text-zinc-dark dark:text-white">智能收纳助手</h3>
                          </div>
                          <p className="text-zinc-base dark:text-zinc-300">基于深度学习的智能物品分类与收纳规划系统，提供个性化收纳方案...</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-6 bg-gradient-to-br from-pink-base/5 to-transparent dark:from-pink-base/10 rounded-xl border border-pink-base/10 dark:border-pink-base/20"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-base/10 rounded-lg">
                              <svg className="w-6 h-6 text-pink-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-medium text-zinc-dark dark:text-white">AI 穿搭顾问</h3>
                          </div>
                          <p className="text-zinc-base dark:text-zinc-300">基于计算机视觉的智能穿搭推荐系统，考虑场合、天气、个人风格等因素...</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* 右侧原理学习部分（占据1/3宽度） */}
                <div className="lg:col-span-1 space-y-8">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-base to-pink-base bg-clip-text text-transparent mb-6">
                    原理学习
                  </h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-blue-base/20 dark:border-blue-base/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-base/10 rounded-lg">
                        <svg className="w-6 h-6 text-blue-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-zinc-dark dark:text-white">深度学习基础</h3>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-blue-base/5 to-pink-base/5 dark:from-blue-base/10 dark:to-pink-base/10 rounded-xl flex items-center justify-center group-hover:from-blue-base/10 group-hover:to-pink-base/10 dark:group-hover:from-blue-base/20 dark:group-hover:to-pink-base/20 transition-all duration-300">
                      <span className="text-zinc-base dark:text-zinc-300">视频教程</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-pink-base/20 dark:border-pink-base/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-pink-base/10 rounded-lg">
                        <svg className="w-6 h-6 text-pink-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-zinc-dark dark:text-white">机器学习进阶</h3>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-pink-base/5 to-yellow-base/5 dark:from-pink-base/10 dark:to-yellow-base/10 rounded-xl flex items-center justify-center group-hover:from-pink-base/10 group-hover:to-yellow-base/10 dark:group-hover:from-pink-base/20 dark:group-hover:to-yellow-base/20 transition-all duration-300">
                      <span className="text-zinc-base dark:text-zinc-300">视频教程</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AIPage;
