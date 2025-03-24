import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 导航栏组件
 * 功能：
 * 1. 响应式设计：在移动端和桌面端有不同的显示方式
 * 2. 支持暗色模式
 * 3. 包含 Logo 和导航链接
 * 4. 移动端支持汉堡菜单展开/收起
 */
const Navbar: React.FC = () => {
  // 控制移动端菜单的展开状态
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 切换移动端菜单的展开/收起状态
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 点击链接时关闭移动端菜单
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`bg-gradient-to-r from-blue-base via-yellow-base to-pink-base ${isOpen ? 'shadow-lg' : 'shadow'} dark:bg-gradient-to-r dark:from-blue-dark dark:via-yellow-dark dark:to-pink-dark relative z-50 animate-pulse`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo 和导航链接容器 */}
            <div className="flex justify-between w-full">
              {/* Logo 部分 */}
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex-shrink-0 flex items-center text-xl font-bold text-black dark:text-white"
              >
                <Image
                  className="dark:invert"
                  src="/Generated 3D Image.svg"
                  alt="首页 logo"
                  width={40}
                  height={40}
                />
                HUGH·Aix
              </Link>

              {/* 桌面端导航链接 */}
              <div className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
                {/* 各个导航链接项 */}
                <Link
                  href="/ai"
                  className="px-3 py-2 rounded-md text-sm font-black hover:scale-120 hover:font-extrabold gap-2.5 flex items-center"
                >
                  <span className="bg-[linear-gradient(30deg,#a78bfa,#ec4899,#ef4444)] bg-[length:200%_200%] bg-clip-text text-transparent gradient-animate">
                    AI
                  </span>
                  🚧
                </Link>
                <Link
                  href="/experience"
                  className="text-zinc-dark dark:text-white px-3 py-2 rounded-md text-sm font-black hover:scale-120 hover:font-extrabold"
                >
                  经历
                </Link>
                <Link
                  href="/projects"
                  className="text-zinc-dark dark:text-white px-3 py-2 rounded-md text-sm font-black hover:scale-120 hover:font-extrabold"
                >
                  项目
                </Link>
                <Link
                  href="/toys"
                  className="text-zinc-dark dark:text-white px-3 py-2 rounded-md text-sm font-black hover:scale-120 hover:font-extrabold"
                >
                  创意 🚧
                </Link>
                <Link
                  href="/contact"
                  className="text-zinc-dark dark:text-white px-3 py-2 rounded-md text-sm font-black hover:scale-120 hover:font-extrabold"
                >
                  联系
                </Link>
                <Link
                  href="/about"
                  className="text-zinc-dark dark:text-white px-3 py-2 rounded-md text-sm font-black hover:scale-120 hover:font-extrabold"
                >
                  关于
                </Link>
              </div>
            </div>

            {/* 移动端汉堡菜单按钮 */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-zinc-dark dark:text-white  focus:outline-none hover:scale-120"
              >
                {/* 汉堡菜单图标，根据菜单状态显示不同图标 */}
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    // 关闭图标
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    // 汉堡菜单图标
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 移动端展开的菜单 */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* 移动端导航链接列表 */}
              <Link
                href="/ai"
                onClick={handleLinkClick}
                className="block text-zinc-dark dark:text-white px-3 py-2 rounded-md text-base font-black hover:scale-105 focus:scale-105 focus:font-extrabold"
              >
                AI 🚧
              </Link>
              <Link
                href="/experience"
                onClick={handleLinkClick}
                className="block text-zinc-dark dark:text-white px-3 py-2 rounded-md text-base font-black hover:scale-105 focus:scale-105 focus:font-extrabold"
              >
                经历
              </Link>
              <Link
                href="/projects"
                onClick={handleLinkClick}
                className="block text-zinc-dark dark:text-white px-3 py-2 rounded-md text-base font-black hover:scale-105 focus:scale-105 focus:font-extrabold"
              >
                项目
              </Link>
              <Link
                href="/toys"
                onClick={handleLinkClick}
                className="block text-zinc-dark dark:text-white px-3 py-2 rounded-md text-base font-black hover:scale-105 focus:scale-105 focus:font-extrabold"
              >
                创意 🚧
              </Link>
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="block text-zinc-dark dark:text-white px-3 py-2 rounded-md text-base font-black hover:scale-105 focus:scale-105 focus:font-extrabold"
              >
                联系
              </Link>
              <Link
                href="/about"
                onClick={handleLinkClick}
                className="block text-zinc-dark dark:text-white px-3 py-2 rounded-md text-base font-black hover:scale-105 focus:scale-105 focus:font-extrabold"
              >
                关于
              </Link>
            </div>
          </div>
        )}
      </nav>

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40"
          >
            <div className="w-screen mx-auto ">
              <div className="bg-gradient-to-r from-blue-base/90 via-yellow-base/90 to-pink-base/90 dark:from-blue-dark/90 dark:via-yellow-dark/90 dark:to-pink-dark/90 backdrop-blur-sm  shadow-lg border-b border-white/10">
                <div className="py-3 px-4 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-white text-sm font-medium">
                    由 <span className="font-bold">HUGH·Aix</span> 独立设计、开发与部署
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
