import React from "react";

/** 项目没有封面图时使用的几何占位封面，按项目 id 稳定地选择构图 */
const layouts = [
  {
    bg: "bg-brand-yellow",
    shapes: (
      <>
        <circle cx="120" cy="150" r="78" stroke="#FF0088" strokeWidth="34" />
        <path d="M300 40L400 220H200L300 40Z" fill="#5522FF" />
      </>
    ),
  },
  {
    bg: "bg-brand-blue",
    shapes: (
      <>
        <rect x="60" y="60" width="130" height="130" fill="#FFF000" />
        <circle cx="300" cy="135" r="70" stroke="#FF0088" strokeWidth="30" />
      </>
    ),
  },
  {
    bg: "bg-brand-pink",
    shapes: (
      <>
        <path d="M120 40L215 210H25L120 40Z" fill="#FFF000" />
        <rect x="250" y="70" width="120" height="120" fill="#5522FF" />
      </>
    ),
  },
  {
    bg: "bg-night",
    shapes: (
      <>
        <circle cx="110" cy="130" r="64" stroke="#FF0088" strokeWidth="28" />
        <path d="M230 50L310 200H150L230 50Z" fill="#5522FF" />
        <rect x="300" y="110" width="90" height="90" fill="#FFF000" />
      </>
    ),
  },
];

const ProjectCover: React.FC<{ id: number; label?: string; className?: string }> = ({ id, label, className = "" }) => {
  const layout = layouts[id % layouts.length];
  return (
    <div className={`relative overflow-hidden ${layout.bg} ${className}`}>
      <svg viewBox="0 0 420 260" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <g className="origin-center transition-transform duration-700 [transform-box:view-box] group-hover:scale-105 group-hover:rotate-1">
          {layout.shapes}
        </g>
      </svg>
      {label && (
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] tracking-wider text-[#121214]">
          {label}
        </span>
      )}
    </div>
  );
};

export default ProjectCover;
