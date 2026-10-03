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
    <div ref={sectionRef} className="flex flex-col items-center gap-8 md:flex-row">
      <div className="w-full md:w-1/2">
        <h3 className="text-4xl font-bold text-ink">{title}</h3>
        <p className="mt-4 leading-relaxed text-muted">
          {content}{" "}
          <span className="bg-brand-yellow px-1 text-[#121214]">{highlight}</span>.
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

      <div className="relative min-h-screen overflow-hidden bg-canvas text-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-brand-yellow/45 blur-3xl dark:bg-brand-yellow/10" />
          <div className="absolute right-0 top-48 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl dark:bg-brand-blue/20" />
          <div className="absolute bottom-0 left-1/3 h-64 w-72 rounded-full bg-brand-pink/15 blur-3xl dark:bg-brand-pink/15" />
        </div>

        <div className="relative z-10 mx-auto max-w-screen-lg px-8 py-24">
          <h1 className="text-7xl font-extrabold leading-tight tracking-wide text-ink md:text-8xl">
            {text.title}
          </h1>
          <h2 className="mt-4 text-2xl text-muted md:text-3xl">{text.lead}</h2>

          <div className="mt-16 space-y-24">
            {text.sections.map((section) => (
              <Section key={section.title} title={section.title} content={section.content} highlight={section.highlight} />
            ))}
          </div>

          <h2 className="mt-24 text-center text-3xl font-bold text-ink">{text.end}</h2>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
