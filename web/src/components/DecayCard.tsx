import React, { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface DecayCardProps {
  width?: number;
  height?: number;
  image?: string;
  children?: ReactNode;
}

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
const map = (x: number, a: number, b: number, c: number, d: number) => ((x - a) * (d - c)) / (b - a) + c;

const DecayCard: React.FC<DecayCardProps> = ({ width = 300, height = 400, image = "/contact-cover.svg", children }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let cached = { ...cursor };
    const state = { x: 0, y: 0, rz: 0, displacement: 0 };
    let frame = 0;

    const onMove = (ev: MouseEvent) => {
      cursor.x = ev.clientX;
      cursor.y = ev.clientY;
    };

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let x = lerp(state.x, map(cursor.x, 0, w, -120, 120), 0.1);
      let y = lerp(state.y, map(cursor.y, 0, h, -120, 120), 0.1);
      const bound = 50;
      if (x > bound) x = bound + (x - bound) * 0.2;
      if (x < -bound) x = -bound + (x + bound) * 0.2;
      if (y > bound) y = bound + (y - bound) * 0.2;
      if (y < -bound) y = -bound + (y + bound) * 0.2;
      state.x = x;
      state.y = y;
      state.rz = lerp(state.rz, map(cursor.x, 0, w, -10, 10), 0.1);

      const travelled = Math.hypot(cached.x - cursor.x, cached.y - cursor.y);
      state.displacement = lerp(state.displacement, map(travelled, 0, 200, 0, 400), 0.06);
      cached = { ...cursor };

      if (cardRef.current) gsap.set(cardRef.current, { x: state.x, y: state.y, rotateZ: state.rz });
      if (displacementMapRef.current) gsap.set(displacementMapRef.current, { attr: { scale: state.displacement } });

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={cardRef} className="relative" style={{ width, height }}>
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="relative block h-full w-full will-change-transform">
        <filter id="decayFilter">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="5" seed="4" stitchTiles="stitch" result="turbulence" />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
        <image href={image} x="0" y="0" width="600" height="750" filter="url(#decayFilter)" preserveAspectRatio="xMidYMid slice" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">{children}</div>
    </div>
  );
};

export default DecayCard;
