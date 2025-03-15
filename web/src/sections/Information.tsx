// src/sections/Information.tsx
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import resume_touxiang from "../../public/resume_touxiang.png";

const Information: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-purple-500 to-blue-500 py-16 h-screen">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* 📌 左侧：个人信息 */}
        <motion.div
          className="text-white max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold tracking-wide">你好，我是某某某</h1>
          <p className="mt-4 text-lg opacity-80">
            这里是我的个人简介，我是一个充满创造力的开发者，热衷于构建炫酷的交互体验与高效的产品体验。
          </p>

          {/* 🔗 联系方式 */}
          <div className="mt-6">
            <p className="text-lg">📞 电话：152-2109-4990</p>
            <p className="text-lg">📧 邮箱：1850786422@qq.com</p>
          </div>
        </motion.div>

        {/* 📷 右侧：头像 */}
        <motion.div
          className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src={resume_touxiang}
            alt="个人头像"
            width={320}
            height={320}
            className="rounded-full shadow-lg"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Information;