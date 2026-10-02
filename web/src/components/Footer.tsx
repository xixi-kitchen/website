import React from "react";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "./Navbar";
import { ShapeRow } from "./ui/BrandShapes";
import { ArrowIcon } from "./ui/Button";

const emails = [
  { label: "QQ 邮箱", value: "1850786422@qq.com" },
  { label: "Gmail", value: "xixikitchen@gmail.com" },
];

const Footer: React.FC = () => {
  const isChinaServer = process.env.NEXT_PUBLIC_IS_CHINA_SERVER === "true";
  const icpNumber = process.env.NEXT_PUBLIC_ICP_NUMBER;
  const psbNumber = process.env.NEXT_PUBLIC_PSB_NUMBER;
  const psbCode = process.env.NEXT_PUBLIC_PSB_CODE;

  return (
    <footer className="border-t border-transparent bg-night text-white dark:border-white/10">
      <div className="container-page pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <ShapeRow size={22} />
            <p className="mt-8 text-title font-semibold">
              一起做点
              <span className="mx-2 bg-brand-yellow px-2 text-night">不平淡</span>
              的事。
            </p>
            <ul className="mt-10 space-y-3">
              {emails.map((email) => (
                <li key={email.value}>
                  <a
                    href={`mailto:${email.value}`}
                    className="group inline-flex items-baseline gap-3 text-lg text-white/80 transition-colors hover:text-white md:text-xl"
                  >
                    <span className="w-20 font-mono text-xs uppercase tracking-widest text-white/45">{email.label}</span>
                    {email.value}
                    <ArrowIcon className="self-center" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="页脚导航" className="grid grid-cols-2 content-start gap-x-8 gap-y-3 text-white/70 md:justify-self-end">
            <p className="col-span-2 mb-2 font-mono text-xs uppercase tracking-[0.2em] text-white/45">Sitemap</p>
            <Link href="/" className="transition-colors hover:text-white">
              首页
            </Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} HUGH·Aix · 由 HUGH·Aix 独立设计、开发与部署
          </p>
          {isChinaServer && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {icpNumber && (
                <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {icpNumber}
                </a>
              )}
              {psbNumber && psbCode && (
                <a
                  href={`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${psbCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  <Image src="/beian.png" alt="" width={14} height={14} />
                  {psbNumber}
                </a>
              )}
            </div>
          )}
        </div>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-4 font-mono text-[11px] text-white/30">
            dev · {isChinaServer ? "中国服务器" : "海外服务器"} · ICP {icpNumber || "未设置"} · 公安 {psbNumber || "未设置"}
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
