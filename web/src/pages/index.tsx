import type { NextPage } from "next";
import Hero from "@/sections/hero";
import ProjectsSection from "@/sections/ProjectsSection";
import Capabilities from "@/sections/Capabilities";
import Collaborate from "@/sections/Collaborate";
import CursorBloom from "@/components/effects/CursorBloom";
import BauhausMarquee from "@/components/effects/BauhausMarquee";

const Home: NextPage = () => (
  <>
    <CursorBloom />
    <Hero />
    <BauhausMarquee />
    <ProjectsSection />
    <Capabilities />
    <Collaborate />
  </>
);

export default Home;
