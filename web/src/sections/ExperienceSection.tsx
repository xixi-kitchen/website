import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Experience {
  period: string;
  company: string;
  title: string;
  achievements: string[];
  id: string; // 添加唯一标识符用于跳转
}

const experiences: Experience[] = [
  {
    period: "2023.5-至今",
    company: "杭州行至云起科技有限公司",
    title: "高级软件产品经理、软件产品总负责人",
    achievements: [
      "APP3.0升级项目：成功领导APP3.0的全面升级",
      "界面设计更新：主导APP 80%页面的设计更新",
      "软件OEM定制：管理多个软件定制项目，业绩增长200%",
      "产品 AI 知识库建立：创建并接入 AI 大模型"
    ],
    id: "lifesmart"
  },
  {
    period: "2022.5-2023.4",
    company: "富通天下（杭州）云技术研发中心",
    title: "交互设计师、用户体验负责人",
    achievements: [
      "外贸管理板块整体交互优化，提供400+交互修改需求",
      "全球买家板块改版，用户好评率达到90%",
      "业务系统流程重构，优化用户体验"
    ],
    id: "futong"
  },
  {
    period: "2021.4-2022.4",
    company: "泰瑞机器股份有限公司",
    title: "研发工程师（工业设计模块）",
    achievements: [
      "完成公司一半机型的新模型渲染及生产标准更新",
      "参与制定公司新视觉系统设计",
      "主导公司官网更新"
    ],
    id: "tairui"
  }
];

const ExperienceSection: React.FC = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题部分 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            职业经历
          </h2>
          <p className="text-xl text-purple-200">
            从工业设计到产品管理，不断探索与创新
          </p>
        </motion.div>

        {/* 经历时间线 */}
        <div className="relative">
          {/* 时间线装饰 */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-400 via-indigo-400 to-blue-400"
          ></motion.div>

          {/* 经历卡片 */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* 时间线点 */}
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-purple-400"
                ></motion.div>

                {/* 经历卡片 */}
                <div className={`w-5/12 ${
                  index % 2 === 0 ? 'pr-12' : 'pl-12'
                }`}>
                  <Link href={`/experience#${exp.id}`}>
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20"
                    >
                      <div className="text-purple-300 text-sm mb-2">{exp.period}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                      <div className="text-purple-200 mb-4">{exp.title}</div>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-purple-100 flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 底部装饰 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <span className="text-purple-200">
              更多经历正在体验中······
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection; 