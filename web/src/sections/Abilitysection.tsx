import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Text3D, OrbitControls, useFont, Loader, useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';
import { motion } from 'framer-motion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

// 固定式的随机分布位置生成函数配置
const generateRandomPosition = (width: number, height: number) => {
  const radius = 8; // 固定较小的半径范围
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.pow(Math.random(), 0.5) * radius; // 使用平方根使分布更均匀
  const x = Math.cos(angle) * distance;
  const y = (Math.random() - 0.5) * 6; // 固定较小的垂直范围
  return [x, y, 0] as [number, number, number];
};

// 技能模型数据
const getSkillModels = (width: number, height: number) => [
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

// 中心学习能力模型组件
const CenterModel = () => {
  const meshRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, '/models/Learningabilitymodel.glb');
  const [hovered, setHovered] = useState(false);
  
  // 旋转相关配置
  const swingSpeed = 0.1;
  const swingAmplitude = Math.PI / 6;

  // 缩放相关配置
  const baseScale = 0.25;
  const hoverScale = 0.3;
  const scaleTransitionSpeed = 0.1;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * swingSpeed) * swingAmplitude;

      if (hovered) {
        meshRef.current.scale.lerp(new Vector3(hoverScale, hoverScale, hoverScale), scaleTransitionSpeed);
      } else {
        meshRef.current.scale.lerp(new Vector3(baseScale, baseScale, baseScale), scaleTransitionSpeed);
      }
    }
  });

  return (
    <group position={[0, 2, 0]}>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        scale={baseScale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <Html position={[0, -2, 0]} center>
        <div className="text-center space-y-6 max-w-3xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brightblue">编程技能</h2>
            <p className="text-gray-700 dark:text-gray-300">
              HTML • CSS • JavaScript • Java • Python • Arduino • Processing • React • Next.js • Three.js • 
              Data analysis library • Machine learning algorithm library • Deep learning algorithm library
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-yellow">超多技能</h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              <p>Adobe 全家桶全集</p>
              <p>三维模型软件：Rhino • C4D • Blender • 3DS MAX • ProE • Solidworks</p>
              <p>设计软件：Figma • Sketch</p>
              <p>渲染软件：Keyshot • Unreal Engine • Unity • Cycles • V ray • Redshift</p>
              <p>表面处理工艺（IMD • 水转印 • 蚀刻等）</p>
              <p>生产制造技术（CNC • 3D打印等）</p>
            </div>
          </div>

          <p className="text-lg text-deeppink italic">
            以上仅为部分技能，更多技能正在探索中……
          </p>
        </div>
      </Html>
    </group>
  );
};

// 单个模型组件配置
const Model = ({ 
  path, 
  position, 
  name
}: { 
  path: string;
  position: [number, number, number];
  name: string;
}) => {
  const meshRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, path);
  const [hovered, setHovered] = useState(false);
  
  // 旋转相关配置
  const swingSpeed = 0.1; // 可调整：摆动效果的速度
  const swingAmplitude = Math.PI / 4; // 可调整：摆动幅度

  // 缩放相关配置
  const baseScale = 0.2; // 可调整：模型基础大小
  const hoverScale = 0.25; // 可调整：鼠标悬浮时的大小
  const scaleTransitionSpeed = 0.1; // 可调整：大小变化的过渡速度

  useFrame((state) => {
    if (meshRef.current) {
      // 自动摆动效果
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * swingSpeed) * swingAmplitude;

      // 处理缩放动画
      if (hovered) {
        meshRef.current.scale.lerp(new Vector3(hoverScale, hoverScale, hoverScale), scaleTransitionSpeed);
      } else {
        meshRef.current.scale.lerp(new Vector3(baseScale, baseScale, baseScale), scaleTransitionSpeed);
      }
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group>
        <primitive
          ref={meshRef}
          object={gltf.scene}
          position={position}
          scale={baseScale}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        />
        <Html position={[position[0], position[1] - 1.5, position[2]]} center>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 pointer-events-none select-none">
            {name}
          </div>
        </Html>
      </group>
    </Float>
  );
};

// 模型网格组件
const ModelsGrid = () => {
  const [models, setModels] = useState<Array<any>>([]);
  const { size } = useThree();

  useEffect(() => {
    setModels(getSkillModels(size.width * 100, size.height * 100));
  }, [size]);

  if (models.length === 0) {
    return null;
  }

  return (
    <group>
      <CenterModel />
      {models.map((model, index) => (
        <Suspense
          key={model.name}
          fallback={
            <Html position={model.position}>
              <div className="text-brightblue">加载中...</div>
            </Html>
          }
        >
          <Model 
            path={model.path} 
            position={model.position as [number, number, number]} 
            name={model.name}
          />
        </Suspense>
      ))}
    </group>
  );
};

// 响应式布局配置
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  const { size } = useThree();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (size.width < 640) return 0.15;
      if (size.width < 1024) return 0.25;
      return 0.4;
    };
    setScale(calculateScale());
  }, [size.width]);

  return (
    <group scale={scale}>
      {children}
    </group>
  );
};

const AbilitySection = () => {
  return (
    <section className="h-screen w-full relative bg-gradient-to-br from-brightblue/5 via-yellow/5 to-deeppink/5 dark:from-brightblue/10 dark:via-yellow/10 dark:to-deeppink/10">
      {/* 装饰性色块 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brightblue/20 dark:bg-brightblue/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow/20 dark:bg-yellow/30 rounded-full blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-deeppink/20 dark:bg-deeppink/30 rounded-full blur-3xl"></div>
      
      <Canvas
        camera={{ 
          position: [0, 0, 20],
          fov: 45
        }}
        className="w-full h-full"
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <ResponsiveContainer>
            <ModelsGrid />
          </ResponsiveContainer>

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            maxDistance={30}
            minDistance={10}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default AbilitySection;
