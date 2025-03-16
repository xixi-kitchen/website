import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Environment, useProgress, Html, useGLTF } from '@react-three/drei';
import { Vector3, Mesh, MeshPhongMaterial, Object3D, Group } from 'three';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

// 定义类型
interface SkillModel {
  name: string;
  path: string;
  position: [number, number, number];
}

/**
 * 生成随机位置的函数
 * @param width - 画布宽度
 * @param height - 画布高度
 * @returns [x, y, z] 坐标数组
 */
const generateRandomPosition = (width: number, height: number) => {
  const radius = 20; // 增加分布半径，让模型分布更分散
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.pow(Math.random(), 0.5) * radius;
  const x = Math.cos(angle) * distance;
  const y = (Math.random() - 0.5) * 20; // 增加垂直范围，使模型分布更均匀
  const z = Math.sin(angle) * distance * 0.5; // 添加z轴偏移，创造深度感
  return [x, y, z] as [number, number, number];
};

/**
 * 技能模型数据配置
 * 包含所有需要显示的 3D 模型信息：
 * - name: 模型名称
 * - path: 模型文件路径
 * - position: 随机生成的位置
 */
const getSkillModels = (width: number, height: number): SkillModel[] => [
  { name: 'HTML', path: '/models/htmlmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'CSS', path: '/models/cssmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'JavaScript', path: '/models/JSmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Java', path: '/models/javamodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Python', path: '/models/Pythonmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Three.js', path: '/models/threemodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Unity', path: '/models/unitymodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Unreal', path: '/models/unrealmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Rhino', path: '/models/rhinomodel.glb', position: generateRandomPosition(width, height) },
  { name: 'C4D', path: '/models/c4dmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Blender', path: '/models/blendermodel.glb', position: generateRandomPosition(width, height) },
  { name: '3DS MAX', path: '/models/3dsmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Keyshot', path: '/models/keyshotmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Sketch', path: '/models/sketchmodel.glb', position: generateRandomPosition(width, height) },
  { name: 'Arduino', path: '/models/arduinomodel.glb', position: generateRandomPosition(width, height) }
];

/**
 * 中心学习能力模型组件
 * 特点：
 * 1. 自动摆动动画
 * 2. 鼠标悬停缩放效果
 * 3. 固定在画面中央偏上位置
 */
