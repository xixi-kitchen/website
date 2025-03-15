import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";

// 静态导入轻量级组件
import Hero from "@/sections/hero";
import Philosophy from "@/sections/philosophy";
import Test from "@/sections/test";

// 动态导入重量级组件
const ProjectsSection = dynamic(() => import("@/sections/ProjectsSection"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-emerald-600 animate-pulse" />
});

const Informs = dynamic(() => import("@/sections/informs"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-emerald-600 animate-pulse" />
});

const Knowledgebg = dynamic(() => import("@/sections/Knowledgebg"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-emerald-600 animate-pulse" />
});

const Professionalbg = dynamic(() => import("@/sections/Professionalbg"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-emerald-600 animate-pulse" />
});

const ExperienceSection = dynamic(() => import("@/sections/ExperienceSection"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-emerald-600 animate-pulse" />
});

const Honor = dynamic(() => import("@/sections/Honor"), {
  ssr: true,
  loading: () => <div className="w-full h-screen bg-emerald-600 animate-pulse" />
});

// 3D 场景组件使用客户端渲染
const Abilitysection = dynamic(() => import("@/sections/Abilitysection"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-emerald-600 animate-pulse" />
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
      className={`${geistSans.variable} ${geistMono.variable} grid w-full items-center justify-items-center font-[family-name:var(--font-geist-sans)] bg-emerald-100`}
    >
      <main className="flex flex-col gap-8 items-start bg-emerald-600 w-full">
        <Test />
        <Hero />
        <Philosophy />
        <ProjectsSection />
        <Informs />
        <Knowledgebg />   
        <Professionalbg />
        <ExperienceSection />
        <Honor />
        <Abilitysection />
      </main>
    </div>
  );
};

export default Home;
