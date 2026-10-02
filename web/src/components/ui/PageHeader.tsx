import React from "react";
import { motion } from "framer-motion";
import { BrandMark } from "./BrandShapes";

interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  note?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ label, title, subtitle, note }) => (
  <header className="container-page relative pt-14 pb-12 md:pt-24 md:pb-16">
    <div className="flex items-end justify-between gap-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="min-w-0"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
        <h1 className="mt-5 text-display font-semibold text-ink">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{subtitle}</p>}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="hidden shrink-0 sm:block"
      >
        <BrandMark className="h-auto w-32 md:w-44 lg:w-52" />
      </motion.div>
    </div>
    {note && (
      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-pink" aria-hidden />
        {note}
      </div>
    )}
  </header>
);

export default PageHeader;
