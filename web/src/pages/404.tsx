import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";

const NotFindNet = dynamic(() => import("@/components/NotFindNet"), { ssr: false });

export default function Custom404() {
  return (
    <>
      <Head>
        <title>页面不存在 | HUGH·Aix</title>
      </Head>
      <section className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Error 404</p>
          <h1 className="mt-5 text-display font-semibold text-ink">这里什么也没有</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">你要找的页面可能已被移动或删除。拖动右边的模型玩一会儿，或者回到首页。</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">返回首页</Button>
            <Button href="/projects" variant="secondary" arrow={false}>
              看看项目
            </Button>
          </div>
        </div>
        <div className="h-[45vh] md:h-[60vh]">
          <NotFindNet />
        </div>
      </section>
    </>
  );
}
