// src/sections/ProjectsSection.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { projects as projectData } from "../data/projects"; // Assuming projectData is imported from the same location
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<typeof projectData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  // Load project data
  useEffect(() => {
    console.log("尝试加载项目数据...");
    if (projectData && projectData.length > 0) {
      setProjects([...projectData]);
      console.log("数据加载完成:", projectData);
    } else {
      console.warn("项目数据为空！");
    }
  }, []);

  // 🖱️ 监听鼠标位置，产生跟随光效
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 🎭 滚动触发动画
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Loading state
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          正在加载项目数据...
        </motion.div>
      </div>
    );
  }

  console.log("最终 projects 数据：", projects);
  console.log("尝试渲染：", projects ? projects.slice(0, 6) : "数据未加载");

  return (
    <section
      id="projects"
      className="relative py-16 bg-gray-100 dark:bg-gray-900 overflow-hidden"
    >
      {/* 🖱️ 光效背景层 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      >
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-50"></div>
      </motion.div>

      {/* 📸 视差背景滚动效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 dark:opacity-30"
        style={{ transform: `translateY(${scrollOffset * 0.2}px)` }} // 视差滚动
      ></motion.div>

      {/* 内容区域 */}
      <motion.div
        className="relative max-w-6xl mx-auto px-6"
        ref={ref}
        initial={{ opacity: 0.5, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <h2 className="text-5xl font-bold text-center text-gray-900 dark:text-white tracking-wider">
          🚀 个人项目
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-3">
          精选 6 个个人项目，点击查看完整列表 👇
        </p>

        {/* 📌 响应式网格布局 */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects && projects.length > 0 ? (
            projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
                             hover:scale-105 transition-transform flex flex-col cursor-pointer"
                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.07 }}
                initial={{ opacity: 0.5, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                transition={{ delay: index * 0.2 }}
              >
              

                <h3 className="text-2xl font-bold text-primary">
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {project.subtitle}
                </p>
                <p className="mt-2 text-sm text-gray-400">{project.duration}</p>
                <p className="mt-1 text-sm text-gray-500">
                  角色：{project.role}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {project.description.substring(0, 80)}...
                </p>

                <Link
                  href={`/projects#${project.id}`}
                  className="mt-4 text-primary font-bold hover:underline self-start inline-block"
                >
                  <motion.span whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                    查看详情 →
                  </motion.span>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              暂无项目数据
            </p>
          )}
        </div>

        {/* 📌 炫酷按钮 */}
        <motion.div
          className="text-center mt-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/projects"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-lg font-semibold 
                          hover:shadow-lg transition"
          >
            🔥 查看所有项目 🔥
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
