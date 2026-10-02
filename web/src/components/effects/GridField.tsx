import React from "react";

/** 包豪斯坐标网格：细十字 + 三色锚点 */
const GridField: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
    <svg className="h-full w-full text-ink/10 dark:text-white/10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bauhaus-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M24 0v48M0 24h48" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bauhaus-grid)" />
    </svg>
    <span className="grid-anchor absolute left-[12%] top-[22%] h-3 w-3 rounded-full bg-brand-pink" />
    <span className="grid-anchor absolute right-[18%] top-[18%] h-0 w-0 border-x-[7px] border-b-[12px] border-x-transparent border-b-brand-blue" />
    <span className="grid-anchor absolute bottom-[16%] left-[22%] h-3.5 w-3.5 bg-brand-yellow" />
    <span className="grid-anchor absolute bottom-[28%] right-[12%] h-2.5 w-2.5 rounded-full border-[3px] border-brand-pink" />
  </div>
);

export default GridField;
