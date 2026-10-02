import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { ShapeRow } from "./ui/BrandShapes";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  beta?: boolean;
}

export const navItems: NavItem[] = [
  { href: "/experience", label: "经历" },
  { href: "/projects", label: "项目" },
  { href: "/ai", label: "AI", beta: true },
  { href: "/toys", label: "创意", beta: true },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setIsOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const isActive = (href: string) => router.pathname === href || router.pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || isOpen ? "border-line bg-canvas/85 backdrop-blur-xl" : "border-transparent bg-canvas"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="主导航">
        <Link href="/" className="group flex items-center gap-3 text-ink" aria-label="返回首页">
          <ShapeRow size={14} className="transition-transform duration-500 group-hover:-rotate-6" />
          <span className="text-[15px] font-semibold tracking-tight">HUGH·Aix</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
                      active ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {item.beta && (
                      <span className="rounded-full border border-line px-1.5 font-mono text-[10px] leading-4 text-muted">
                        Beta
                      </span>
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-[1px] h-[2px] bg-gradient-to-r from-brand-pink via-brand-blue to-brand-yellow"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="md:ml-2" />

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            aria-label={isOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isOpen}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {isOpen ? <path d="M6 18 18 6M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between py-3 text-2xl font-semibold ${
                      isActive(item.href) ? "text-ink" : "text-muted"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.beta && <span className="font-mono text-xs font-normal text-muted">Beta</span>}
                    </span>
                    {isActive(item.href) && <span className="h-2 w-2 rounded-full bg-brand-pink" />}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
