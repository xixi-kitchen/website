import React from "react";

const items = [
  "Product",
  "Industrial Design",
  "Interaction",
  "Experience",
  "AI",
  "Philosophy",
  "Psychology",
  "Leadership",
];

const BauhausMarquee: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => (
  <div className="relative overflow-hidden border-y border-ink bg-ink py-3 text-canvas dark:border-line">
    <div className={`marquee-track flex w-max gap-8 ${reverse ? "marquee-reverse" : ""}`} aria-hidden>
      {[0, 1].map((copy) => (
        <p key={copy} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.35em]">
          {items.map((item) => (
            <span key={`${copy}-${item}`} className="inline-flex items-center gap-8">
              {item}
              <span className="inline-block h-2 w-2 bg-brand-yellow" />
            </span>
          ))}
        </p>
      ))}
    </div>
    <span className="sr-only">{items.join(" · ")}</span>
  </div>
);

export default BauhausMarquee;
