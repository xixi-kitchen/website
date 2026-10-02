import React from "react";

export type TagTone = "neutral" | "pink" | "blue" | "yellow" | "inverse";

const tones: Record<TagTone, string> = {
  neutral: "bg-ink/[0.06] text-ink/75",
  pink: "bg-brand-pink/10 text-pink-text",
  blue: "bg-brand-blue/10 text-blue-text",
  yellow: "bg-brand-yellow text-[#121214]",
  inverse: "bg-white/10 text-white/85",
};

const Tag: React.FC<{ children: React.ReactNode; tone?: TagTone; className?: string }> = ({
  children,
  tone = "neutral",
  className = "",
}) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${tones[tone]} ${className}`}>
    {children}
  </span>
);

export default Tag;
