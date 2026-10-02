import React from "react";

interface ShapeProps {
  size?: number;
  className?: string;
}

export const Ring: React.FC<ShapeProps> = ({ size = 24, className = "text-brand-pink" }) => (
  <svg width={size} height={size} viewBox="0 0 46 46" fill="none" aria-hidden className={className}>
    <circle cx="23" cy="23" r="18.25" stroke="currentColor" strokeWidth="9.5" />
  </svg>
);

export const Triangle: React.FC<ShapeProps> = ({ size = 24, className = "text-brand-blue" }) => (
  <svg width={size} height={(size * 42) / 50} viewBox="0 0 50 42" fill="none" aria-hidden className={className}>
    <path d="M25 0L49.25 42H0.75L25 0Z" fill="currentColor" />
  </svg>
);

export const Square: React.FC<ShapeProps> = ({ size = 24, className = "text-brand-yellow" }) => (
  <svg width={size} height={size} viewBox="0 0 46 46" fill="none" aria-hidden className={className}>
    <rect width="46" height="46" fill="currentColor" />
  </svg>
);

export const ShapeRow: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <span className={`inline-flex items-end gap-[0.35em] ${className}`}>
    <Ring size={size} />
    <Triangle size={size * 1.08} />
    <Square size={size} />
  </span>
);

/** 圆、三角、方叠放的品牌主视觉 */
export const BrandMark: React.FC<{ className?: string; animated?: boolean }> = ({
  className = "",
  animated = false,
}) => (
  <svg viewBox="0 0 260 240" fill="none" aria-hidden className={className}>
    <g className={animated ? "animate-float [animation-delay:-4s] origin-center [transform-box:fill-box]" : undefined}>
      <rect x="96" y="8" width="140" height="140" fill="#FFF000" />
    </g>
    <g className={animated ? "animate-float [animation-delay:-9s] origin-center [transform-box:fill-box]" : undefined}>
      <circle cx="92" cy="128" r="64" stroke="#FF0088" strokeWidth="30" />
    </g>
    <g className={animated ? "animate-float origin-center [transform-box:fill-box]" : undefined}>
      <path d="M168 84L246 228H90L168 84Z" fill="#5522FF" />
    </g>
  </svg>
);
