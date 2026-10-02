import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Hero from "@/sections/hero";
import Philosophy from "@/sections/philosophy";
import Knowledgebg from "@/sections/Knowledgebg";
import Honor from "@/sections/Honor";
import ExperienceSection from "@/sections/ExperienceSection";
import ProjectsSection from "@/sections/ProjectsSection";
import CursorBloom from "@/components/effects/CursorBloom";
import BauhausMarquee from "@/components/effects/BauhausMarquee";

const darkPlaceholder = () => <div className="h-[80vh] w-full bg-night" />;

const Professionalbg = dynamic(() => import("@/sections/Professionalbg"), {
  ssr: false,
  loading: darkPlaceholder,
});

const Abilitysection = dynamic(() => import("@/sections/Abilitysection"), {
  ssr: false,
  loading: darkPlaceholder,
});

const Home: NextPage = () => (
  <>
    <CursorBloom />
    <Hero />
    <BauhausMarquee />
    <Philosophy />
    <Knowledgebg />
    <Professionalbg />
    <Abilitysection />
    <BauhausMarquee reverse />
    <Honor />
    <ExperienceSection />
    <ProjectsSection />
  </>
);

export default Home;