const CenterModel = () => {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useGLTF('/models/Learningabilitymodel.glb');
  const [hovered, setHovered] = useState(false);
  
  // 使用 useMemo 缓存动画参数
  const animParams = useMemo(() => ({
    swingSpeed: 0.08,
    swingAmplitude: Math.PI / 8,
    baseScale: 1,
    hoverScale: 1.5,
    scaleTransitionSpeed: 0.1
  }), []);

  // 使用 useMemo 缓存材质
  const material = useMemo(() => new MeshPhongMaterial({
    color: 0xFF0088,
    emissive: 0x2a4d7f,
    shininess: 50,
    transparent: true,
    opacity: 0.9,
    // 添加性能优化相关的材质设置
    flatShading: true, // 使用平面着色
    precision: 'lowp', // 使用低精度
    depthWrite: false, // 禁用深度写入
  }), []);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.renderOrder = 999;
      if (meshRef.current.material instanceof MeshPhongMaterial) {
        meshRef.current.material.depthTest = false;
      }
    }

    if (scene) {
      // 优化模型
      scene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          child.material = material;
          // 优化几何体
          if (child.geometry) {
            child.geometry.computeBoundingSphere();
            child.geometry.computeBoundingBox();
          }
          // 禁用不必要的更新
          child.matrixAutoUpdate = false;
          child.updateMatrix();
        }
      });
    }
  }, [scene, material]);

  // 使用 useFrame 的第二个参数优化动画更新频率
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // 使用 delta 时间进行平滑动画
      meshRef.current.rotation.y = Math.sin(time * animParams.swingSpeed) * animParams.swingAmplitude;
      meshRef.current.position.y = 2 + Math.sin(time * 0.5) * 0.2;

      const targetScale = hovered ? animParams.hoverScale : animParams.baseScale;
      meshRef.current.scale.lerp(
        new Vector3(targetScale, targetScale, targetScale),
        delta * 10 * animParams.scaleTransitionSpeed
      );

      // 更新矩阵
      meshRef.current.updateMatrix();
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={animParams.baseScale}
      position={[0, 2, -5]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

/**
 * 单个技能模型组件
 * 功能：
 * 1. 自动摆动动画
 * 2. 鼠标悬停缩放效果
 * 3. 悬浮效果
 */
const Model = ({ path, position }: { path: string; position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF(path);
  const [hovered, setHovered] = useState(false);
  
  // 使用 useMemo 缓存动画参数
  const animationParams = useMemo(() => ({
    swingSpeed: 0.1 + Math.random() * 0.2,
    swingAmplitude: Math.PI / 6 + (Math.random() * Math.PI / 6),
    phaseOffset: Math.random() * Math.PI * 2,
    floatSpeed: 1 + Math.random(),
    rotationDirection: Math.random() > 0.5 ? 1 : -1,
    baseScale: 0.15,
    hoverScale: 0.3,
    scaleTransitionSpeed: 0.1
  }), []);

  useEffect(() => {
    if (scene) {
      // 优化模型
      scene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          // 优化几何体
          if (child.geometry) {
            child.geometry.computeBoundingSphere();
            child.geometry.computeBoundingBox();
          }
          // 禁用不必要的更新
          child.matrixAutoUpdate = false;
          child.updateMatrix();
        }
      });
    }
  }, [scene]);

  // 使用 useFrame 的第二个参数优化动画更新频率
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      meshRef.current.rotation.y = 
        Math.sin(time * animationParams.swingSpeed + animationParams.phaseOffset) 
        * animationParams.swingAmplitude 
        * animationParams.rotationDirection;

      const targetScale = hovered ? animationParams.hoverScale : animationParams.baseScale;
      meshRef.current.scale.lerp(
        new Vector3(targetScale, targetScale, targetScale),
        delta * 10 * animationParams.scaleTransitionSpeed
      );

      // 更新矩阵
      meshRef.current.updateMatrix();
    }
  });

  return (
    <Float
      speed={animationParams.floatSpeed}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <primitive
        ref={meshRef}
        object={scene}
        position={position}
        scale={animationParams.baseScale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </Float>
  );
};

/**
 * 模型网格组件
 * 功能：
 * 1. 管理所有模型的状态
 * 2. 根据画布大小动态更新模型位置
 * 3. 处理模型的加载状态
 */
const ModelsGrid = () => {
  const [models, setModels] = useState<SkillModel[]>([]);
  const { size } = useThree();
  const [mounted, setMounted] = useState(false);

  // 初始化和窗口大小变化时重新生成模型
  useEffect(() => {
    const generateModels = () => {
      const newModels = getSkillModels(size.width * 100, size.height * 100);
      setModels(newModels);
      setMounted(true);
    };

    generateModels();
  }, [size.width, size.height]);

  if (!mounted || models.length === 0) {
    return null;
  }

  return (
    <group>
      <CenterModel />
      {models.map((model) => (
        <Suspense key={`${model.name}-${size.width}-${size.height}`}>
          <Model 
            path={model.path} 
            position={model.position} 
          />
        </Suspense>
      ))}
    </group>
  );
};

/**
 * 响应式容器组件
 * 功能：
 * 1. 根据屏幕宽度调整模型整体大小
 * 2. 在不同设备上保持合适的显示比例
 */
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  const { size } = useThree();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (size.width < 640) return 0.3; // 增大移动设备缩放比例
      if (size.width < 1024) return 0.4; // 增大平板设备缩放比例
      return 0.6; // 增大桌面设备缩放比例
    };
    setScale(calculateScale());
  }, [size.width]);

  return (
    <group scale={scale}>
      {children}
    </group>
  );
};

// 加载进度组件
function LoadingIndicator() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl">
        加载中... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// 预加载所有模型
