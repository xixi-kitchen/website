import React, { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap"; // 导入gsap动画库

interface DecayCardProps {
  width?: number; // 宽度
  height?: number; // 高度
  image?: string; // 图像地址
  children?: ReactNode; // 子元素
}

const DecayCard: React.FC<DecayCardProps> = ({
  width = 300, // 默认宽度
  height = 400, // 默认高度
  image = "https://picsum.photos/300/400?grayscale", // 默认图像地址
  children,
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null); // SVG容器的引用
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null); // 位移映射的引用
  const cursor = useRef<{ x: number; y: number }>({
    x: window.innerWidth / 2, // 初始光标X坐标
    y: window.innerHeight / 2, // 初始光标Y坐标
  });
  const cachedCursor = useRef<{ x: number; y: number }>({ ...cursor.current }); // 缓存光标位置
  const winsize = useRef<{ width: number; height: number }>({
    width: window.innerWidth, // 当前窗口宽度
    height: window.innerHeight, // 当前窗口高度
  });

  useEffect(() => {
    const lerp = (a: number, b: number, n: number): number => // 线性插值函数
      (1 - n) * a + n * b;
    const map = (
      x: number,
      a: number,
      b: number,
      c: number,
      d: number
    ): number => // 映射函数
      ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1: number, x2: number, y1: number, y2: number): number => // 计算距离函数
      Math.hypot(x1 - x2, y1 - y2);

    const handleResize = (): void => { // 窗口大小变化处理函数
      winsize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    const handleMouseMove = (ev: MouseEvent): void => { // 光标移动处理函数
      cursor.current = { x: ev.clientX, y: ev.clientY };
    };

    window.addEventListener("resize", handleResize); // 监听窗口大小变化
    window.addEventListener("mousemove", handleMouseMove); // 监听光标移动

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 }, // 图像变换初始值
      displacementScale: 0, // 位移映射初始值
    };

    const render = () => { // 渲染函数
      let targetX = lerp(
        imgValues.imgTransforms.x,
        map(cursor.current.x, 0, winsize.current.width, -120, 120),
        0.1
      );
      let targetY = lerp(
        imgValues.imgTransforms.y,
        map(cursor.current.y, 0, winsize.current.height, -120, 120),
        0.1
      );
      const targetRz = lerp(
        imgValues.imgTransforms.rz,
        map(cursor.current.x, 0, winsize.current.width, -10, 10),
        0.1
      );

      const bound = 50; // 边界值
      if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;
      if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;
      if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;
      if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;

      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz,
        });
      }

      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(cursorTravelledDistance, 0, 200, 0, 400),
        0.06
      );

      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, {
          attr: { scale: imgValues.displacementScale },
        });
      }

      cachedCursor.current = { ...cursor.current };

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 计算文字容器的样式
  const getTextContainerStyle = () => {
    const baseSize = Math.min(width, height);
    return {
      fontSize: `${baseSize * 0.15}px`,
      lineHeight: 1.2,
      padding: `${baseSize * 0.04}px`,
      maxWidth: '95%',
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      display: 'flex' as const,
      flexDirection: 'column' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const
    };
  };

  return (
    <div
      ref={svgRef}
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="relative w-full h-full block [will-change:transform]"
      >
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.015"
            numOctaves="5"
            seed="4"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
            className="dark:brightness-50"
          />
        </g>
      </svg>
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center text-center"
        style={getTextContainerStyle()}
      >
        {children}
      </div>
    </div>
  );
};

export default DecayCard;
