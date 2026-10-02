import React, { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";

const Magnetic: React.FC<{ children: React.ReactNode; className?: string; strength?: number }> = ({
  children,
  className = "",
  strength = 18,
}) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = root.current;
      if (!el || !contextSafe || reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

      const enter = contextSafe((e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * strength);
        yTo(((e.clientY - r.top) / r.height - 0.5) * strength);
      });
      const leave = contextSafe(() => {
        xTo(0);
        yTo(0);
      });

      el.addEventListener("mousemove", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default Magnetic;
