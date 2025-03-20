import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";

// 静态导入轻量级组件
import Hero from "@/sections/hero";
import Philosophy from "@/sections/philosophy";
import Test from "@/sections/test";
import Link from "next/link";

// 动态导入重量级组件
const ProjectsSection = dynamic(() => import("@/sections/ProjectsSection"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-white dark:bg-zinc-light animate-pulse" />
});


const Knowledgebg = dynamic(() => import("@/sections/Knowledgebg"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-white dark:bg-zinc-light animate-pulse" />
});

const Professionalbg = dynamic(() => import("@/sections/Professionalbg"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-white dark:bg-zinc-light animate-pulse" />
});

const ExperienceSection = dynamic(() => import("@/sections/ExperienceSection"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-white dark:bg-zinc-light animate-pulse" />
});

const Honor = dynamic(() => import("@/sections/Honor"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-white dark:bg-zinc-light animate-pulse" />
});

// 3D 场景组件使用客户端渲染
const Abilitysection = dynamic(() => import("@/sections/Abilitysection"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-white dark:bg-zinc-light animate-pulse" />
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Home: NextPage = () => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid w-full items-center justify-items-center font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-0 items-start bg-white dark:bg-zinc-light w-full">
        <Link href="/aboutme">
        aboutme test
        </Link>
        <Link href="/markdown-test" className="ml-4">
          Markdown 测试页面
        </Link>
          <Test />
        <Hero />
        <Philosophy />
        {/* <Informs /> */}
        <Knowledgebg />   
        <Professionalbg />
        <Abilitysection />
        <Honor />
        <ExperienceSection />
        <ProjectsSection />
      </main>
    </div>
  );
};

export default Home;
