import type { NextPage } from "next";
import Image from "next/image";
import Rectangle from "../../public/Rectangle.png";
import Polygon8 from "../../public/Polygon8.svg";
import Vector from "../../public/Vector.svg";

const Hero: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-blue-base dark:bg-blue-dark flex justify-center items-center py-12 md:py-0">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* 左侧文本内容区域 */}
        <div className="flex flex-col items-start justify-between gap-8 md:gap-32 max-w-2xl">
          {/* Hello 部分 */}
          <div className="flex flex-row items-center justify-start font-misans-vf">
            <div className="text-5xl md:text-7xl lg:text-8xl leading-tight font-semibold font-pingfang-sc text-white text-stroke-black transform hover:scale-105 transition-transform duration-300">
              Hello！
            </div>
          </div>

          {/* 个人介绍部分 */}
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="text-3xl md:text-4xl lg:text-5xl leading-tight font-semibold text-white text-shadow-lg">
              你好，我是
            </div>
            <div className="flex flex-row items-center justify-start gap-6 md:gap-8">
              <div className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-base via-blue-base to-yellow-base animate-gradient-x">
                HUGH·Aix
              </div>
             
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl leading-tight font-semibold text-white text-shadow-lg">
              一个讨厌平淡的人
            </div>
          </div>

          {/* 标签部分 */}
          <div className="flex flex-col items-start justify-start gap-2 text-base md:text-lg">
            <div className="flex flex-wrap gap-3 md:gap-4">
              {[
                "#工业设计师",
                "#交互设计师",
                "#体验设计师",
                "#产品经理",
                "#产品Leader"
              ].map((tag, index) => (
                <div 
                  key={index}
                  className="relative line-through leading-tight font-semibold text-white/70 hover:text-white transition-colors duration-300 cursor-default"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center justify-start gap-3 group">
              <Image 
                className="w-15 h-20 transform group-hover:rotate-180 transition-transform duration-500"
                width={20}
                height={20}
                alt="装饰图标"
                src="/threevector.svg"
              />
              <div className="relative leading-tight font-semibold bg-clip-text bg-gradient-to-r text-white max-w-lg">
                这些不过是我一个个单一的标签，真正完整的我等待你的发现～
              </div>
            </div>
          </div>
        </div>

        {/* 右侧图片区域 */}
        {/* <div className="flex-shrink-0 relative">
          <Image
            className="w-72 md:w-96 h-72 md:h-96 object-cover shadow-2xl transform hover:scale-105 transition-transform duration-300"
            width={384}
            height={384}
            alt="个人照片"
            src={Rectangle}
            priority
          />
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
