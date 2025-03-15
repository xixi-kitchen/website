import type { NextPage } from "next";
import Image from "next/image";
import HonorBg from "../../public/Honor.png";

const honorItems = [
  "优秀新人、优秀员工",
  "专利2项",
  "上海市级优秀毕业生",
  "各项奖学金8次",
  "各类奖项21项",
  "开创生产可用性 RoomMap 功能",
];

const Honor: NextPage = () => {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 h-auto md:h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start gap-8 lg:gap-16 justify-between bg-amber-100">
        <div className="w-full md:w-1/2 bg-amber-400">
          <Image
            src={HonorBg}
            alt="荣誉背景图"
            width={500}
            height={924}
            className="w-full h-auto object-cover max-w-xl"
            priority
          />
        </div>
        <div className="flex flex-col w-full max-w-1/3 h-full items-end justify-between  gap-10 bg-amber-300">
          <div className="w-full  space-y-4 items-start ">
            {honorItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 w-full">
                <div className="w-3 h-3 rounded-full bg-pink-600 flex-shrink-0" />
                <p className="text-gray-800 text-lg font-semibold w-full">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <Image
            className="relative w-[208px] h-[60px]"
            width={208}
            height={60}
            alt=""
            src="Vector1.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default Honor;
