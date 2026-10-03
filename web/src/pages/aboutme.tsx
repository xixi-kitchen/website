import { useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const renderParagraph = (text: string, highlight: string) => {
  const index = text.indexOf(highlight);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-zinc-800 dark:text-zinc-200">{text.slice(index, index + highlight.length)}</span>
      {text.slice(index + highlight.length)}
    </>
  );
};

const Section = ({
  title,
  paragraphs,
  highlight,
}: {
  title: string;
  paragraphs: string[];
  highlight: string;
}) => {
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
      <div className="w-full max-w-2xl">
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <div className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{renderParagraph(paragraph, highlight)}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const story = {
  zh: {
    title: "我的来时路",
    lead: "设计、思考，以及把新东西做出来。这三件事在我这里是同一条路。",
    close: "所以我做的东西，要经得起使用，也要经得起追问。",
    sections: [
      {
        title: "开始",
        highlight: "上海海事大学",
        paragraphs: [
          "这段路从大学开始。我学的是工业设计，毕业于上海海事大学。那些年练的是看和做：一件东西被人怎么握住，一个动作会在哪里卡住，一张图有没有把意图说清楚。",
          "学校把基本功给了我。凭这些能把一件东西做出来，却还回答不了它为什么该存在。",
        ],
      },
      {
        title: "从学会到想清楚",
        highlight: "自己的方法",
        paragraphs: [
          "后来能拿出来用的东西越来越多。建模、界面、流程，再往后是代码。每一项都像一块能用的材料，合在一起却还是缺一块自己的方法。",
          "方法不是又一门手艺。它是面对一件没见过的事时，知道先问什么，哪一步可以停，以及什么时候必须亲手做出来。没有这个，技能再多，也只是在替别人把句子说完。",
        ],
      },
      {
        title: "从心理学到哲学",
        highlight: "哲学、逻辑和古典思想",
        paragraphs: [
          "缺的那一块，我是从心理学走近的。人为什么犹豫，为什么点错，为什么明知道有更好的路，还是走回老路。设计里那些说不清的别扭，常常不是形式的问题，而是人的问题。",
          "再往后，辩证唯物主义把散开的事重新串了起来。条件变了，人就变；人变了，物也该跟着变。我读的是哲学、逻辑和古典思想。心学里讲的知与行，让我不再把想清楚和做出来分成前后两段。",
        ],
      },
    ],
    end: "勇敢，并且真诚。",
  },
  en: {
    title: "The journey",
    lead: "A story of design, thought, and making something new.",
    close: "",
    sections: [
      { title: "The start", highlight: "Shanghai Maritime University", paragraphs: ["It began at university. I graduated from Shanghai Maritime University."] },
      { title: "From skill to a point of view", highlight: "a way of thinking", paragraphs: ["I learned many skills, and still felt the lack of a way of thinking."] },
      { title: "From psychology to philosophy", highlight: "philosophy, logic, and classical thought", paragraphs: ["Dialectical materialism tied the pieces together. I studied philosophy, logic, and classical thought."] },
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
      <div className="relative w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden">
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
              <Section key={section.title} title={section.title} paragraphs={section.paragraphs} highlight={section.highlight} />
            ))}
          </div>

          {text.close ? <p className="mx-auto mt-24 max-w-2xl text-center text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">{text.close}</p> : null}
          <h2 className={`text-center text-3xl font-bold text-zinc-900 dark:text-zinc-100 ${text.close ? "mt-8" : "mt-24"}`}>{text.end}</h2>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