const modelPaths = getSkillModels(0, 0).map(model => model.path);
modelPaths.forEach(path => useGLTF.preload(path));

const Scene = () => {
  return (
    <>
      {/* 设置环境背景 */}
      <Environment 
        files="/moderimages/Lamp_1.hdr" // 环境背景文件路径
        background={false} // 是否作为背景
        blur={0.5} // 模糊度
        resolution={256} // 分辨率
        // preset="apartment" // 预设场景
      />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} castShadow={false} />
      {/* <pointLight position={[-10, -10, -5]} intensity={1} color="#ffffff" castShadow={false} /> */}
      <pointLight position={[0, 0, 10]} intensity={1} castShadow={false} />
      
      <ResponsiveContainer>
        <ModelsGrid />
      </ResponsiveContainer>
    </>
  );
};

/**
 * 能力展示区域主组件
 * 功能：
 * 1. 创建 3D 场景容器
 * 2. 配置照明和相机
 * 3. 设置交互控制
 * 4. 应用渐变背景和装饰效果
 */
const AbilitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0
  });

  // 使用防抖优化尺寸更新
  const updateContainerSize = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const { clientWidth, clientHeight } = containerRef.current;
          setContainerSize({
            width: clientWidth,
            height: clientHeight
          });
          setKey(prev => prev + 1);
        }
      }, 200);
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          requestAnimationFrame(updateContainerSize);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      updateContainerSize();
    }

    window.addEventListener('resize', updateContainerSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateContainerSize);
    };
  }, [updateContainerSize]);

  return (
    <section ref={containerRef} className="h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0">
        {containerSize.width > 0 && containerSize.height > 0 && (
          <Canvas
            key={`canvas-${key}-${containerSize.width}-${containerSize.height}`}
            camera={{ 
              position: [0, 0, 25],
              fov: 40,
              near: 0.1,
              far: 100
            }}
            style={{ width: '100%', height: '100%' }}
            resize={{ scroll: false }}
            dpr={window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio}
            gl={{
              preserveDrawingBuffer: true,
              antialias: false,
              powerPreference: 'high-performance',
              alpha: false,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0
            }}
            performance={{ min: 0.5 }}
          >
            <Suspense fallback={<LoadingIndicator />}>
              <Scene />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.8}
                minAzimuthAngle={-Math.PI / 3}
                maxAzimuthAngle={Math.PI / 3}
                maxDistance={35}
                minDistance={15}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
        )}
      </div>
    <div className="absolute bottom-0 left-0 w-full  text-white py-4 px-4 ">
      <div className="max-w-5xl mx-auto">
       
        <div className="space-y-4 md:space-y-6">
          {/* 开发技能部分 */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-base dark:text-blue-dark">开发技能</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "HTML", "CSS", "JavaScript", "Java", "Python", "Arduino",
                "Processing", "React", "Next.js", "Three.js",
                "Data analysis library", "Machine learning algorithm library",
                "Deep learning algorithm library"
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full
                           hover:bg-white/20 transition-all duration-300 transform
                           hover:scale-105 cursor-default text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* 其他技能部分 */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-base dark:text-blue-dark">其他技能</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
              {[
                "Adobe 全家桶全集",
                "三维模型软件：Rhino、C4D、Blender、3DS MAX、ProE、Solidworks",
                "设计软件：Figma、Sketch",
                "渲染软件：Keyshot、Unreal Engine、Unity、Cycles、V ray、Redshift",
                "表面处理工艺（IMD、水转印、蚀刻等）",
                "生产制造技术（CNC、3D打印等）"
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg
                           hover:bg-white/20 transition-all duration-300 transform
                           hover:scale-105 cursor-default text-xs md:text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
        <p className="text-base md:text-lg font-medium mt-4 text-zinc-light dark:text-zinc-dark italic">
          以上仅为部分技能，更多技能正在探索中……
        </p>
          </div>
        </div>

      </div>
    </div>
    </section>
  );
};

export default AbilitySection;
