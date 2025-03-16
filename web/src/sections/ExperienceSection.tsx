import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * 经历数据接口定义
 * @interface Experience
 * @property {string} period - 时间段
 * @property {string} company - 公司名称
 * @property {string} title - 职位名称
 * @property {string[]} achievements - 成就列表
 * @property {string} id - 用于页面锚点跳转的唯一标识符
 */
interface Experience {
  period: string;
  company: string;
  title: string;
  achievements: string[];
  id: string;
}

/**
 * 经历数据数组
 * 包含工作经历的详细信息
 */
const experiences: Experience[] = [
  {
    period: "2023.5-至今",
    company: "杭州行至云起科技有限公司",
    title: "高级软件产品经理、软件产品总负责人",
    achievements: [
      "APP3.0升级项目：成功领导APP3.0的全面升级",
      "界面设计更新：主导APP 80%页面的设计更新",
      "软件OEM定制：管理多个软件定制项目，业绩增长200%",
      "产品 AI 知识库建立：创建并接入 AI 大模型",
    ],
    id: "lifesmart",
  },
  {
    period: "2022.5-2023.4",
    company: "富通天下（杭州）云技术研发中心",
    title: "交互设计师、用户体验负责人",
    achievements: [
      "外贸管理板块整体交互优化，提供400+交互修改需求",
      "全球买家板块改版，用户好评率达到90%",
      "业务系统流程重构，优化用户体验",
    ],
    id: "futong",
  },
  {
    period: "2021.4-2022.4",
    company: "泰瑞机器股份有限公司",
    title: "研发工程师（工业设计模块）",
    achievements: [
      "完成公司一半机型的新模型渲染及生产标准更新",
      "参与制定公司新视觉系统设计",
      "主导公司官网更新",
    ],
    id: "tairui",
  },
];

/**
 * 经历展示区域组件
 * 功能：
 * 1. 响应式时间线布局
 * 2. 动画效果：
 *    - 滚动时渐入
 *    - 鼠标悬停时的交互
 *    - 时间线动画
 * 3. 支持锚点导航
 */
const ExperienceSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-br bg-blue-base dark:bg-blue-dark min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题部分：带有渐入动画效果 */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
            职业经历
          </h2>
          <p className="text-lg md:text-xl text-purple-200">
            从工业设计到产品管理，不断探索与创新
          </p>
        </motion.div> */}

        {/* 经历时间线容器 */}
        <div className="relative flex flex-col items-center">
          {/* 垂直时间线装饰：带有展开动画 */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-white to-blue-base dark:from-blue-base dark:to-blue-dark
                      transform md:-translate-x-1/2"
          ></motion.div>

          {/* 经历卡片列表 */}
          <div className="space-y-8 md:space-y-12 w-full">
            {experiences.map((exp, index) => (
              // 单个经历卡片容器：带有渐入和位移动画
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: 0,
                  ...(index % 2 === 0
                    ? { "--slide-x": "-50px" }
                    : { "--slide-x": "50px" }),
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center transform md:translate-x-[var(--slide-x)] ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                } justify-start pl-12 md:pl-0`}
                style={
                  {
                    "--slide-x": "0px",
                  } as React.CSSProperties
                }
              >
                {/* 时间线节点：带有悬停动画 */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 md:w-4 h-3 md:h-4 
                            bg-white rounded-full border-4 border-blue-base dark:border-blue-dark"
                ></motion.div>

                {/* 经历卡片内容 */}
                <div
                  className={`
                  w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}
                `}
                >
                  <Link href={`/experience#${exp.id}`}>
                    {/* 卡片主体：带有悬停动画效果 */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl 
                               border border-white/20 cursor-pointer transition-all duration-300 
                               hover:bg-white/20"
                    >
                      {/* 经历详情内容 */}
                      <div className="text-white dark:text-zinc-light text-xs md:text-sm mb-1 md:mb-2">
                        {exp.period}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                        {exp.company}
                      </h3>
                      <div className="text-white dark:text-zinc-light text-sm md:text-base mb-2 md:mb-4">
                        {exp.title}
                      </div>
                      {/* 成就列表 */}
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="text-white dark:text-zinc-light text-sm md:text-base flex items-start"
                          >
                            <span className="text-white dark:text-zinc-light mr-2">
                              •
                            </span>
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

        {/* 底部装饰：带有渐入动画 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 md:mt-16 text-center"
        >
          <div
            className="inline-block px-4 md:px-6 py-2 md:py-3  
                         rounded-full border "
          >
            <span className=" bg-clip-text text-xl md:text-2xl bg-gradient-to-r from-pink-base via-blue-base to-yellow-base text-transparent">
              更多经历正在体验中······
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
