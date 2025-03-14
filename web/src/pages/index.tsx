import { NextPage } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import Hero from "@/sections/hero";
import Test from "@/sections/test";
import Philosophy from "@/sections/philosophy";
import ProjectsSection from "@/sections/ProjectsSection";
import Informs from "@/sections/informs";
import Knowledgebg from "@/sections/Knowledgebg";
import Professionalbg from "@/sections/Professionalbg";
import Honor from "@/sections/Honor";
import ExperienceSection from "@/sections/ExperienceSection";

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
      <main className="flex flex-col gap-8 row-start-2 items-center bg-emerald-600 w-full">
        <Test />
        <Knowledgebg />
        <Professionalbg />
        <ExperienceSection />
        <Honor />
      </main>
    </div>
  );
};

export default Home;
