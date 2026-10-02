import React, { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap-client";

const CursorBloom: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = root.current;
      if (!el || !contextSafe || reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

      const ring = el.querySelector<HTMLElement>(".cursor-ring");
      const tri = el.querySelector<HTMLElement>(".cursor-tri");
      const sq = el.querySelector<HTMLElement>(".cursor-sq");
      if (!ring || !tri || !sq) return;

      const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
      const xTri = gsap.quickTo(tri, "x", { duration: 0.7, ease: "power3" });
      const yTri = gsap.quickTo(tri, "y", { duration: 0.7, ease: "power3" });
      const xSq = gsap.quickTo(sq, "x", { duration: 1.05, ease: "power3" });
      const ySq = gsap.quickTo(sq, "y", { duration: 1.05, ease: "power3" });

      const move = contextSafe((e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        xRing(x - 28);
        yRing(y - 28);
        xTri(x + 18);
        yTri(y - 36);
        xSq(x - 48);
        ySq(y + 14);
      });

      window.addEventListener("mousemove", move);
      gsap.to(el, { autoAlpha: 1, duration: 0.6, delay: 0.4 });

      return () => window.removeEventListener("mousemove", move);
    },
    { scope: root }
  );

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-40 hidden opacity-0 md:block" aria-hidden>
      <span className="cursor-ring absolute left-0 top-0 h-14 w-14 rounded-full border-[6px] border-brand-pink mix-blend-multiply dark:mix-blend-screen" />
      <span className="cursor-tri absolute left-0 top-0 h-0 w-0 border-x-[12px] border-b-[20px] border-x-transparent border-b-brand-blue mix-blend-multiply dark:mix-blend-screen" />
      <span className="cursor-sq absolute left-0 top-0 h-6 w-6 bg-brand-yellow mix-blend-multiply dark:mix-blend-screen" />
    </div>
  );
};

export default CursorBloom;
