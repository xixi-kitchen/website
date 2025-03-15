import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

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
      "强化学习（Q-learning、策略梯度）"
    ]
  },
  {
    category: "框架与工具",
    items: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face Transformers",
      "OpenCV",
      "scikit-learn"
    ]
  },
  {
    category: "AI 应用领域",
    items: [
      "计算机视觉",
      "自然语言处理",
      "语音识别",
      "推荐系统",
      "智能决策"
    ]
  }
];

const aiProjects: AIProject[] = [
  {
    title: "智能图像识别系统",
    description: "基于深度学习的商品识别系统，支持多类别商品检测和分类，准确率达到98%。",
    technologies: ["PyTorch", "YOLOv5", "OpenCV"],
    link: "https://github.com/yourusername/project1"
  },
  {
    title: "智能客服机器人",
    description: "基于BERT的智能客服系统，实现意图识别和实体抽取，提升客服效率60%。",
    technologies: ["Transformers", "BERT", "FastAPI"],
    link: "https://github.com/yourusername/project2"
  },
  {
    title: "个性化推荐系统",
    description: "基于协同过滤和深度学习的推荐系统，为用户提供个性化内容推荐。",
    technologies: ["TensorFlow", "scikit-learn", "Redis"],
    link: "https://github.com/yourusername/project3"
  }
];

const learningDirections = [
  {
    title: "大语言模型研究",
    description: "研究 GPT、BERT 等大语言模型的原理和应用，探索模型优化和部署方案。",
    status: "进行中"
  },
  {
    title: "多模态学习",
    description: "探索文本、图像、语音等多模态数据的融合学习方法和应用。",
    status: "计划中"
  },
  {
    title: "AI 系统架构",
    description: "研究 AI 系统的架构设计、性能优化和部署策略。",
    status: "进行中"
  }
];

const AIPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>AI 专刊 | HUGH·Aix</title>
        <meta name="description" content="AI 技术研究、项目经验和学习方向" />
      </Head>
      
      <div className="w-full min-h-screen bg-gradient-to-br from-brightblue/5 via-yellow/5 to-deeppink/5 dark:from-brightblue/10 dark:via-yellow/10 dark:to-deeppink/10 relative overflow-hidden">
        {/* 装饰性色块 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brightblue/20 dark:bg-brightblue/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow/20 dark:bg-yellow/30 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-deeppink/20 dark:bg-deeppink/30 rounded-full blur-3xl"></div>
        
        <main className="max-w-4xl mx-auto px-4 py-8 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brightblue via-yellow to-deeppink"
          >
            AI 专刊
          </motion.h1>

          {/* AI 技能 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brightblue rounded-full"></span>
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
                  className="bg-white/50 dark:bg-brightblue/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-brightblue/20 dark:border-brightblue/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* 卡片装饰色块 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brightblue/10 dark:bg-brightblue/20 rounded-full blur-2xl group-hover:bg-brightblue/20 dark:group-hover:bg-brightblue/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow/10 dark:bg-yellow/20 rounded-full blur-2xl group-hover:bg-yellow/20 dark:group-hover:bg-yellow/30 transition-colors duration-300"></div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 relative">
                    {skill.category}
                  </h3>
                  <ul className="space-y-2 relative">
                    {skill.items.map((item, i) => (
                      <li key={i} className="text-gray-700 dark:text-yellow/90 hover:text-brightblue dark:hover:text-brightblue/80 transition-colors duration-200">
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-yellow rounded-full"></span>
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
                  className="bg-white/50 dark:bg-brightblue/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow/20 dark:border-yellow/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* 卡片装饰色块 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow/10 dark:bg-yellow/20 rounded-full blur-2xl group-hover:bg-yellow/20 dark:group-hover:bg-yellow/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-deeppink/10 dark:bg-deeppink/20 rounded-full blur-2xl group-hover:bg-deeppink/20 dark:group-hover:bg-deeppink/30 transition-colors duration-300"></div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 relative">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-yellow/90 mb-4 relative">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 relative">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-brightblue/10 dark:bg-brightblue/20 text-brightblue dark:text-brightblue/80 rounded-full text-sm hover:bg-brightblue/20 dark:hover:bg-brightblue/30 transition-colors duration-200"
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
                      className="text-deeppink dark:text-deeppink/80 hover:text-deeppink/80 dark:hover:text-deeppink/60 transition-colors duration-200 relative"
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-deeppink rounded-full"></span>
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
                  className="bg-white/50 dark:bg-brightblue/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-deeppink/20 dark:border-deeppink/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* 卡片装饰色块 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-deeppink/10 dark:bg-deeppink/20 rounded-full blur-2xl group-hover:bg-deeppink/20 dark:group-hover:bg-deeppink/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-brightblue/10 dark:bg-brightblue/20 rounded-full blur-2xl group-hover:bg-brightblue/20 dark:group-hover:bg-brightblue/30 transition-colors duration-300"></div>
                  
                  <div className="flex justify-between items-start relative">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {direction.title}
                    </h3>
                    <span className="px-3 py-1 bg-yellow/10 dark:bg-yellow/20 text-yellow dark:text-yellow/80 rounded-full text-sm">
                      {direction.status}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-yellow/90 mt-2 relative">
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