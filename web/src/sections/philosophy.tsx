import type { NextPage } from "next";
import Image from "next/image";
import polygon3 from "../../public/Polygon3.svg";

const Frame: NextPage = () => {
  return (
    <div className="w-full bg-amber-800 flex justify-center items-center">
    <div className="w-full h-auto text-white font-pingfang-sc flex items-center justify-center gap-8 max-w-screen-xl flex-wrap  lg:flex-row">
        <div className="top-0 left-0 bg-deeppink w-full h-auto flex flex-row items-center justify-start py-30 px-20 box-border">
          <div className="flex-1 flex flex-col items-start justify-start gap-24">
            <div className="self-stretch flex flex-col items-start justify-start gap-9">
              <div className="flex flex-row items-center justify-start gap-3">
                <Image
                  className="w-12 relative h-10"
                  width={49}
                  height={42}
                  alt=""
                  src={polygon3}
                />
                <div className="w-12 relative bg-yellow h-12" />
              </div>
              <div className="self-stretch relative leading-[99.52%] text-6xl font-semibold">
                在遵循人性的前提下达到最简单的平衡
              </div>
            </div>
            <div className="self-stretch relative text-4xl font-semibold">
              <p className="m-0">人性——最本质的冲动</p>
              <p className="m-0">简单——极致的低成本</p>
              <p className="m-0">平衡——价值的最大化</p>
            </div>
          </div>
        </div>
        <div className="top-0 left-165 bg-brightblue w-full h-auto flex flex-row items-center justify-center py-15 px-15 box-border">
          <div className="w-full flex flex-col items-start justify-start gap-24">
            <div className="self-stretch flex flex-col items-start justify-start gap-7">
              <div className="flex flex-row items-end justify-start gap-3">
                <div className="w-11 relative rounded-full bg-deeppink h-11" />
                <div className="w-12 relative bg-yellow h-12" />
              </div>
              <div className="self-stretch relative font-semibold">
                <p className="m-0 text-4xl">
                  善用跨领域底层逻辑 | 以多面手视角驱动效率
                </p>
                <p className="m-0 text-4xl">
                  以复合型思维支撑多维任务，虽无需深耕每个领域，但擅长通过掌握学科核心方法论，快速解析模块化问题并实现资源协作。
                </p>
              </div>
            </div>
            <div className="w-full relative font-semibold text-yellow inline-block text-4xl">
              “一个人就是一个团队，每一个方面都需要懂——最基础的原理和原则”
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frame;
