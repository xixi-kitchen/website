import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandShapes";

const roles = ["工业设计师", "交互设计师", "体验设计师", "产品经理", "产品 Leader"];

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

const Hero: React.FC = () => (
  <section className="relative isolate overflow-hidden">
    <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-14 py-16 md:grid-cols-[1.3fr_1fr] md:py-20">
      <div className="min-w-0">
        <motion.p {...fadeUp(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Xixikitchen · Personal Portfolio
        </motion.p>

        <motion.h1
          {...fadeUp(0.08)}
          className="mt-8 text-[clamp(2.4rem,5.2vw,4.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          <span className="block text-[0.45em] font-medium tracking-normal text-muted">你好，我是</span>
          <span className="mt-2 block text-[1.45em] leading-none">HUGH·Aix</span>
          <span className="mt-4 block">
            一个讨厌
            <span className="relative mx-[0.05em] inline-block">
              <span className="absolute inset-x-[-0.08em] bottom-[0.04em] top-[0.5em] -z-10 bg-brand-yellow" aria-hidden />
              平淡
            </span>
            的人
          </span>
        </motion.h1>

        <motion.div {...fadeUp(0.18)} className="mt-10 max-w-xl">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-base text-muted" aria-label="曾经的身份标签">
            {roles.map((role) => (
              <li key={role} className="line-through decoration-brand-pink decoration-2">
                #{role}
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-relaxed text-ink">这些不过是一个个单一的标签，真正完整的我，等你来发现。</p>
        </motion.div>

        <motion.div {...fadeUp(0.28)} className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/projects">看看我的项目</Button>
          <Button href="/contact" variant="secondary" arrow={false}>
            联系我
          </Button>
          <Button href="/about" variant="ghost" className="sm:ml-3">
            我的故事
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className="relative mx-auto w-full max-w-[22rem] md:max-w-none"
      >
        <BrandMark animated className="h-auto w-full" />
      </motion.div>
    </div>

    <div className="container-page pointer-events-none absolute inset-x-0 bottom-6 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:flex">
      <span className="h-px w-10 bg-muted/50" />
      Scroll
    </div>
  </section>
);

export default Hero;
