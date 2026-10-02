import React from "react";
import Head from "next/head";
import Button from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandShapes";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>出了点问题 | HUGH·Aix</title>
      </Head>
      <section className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Error 500</p>
          <h1 className="mt-5 text-display font-semibold text-ink">服务器开了个小差</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">请稍后刷新重试。如果问题一直存在，欢迎发邮件告诉我。</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">返回首页</Button>
            <Button href="mailto:xixikitchen@gmail.com" variant="secondary" arrow={false}>
              反馈问题
            </Button>
          </div>
        </div>
        <BrandMark className="mx-auto hidden w-full max-w-xs rotate-12 opacity-90 md:block" />
      </section>
    </>
  );
}
