import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HUGH·Aix — 徐禧的个人作品集</title>
        <meta
          name="description"
          content="徐禧（HUGH·Aix），产品经理与体验设计师。工业设计出身，跨越交互、用户体验、产品管理与 AI，这里是我的作品、经历与思考。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#fafaf7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0e0e10" media="(prefers-color-scheme: dark)" />
        <meta property="og:site_name" content="HUGH·Aix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <MotionConfig reducedMotion="user">
          <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </MotionConfig>
      </ThemeProvider>
    </>
  );
}
