import React from "react";
import { Ring, Square, Triangle } from "./BrandShapes";

/** 内页背景的静态几何装饰，只用 transform 动画，不使用模糊滤镜 */
const GeometricBackdrop: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
    <div className="absolute -top-10 -left-16 opacity-[0.08] animate-float">
      <Ring size={320} />
    </div>
    <div className="absolute top-[38%] -right-20 opacity-[0.07] animate-float [animation-delay:-6s]">
      <Triangle size={360} />
    </div>
    <div className="absolute bottom-[6%] left-[8%] opacity-[0.12] animate-float [animation-delay:-10s] dark:opacity-[0.06]">
      <Square size={160} />
    </div>
  </div>
);

export default GeometricBackdrop;
