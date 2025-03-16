import type { NextPage } from "next";
import Image from "next/image";
import { memo } from "react";

// 使用memo优化组件性能，防止不必要的重渲染
const Knowledgebg: NextPage = memo(() => {
  return (
    <section className="w-full bg-pink-base dark:bg-pink-dark py-16 md:py-24 overflow-hidden relative h-auto md:h-screen flex items-center justify-center">
      {/* 背景装饰元素 */}
      <div className="absolute bottom-1/4 right-0 md:right-10 lg:right-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-base dark:bg-blue-dark opacity-20 blur-3xl"></div>
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col gap-16 md:gap-36 ">
          {/* 第一行 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <Image
                // 设置图片样式为全宽，最大宽度为md，居中显示，桌面端不设置margin
                className="w-full max-w-md mx-auto md:mx-0"
                // 设置图片宽度和高度
                width={463}
                height={200}
                // 设置图片的替代文本
                alt="知识背景图示"
                // 设置图片的源地址
                src="/threevector.svg"
                // 设置图片的优先级为false，表示不需要优先加载
                priority={false}
                // 设置图片的加载方式为lazy，表示延迟加载
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-dark dark:bg-pink-base"></div>
                <h3 className="text-2xl md:text-3xl font-semibold text-pink-dark dark:text-pink-base">+哲学</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-dark dark:bg-pink-base"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-pink-dark dark:text-pink-base">+心理学</h3>
                </div>
                <p className="text-base md:text-lg font-medium text-zinc-dark dark:text-zinc-light">
                  研究生学习心理学，专业课274分（总分300）
                </p>
              </div>
            </div>
          </div>
          
          {/* 第二行 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* 左侧列 */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-yellow-base dark:bg-yellow-dark"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-yellow-base  dark:text-yellow-dark">+工业设计</h3>
                </div>
                <p className="text-base md:text-lg font-medium text-zinc-dark dark:text-zinc-light">
                  本专业，专业排名第一，获得多项工业设计奖项
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-yellow-base dark:bg-yellow-dark"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-yellow-base  dark:text-yellow-dark">+交互设计</h3>
                </div>
                <p className="text-base md:text-lg font-medium text-zinc-dark dark:text-zinc-light">
                  完成 google 交互设计专业认证
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-yellow-base dark:bg-yellow-dark"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-yellow-base  dark:text-yellow-dark">+用户体验系统</h3>
                </div>
                <p className="text-base md:text-lg font-medium text-zinc-dark dark:text-zinc-light">
                  通过 Coursera 用户体验设计专业课程认证
                </p>
              </div>
            </div>
            
            {/* 右侧列 */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Image
                    className="w-8 h-8 object-contain"
                    width={31}
                    height={36}
                    alt="计算机图标"
                    src="/Polygon 12.svg"
                    loading="lazy"
                  />
                  <h3 className="text-2xl md:text-3xl font-semibold text-blue-base dark:text-blue-light">+计算机</h3>
                </div>
                <p className="text-base md:text-lg font-medium text-zinc-dark dark:text-zinc-light">
                  自学编程多年，拥有完全独立编写的个人网站
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Image
                    className="w-8 h-8 object-contain"
                    width={31}
                    height={36}
                    alt="数据分析图标"
                    src="/Polygon 12.svg"
                    loading="lazy"
                  />
                  <h3 className="text-2xl md:text-3xl font-semibold text-blue-base dark:text-blue-light">+数据分析</h3>
                </div>
                <p className="text-base md:text-lg font-medium text-zinc-dark dark:text-zinc-light">
                  自学 Python 及NumPy、Pandas、Matplotlib、Scikit-learn等数据分析库
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Image
                    className="w-8 h-8 object-contain"
                    width={31}
                    height={36}
                    alt="人工智能图标"
                    src="/Polygon 12.svg"
                    loading="lazy"
                  />
                  <h3 className="text-2xl md:text-3xl font-semibold text-blue-base dark:text-blue-light">+人工智能</h3>
                </div>
                <p className="text-base md:text-lg font-medium text-zinc-dark dark:text-zinc-light">
                  自学机器学习数学基础、机器学习算法、神经网络原理等，自行部署有本地化大模型及云端调用各类大模型 API
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Knowledgebg.displayName = "Knowledgebg";

export default Knowledgebg;
