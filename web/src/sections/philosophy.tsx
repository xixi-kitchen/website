import Image from "next/image";
import Polygon3 from "../../public/Polygon3.svg";

const Philosophy = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 md:py-20 bg-yellow-base dark:bg-yellow-dark">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8 text-white">
        {/* 左侧内容区域 */}
        <div className="w-full lg:w-1/2 bg-pink-base dark:bg-pink-dark  p-8 md:p-12">
          <div className="flex flex-col gap-12">
            {/* 标题部分 */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src={Polygon3}
                  alt="装饰图形"
                  width={48}
                  height={40}
                  className="w-12 h-10"
                />
                <div className="w-12 h-12 bg-yellow-base dark:bg-yellow-dark " />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                在遵循人性的前提下达到最简单的平衡
              </h2>
            </div>
            
            {/* 三个核心理念 */}
            <div className="space-y-4 text-2xl md:text-3xl lg:text-4xl font-semibold">
              <p>人性——最本质的冲动</p>
              <p>简单——极致的低成本</p>
              <p>平衡——价值的最大化</p>
            </div>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="w-full lg:w-1/2 bg-blue-base dark:bg-blue-dark  p-8 md:p-12">
          <div className="flex flex-col gap-12">
            {/* 标题和说明部分 */}
            <div className="flex flex-col gap-6">
              <div className="flex items-end gap-3">
                <div className="w-11 h-11 rounded-full bg-pink-base dark:bg-pink-dark" />
                <div className="w-12 h-12 bg-yellow-base dark:bg-yellow-dark " />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                  善用跨领域底层逻辑 | 以多面手视角驱动效率
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed">
                  以复合型思维支撑多维任务，虽无需深耕每个领域，但擅长通过掌握学科核心方法论，快速解析模块化问题并实现资源协作。
                </p>
              </div>
            </div>

            {/* 引用部分 */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold text-yellow-base dark">
              &quot;一个人就是一个团队，每一个方面都需要懂——最基础的原理和原则&quot;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
