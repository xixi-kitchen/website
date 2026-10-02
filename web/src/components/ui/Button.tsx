import React from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-brand-blue hover:text-white",
  secondary: "border border-ink/15 text-ink hover:border-ink hover:bg-ink/[0.03]",
  ghost: "px-0 text-ink underline-offset-8 hover:underline",
  inverse: "bg-white text-night hover:bg-brand-yellow",
};

export const ArrowIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
  >
    <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Button: React.FC<ButtonProps> = ({ href, children, variant = "primary", arrow = true, className = "" }) => {
  const classes = `group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-300 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowIcon />}
    </>
  );

  if (/^(https?:|mailto:)/.test(href) || href.endsWith(".pdf")) {
    const isPdf = href.endsWith(".pdf");
    return (
      <a
        href={href}
        className={classes}
        download={isPdf || undefined}
        target={!isPdf && href.startsWith("http") ? "_blank" : undefined}
        rel={!isPdf && href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
};

export default Button;
