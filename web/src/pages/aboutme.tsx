import { useEffect, useRef } from "react";
import Head from "next/head";
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

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About | HUGH·Aix</title>
        <meta name="description" content="A journey of design, philosophy, and innovation." />
      </Head>

      {/* 背景层，支持黑暗模式 */}
      <div className="relative w-full min-h-screen bg-white dark:bg-zinc-dark text-zinc-900 dark:text-zinc-100 overflow-hidden">
        {/* 渐变背景光效 */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-yellow-base via-blue-base to-pink-base opacity-100 dark:from-blue-dark dark:via-blue-base dark:to-pink-dark dark:opacity-30"></div>

        {/* 页面内容 */}
        <div className="relative z-10 max-w-screen-lg mx-auto px-8 py-24">
          {/* 大标题 */}
          <h1 className="text-7xl md:text-8xl font-extrabold leading-tight tracking-wide text-zinc-900 dark:text-zinc-100">
            My <span className="text-zinc-800 dark:text-zinc-200">Journey</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-zinc-700 dark:text-zinc-300 mt-4">
            A story of <span className="text-zinc-800 dark:text-zinc-200">design</span>, <span className="text-zinc-800 dark:text-zinc-200">philosophy</span>, and <span className="text-zinc-800 dark:text-zinc-200">innovation</span>.
          </h2>

          {/* 章节内容，每个 Section 进入视口时都会触发动画 */}
          <div className="mt-16 space-y-24">
            <Section
              title="The Beginning"
              content="Everything started in college. I graduated from"
              highlight="Shanghai Maritime University"
            />
            <Section
              title="From Learning to Thinking"
              content="I mastered many skills, yet I felt something was missing—a"
              highlight="core philosophy"
            />
            <Section
              title="From Psychology to Philosophy"
              content="My journey into Marxist dialectical materialism changed everything. I explored"
              highlight="philosophy, logic, and classical thought"
            />
          </div>

          {/* 结尾 */}
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-24">
            &quot;Be Courageous and Be Authentic&quot; 🚀
          </h2>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  if (process.env.NODE_ENV === "production") {
    return { notFound: true };
  }
  return { props: {} };
}

export default AboutPage;
