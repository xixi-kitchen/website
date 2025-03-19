import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import DecayCard from "@/components/DecayCard";

const Contact: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [key, setKey] = useState(0); // 用于强制刷新 DecayCard

  // 生成上方和下方的 SVG 图形数组
  const generateVectors = (count: number, isTop: boolean) => {
    return Array.from({ length: count }, (_, index) => {
      const scale = 1 + index * 1.5; // 基础缩放比例
      const spacing = 20 * (1 + index * 2); // 间距随索引增加而增大
      const yPosition = isTop
        ? -spacing - index * index * 3 // 上方图形，使用二次函数增加间距
        : spacing + index * index * 3; // 下方图形，使用二次函数增加间距

      const reverseIndex = count - 1 - index; // 反转索引，使外层图形先出现

      return {
        scale,
        blur: index * 0.5,
        y: yPosition,
        opacity: Math.max(0.15, 1 - index * 0.08),
        delay: 0.1 + reverseIndex * 0.15, // 延迟时间反转，外层先出现
      };
    });
  };

  const topVectors = generateVectors(10, true);
  const bottomVectors = generateVectors(10, false);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setKey(prev => prev + 1); // 强制刷新 DecayCard
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 根据窗口大小计算 DecayCard 的尺寸
  const getCardDimensions = () => {
    const width = windowSize.width;
    if (width < 640) { // 手机屏幕
      return { width: width * 0.9, height: 200 };
    } else if (width < 1024) { // 平板屏幕
      return { width: 600, height: 250 };
    } else { // 桌面屏幕
      return { width: 800, height: 300 };
    }
  };

  if (!mounted) return null;

  const { width: cardWidth, height: cardHeight } = getCardDimensions();

  return (
    <>
      <Head>
        <title>联系我 | HUGH·Aix</title>
        <meta
          name="description"
          content="联系HUGH·Aix，了解更多关于我的信息和合作机会"
        />
      </Head>

      <div className="min-h-screen bg-zinc-light dark:bg-zinc-dark flex flex-col items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl w-full flex flex-col items-center">
          {/* 上方的 ThreeVector 组 */}
          <div className="relative w-full flex flex-col items-center">
            {topVectors.map((vector, index) => (
              <motion.div
                key={`top-${index}`}
                initial={{
                  opacity: 0,
                  y: vector.y - 100,
                  scale: vector.scale * 1.2,
                }}
                animate={{
                  opacity: vector.opacity,
                  y: vector.y,
                  scale: vector.scale,
                }}
                transition={{
                  duration: 1,
                  delay: vector.delay,
                  ease: "easeOut",
                }}
                className="absolute"
                style={{
                  filter: `blur(${vector.blur}px)`,
                  transform: `scale(${vector.scale})`,
                }}
              >
                <Image
                  src="/threevector.svg"
                  alt={`Top Vector ${index + 1}`}
                  width={105}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </div>

          {/* 邮箱部分 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 2.5,
              ease: "easeOut",
            }}
            className="text-center flex justify-center items-center w-full px-4"
          >
            <DecayCard
              key={key}
              width={cardWidth}
              height={cardHeight}
              image="https://picsum.photos/300/400?grayscale"
            >
              <div className="flex flex-col gap-6 w-full">
                <p className="text-4xl sm:text-5xl lg:text-6xl text-center font-bold text-white dark:text-zinc-light mix-blend-difference">
                  联系我
                </p>
                <div className="flex flex-col gap-4">
                  <a 
                    href="mailto:1850786422@qq.com"
                    className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-white dark:text-zinc-light mix-blend-difference hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    QQ邮箱 1850786422@qq.com{" "}
                    <Image 
                      src="/Arrow.svg" 
                      alt="向右的小箭头" 
                      width={20} 
                      height={20} 
                      className="inline-block ml-1 -mt-1 opacity-80 group-hover:translate-x-1 transition-transform mix-blend-difference" 
                      style={{ filter: 'invert(100%)', stroke: 'black', strokeWidth: 2 }}
                    />
                  </a>
                  <a 
                    href="mailto:xixikitchen@gmail.com"
                    className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-white dark:text-zinc-light mix-blend-difference hover:opacity-80 transition-opacity cursor-pointer group"
                  >
                    Gmail xixikitchen@gmail.com{" "}
                    <Image 
                      src="/Arrow.svg" 
                      alt="向右的小箭头" 
                      width={20} 
                      height={20} 
                      className="inline-block ml-1 -mt-1 opacity-80 group-hover:translate-x-1 transition-transform mix-blend-difference" 
                      style={{ filter: 'invert(100%)' }}
                    />
                  </a>
                </div>
              </div>
            </DecayCard>
          </motion.div>

          {/* 下方的 ThreeVector 组 */}
          <div className="relative w-full flex flex-col items-center">
            {bottomVectors.map((vector, index) => (
              <motion.div
                key={`bottom-${index}`}
                initial={{
                  opacity: 0,
                  y: vector.y + 100,
                  scale: vector.scale * 1.2,
                }}
                animate={{
                  opacity: vector.opacity,
                  y: vector.y,
                  scale: vector.scale,
                }}
                transition={{
                  duration: 1,
                  delay: vector.delay,
                  ease: "easeOut",
                }}
                className="absolute"
                style={{
                  filter: `blur(${vector.blur}px)`,
                  transform: `scale(${vector.scale}) rotate(180deg)`,
                }}
              >
                <Image
                  src="/threevector.svg"
                  alt={`Bottom Vector ${index + 1}`}
                  width={105}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .vector-container {
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default Contact;
