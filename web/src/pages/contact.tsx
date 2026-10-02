import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import DecayCard from "@/components/DecayCard";
import { ArrowIcon } from "@/components/ui/Button";

const emails = [
  { label: "QQ 邮箱", value: "1850786422@qq.com" },
  { label: "Gmail", value: "xixikitchen@gmail.com" },
];

const tunnel = (count: number, isTop: boolean) =>
  Array.from({ length: count }, (_, index) => {
    const spacing = 20 * (1 + index * 2) + index * index * 3;
    return {
      scale: 1 + index * 1.5,
      blur: index * 0.5,
      y: isTop ? -spacing : spacing,
      opacity: Math.max(0.15, 1 - index * 0.08),
      delay: 0.05 + (count - 1 - index) * 0.08,
    };
  });

const topVectors = tunnel(10, true);
const bottomVectors = tunnel(10, false);

const cardSizeFor = (width: number) => {
  if (width < 640) return { width: Math.round(width * 0.92), height: 260 };
  if (width < 1024) return { width: 600, height: 300 };
  return { width: 760, height: 340 };
};

const Contact: NextPage = () => {
  const [card, setCard] = useState({ width: 760, height: 340 });

  useEffect(() => {
    const update = () => setCard(cardSizeFor(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const renderTunnel = (vectors: typeof topVectors, isTop: boolean) => (
    <div className="relative flex w-full flex-col items-center" aria-hidden>
      {vectors.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: v.y + (isTop ? -100 : 100), scale: v.scale * 1.2 }}
          animate={{ opacity: v.opacity, y: v.y, scale: v.scale }}
          transition={{ duration: 1, delay: v.delay, ease: "easeOut" }}
          className="absolute"
          style={{ filter: `blur(${v.blur}px)`, rotate: isTop ? 0 : 180 }}
        >
          <Image src="/threevector.svg" alt="" width={105} height={30} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>联系我 | HUGH·Aix</title>
        <meta name="description" content="联系 HUGH·Aix，聊聊产品、设计、AI 或合作机会。" />
      </Head>

      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden py-20">
        {renderTunnel(topVectors, true)}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex w-full justify-center px-4"
        >
          <DecayCard width={card.width} height={card.height}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">Get in touch</p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">联系我</h1>
            <ul className="mt-6 space-y-2">
              {emails.map((email) => (
                <li key={email.value}>
                  <a
                    href={`mailto:${email.value}`}
                    className="group inline-flex items-center gap-2 text-lg font-medium text-white/90 transition-colors hover:text-brand-yellow sm:text-2xl"
                  >
                    <span className="hidden font-mono text-xs uppercase tracking-widest text-white/50 sm:inline">{email.label}</span>
                    {email.value}
                    <ArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          </DecayCard>
        </motion.div>

        {renderTunnel(bottomVectors, false)}
      </div>
    </>
  );
};

export default Contact;
