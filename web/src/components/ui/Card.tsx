import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const cardBase = "relative overflow-hidden rounded-3xl border border-line bg-surface";
export const cardInteractive =
  "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_48px_-28px_rgba(18,18,20,0.35)]";

const Card: React.FC<CardProps> = ({ interactive = false, className = "", children, ...rest }) => (
  <div className={`${cardBase} ${interactive ? cardInteractive : ""} ${className}`} {...rest}>
    {children}
  </div>
);

export default Card;
