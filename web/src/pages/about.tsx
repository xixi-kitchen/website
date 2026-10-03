import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Philosophy from "@/sections/philosophy";
import Knowledgebg from "@/sections/Knowledgebg";
import Honor from "@/sections/Honor";
import ExperienceSection from "@/sections/ExperienceSection";
import { useI18n } from "@/i18n/useI18n";

const darkPlaceholder = () => <div className="h-[80vh] w-full bg-night" />;

const Professionalbg = dynamic(() => import("@/sections/Professionalbg"), {
  ssr: false,
  loading: darkPlaceholder,
});

const Abilitysection = dynamic(() => import("@/sections/Abilitysection"), {
  ssr: false,
  loading: darkPlaceholder,
});

const About: NextPage = () => {
  const t = useI18n();
  return (
    <>
      <Head>
        <title>{`${t.about.title} | ${t.meta.title}`}</title>
        <meta name="description" content={t.about.subtitle} />
      </Head>
      <PageHeader label={t.about.label} title={t.about.title} subtitle={t.about.subtitle} />
      <div className="container-page flex flex-wrap gap-3 pb-4">
        <Button href="/resume/hugh-aix-color.pdf" variant="secondary" arrow={false}>
          {t.about.resumeColor}
        </Button>
        <Button href="/resume/hugh-aix-print.pdf" variant="secondary" arrow={false}>
          {t.about.resumePrint}
        </Button>
        <Button href="/aboutme" variant="ghost">
          {t.about.story}
        </Button>
      </div>
      <Philosophy />
      <Knowledgebg />
      <Professionalbg />
      <Abilitysection />
      <Honor />
      <ExperienceSection />
    </>
  );
};

export default About;
