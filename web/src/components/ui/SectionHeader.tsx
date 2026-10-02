import React from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  inverse?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  label,
  title,
  description,
  inverse = false,
  className = "",
}) => (
  <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
    <div className="max-w-3xl">
      <p
        className={`font-mono text-xs uppercase tracking-[0.2em] ${
          inverse ? "text-white/55" : "text-muted"
        }`}
      >
        {index} / {label}
      </p>
      <h2 className={`mt-4 text-title font-semibold text-balance ${inverse ? "text-white" : "text-ink"}`}>{title}</h2>
    </div>
    {description && (
      <p className={`max-w-md text-base leading-relaxed text-pretty md:text-right ${inverse ? "text-white/65" : "text-muted"}`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
