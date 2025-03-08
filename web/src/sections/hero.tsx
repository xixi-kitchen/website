import type { NextPage } from "next";
import Image from "next/image";
import Rectangle from "../../public/Rectangle.png";
import Polygon8 from "../../public/Polygon 8.svg";
import Vector from "../../public/Vector.svg";

const Hero: NextPage = () => {
  return (
    <div className=" w-full max-w-screen-xl flex flex-col md:flex-row items-center justify-between bg-amber-800 ">
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="flex flex-row items-center justify-start font-misans-vf">
          <div className="relative text-6xl leading-tight font-semibold font-pingfang-sc text-stroke-black">
            Hello！
          </div>
        </div>
        <div className="flex flex-col items-start justify-center text-4xl">
          <div className="relative leading-tight font-semibold text-shadow-black">
            你好，我是
          </div>
          <div className="flex flex-row items-center justify-center gap-8 text-6xl font-nabla">
            <div className="relative leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">
              HUGH
            </div>
            <Image
              className="w-20 h-20"
              width={80}
              height={80}
              alt=""
              src={Vector}
            />
          </div>
          <div className="relative leading-tight font-semibold text-shadow-black">
            一个讨厌平淡的人
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2 text-lg text-darkslategray">
          <div className="flex flex-row items-start justify-start gap-4">
            <div className="relative line-through leading-tight font-semibold">
              #工业设计师
            </div>
            <div className="relative line-through leading-tight font-semibold">
              #交互设计师
            </div>
            <div className="relative line-through leading-tight font-semibold">
              #体验设计师
            </div>
            <div className="relative line-through leading-tight font-semibold">
              #产品经理
            </div>
            <div className="relative line-through leading-tight font-semibold">
              #产品Leader
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <Image
              className="w-5 h-4"
              width={20}
              height={16}
              alt=""
              src={Polygon8}
            />
            <div className="relative leading-tight font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">
              这些不过是我一个个单一的标签，真正完整的我等待你的发现～
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-end justify-start relative mt-8 md:mt-0">
        <Image
          className="w-96 h-96 object-cover"
          width={384}
          height={384}
          alt=""
          src={Rectangle}
        />
      </div>
    </div>
  );
};

export default Hero;
