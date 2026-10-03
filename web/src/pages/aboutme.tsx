import { useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Section = ({ title, content, highlight }: { title: string; content: string; highlight: string }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2">
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
          {content} <span className="text-zinc-800 dark:text-zinc-200">{highlight}</span>.
        </p>
      </div>
    </div>
  );
};

const story = {
  zh: {
    title: "我的路程",
    lead: "设计、思想和做出新东西的一段经历。",
    sections: [
      { title: "开始", content: "事情从大学开始。我毕业于", highlight: "上海海事大学" },
      { title: "从学会到想清楚", content: "技能攒了很多，还是觉得缺一块", highlight: "自己的方法" },
      { title: "从心理学到哲学", content: "辩证唯物主义把很多事重新串了起来。我读的是", highlight: "哲学、逻辑和古典思想" },
    ],
    end: "勇敢，并且真诚。",
  },
  en: {
    title: "The journey",
    lead: "A story of design, thought, and making something new.",
    sections: [
      { title: "The start", content: "It began at university. I graduated from", highlight: "Shanghai Maritime University" },
      { title: "From skill to a point of view", content: "I learned many skills, and still felt the lack of", highlight: "a way of thinking" },
      { title: "From psychology to philosophy", content: "Dialectical materialism tied the pieces together. I studied", highlight: "philosophy, logic, and classical thought" },
    ],
    end: "Be brave, and be sincere.",
  },
};

const AboutPage = () => {
  const text = story[useRouter().locale === "en" ? "en" : "zh"];
  return (
    <>
      <Head>
        <title>{text.title}</title>
        <meta name="description" content={text.lead} />
      </Head>

      {/* 背景层，支持黑暗模式 */}
      <div className="relative w-full min-h-screen bg-white dark:bg-zinc-dark text-zinc-900 dark:text-zinc-100 overflow-hidden">
        {/* 渐变背景光效 */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-yellow-base via-blue-base to-pink-base opacity-100 dark:from-blue-dark dark:via-blue-base dark:to-pink-dark dark:opacity-30"></div>

        {/* 页面内容 */}
        <div className="relative z-10 max-w-screen-lg mx-auto px-8 py-24">
          {/* 大标题 */}
          <h1 className="text-7xl md:text-8xl font-extrabold leading-tight tracking-wide text-zinc-900 dark:text-zinc-100">
            {text.title}
          </h1>
          <h2 className="text-2xl md:text-3xl text-zinc-700 dark:text-zinc-300 mt-4">{text.lead}</h2>

          <div className="mt-16 space-y-24">
            {text.sections.map((section) => (
              <Section key={section.title} title={section.title} content={section.content} highlight={section.highlight} />
            ))}
          </div>

          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-24">{text.end}</h2>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
