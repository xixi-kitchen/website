import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Text3D, OrbitControls, useFont, Loader, useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';
import { motion } from 'framer-motion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

// 固定式的随机分布位置生成函数配置
const generateRandomPosition = (width: number, height: number) => {
  const radius = width / 2000; // 固定较小的半径范围
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.pow(Math.random(), 0.5) * radius; // 使用平方根使分布更均匀
  const x = Math.cos(angle) * distance;
  const y = (Math.random() - 0.5) * 6; // 固定较小的垂直范围
  return [x, y, 0] as [number, number, number];
};

// 技能模型数据
const getSkillModels = (width: number, height: number) => [
  { name: 'HTML', path: '/models/htmlmodel.glb', position: generateRandomPosition(width, height), description: 'HTML5 网页开发' },
  { name: 'CSS', path: '/models/cssmodel.glb', position: generateRandomPosition(width, height), description: 'CSS3 样式设计' },
  { name: 'JavaScript', path: '/models/JSmodel.glb', position: generateRandomPosition(width, height), description: 'JavaScript 编程' },
  { name: 'Java', path: '/models/javamodel.glb', position: generateRandomPosition(width, height), description: 'Java 应用开发' },
  { name: 'Python', path: '/models/Pythonmodel.glb', position: generateRandomPosition(width, height), description: 'Python 开发' },
  { name: 'Three.js', path: '/models/threemodel.glb', position: generateRandomPosition(width, height), description: '3D 网页开发' },
  { name: 'Unity', path: '/models/unitymodel.glb', position: generateRandomPosition(width, height), description: 'Unity 游戏开发' },
  { name: 'Unreal', path: '/models/unrealmodel.glb', position: generateRandomPosition(width, height), description: '虚幻引擎开发' },
  { name: 'Rhino', path: '/models/rhinomodel.glb', position: generateRandomPosition(width, height), description: '工业设计建模' },
  { name: 'C4D', path: '/models/c4dmodel.glb', position: generateRandomPosition(width, height), description: '动效设计' },
  { name: 'Blender', path: '/models/blendermodel.glb', position: generateRandomPosition(width, height), description: '3D 建模与动画' },
  { name: '3DS MAX', path: '/models/3dsmodel.glb', position: generateRandomPosition(width, height), description: '3D 场景建模' },
  { name: 'Keyshot', path: '/models/keyshotmodel.glb', position: generateRandomPosition(width, height), description: '产品渲染' },
  { name: 'Sketch', path: '/models/sketchmodel.glb', position: generateRandomPosition(width, height), description: 'UI/UX 设计' },
  { name: 'Arduino', path: '/models/arduinomodel.glb', position: generateRandomPosition(width, height), description: '硬件开发' },
  { name: '学习能力', path: '/models/Learningabilitymodel.glb', position: generateRandomPosition(width, height), description: '持续学习成长' }
];

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
    // 在客户端渲染时初始化模型位置
    setModels(getSkillModels(size.width * 100, size.height * 100));
  }, [size]);

  if (models.length === 0) {
    return null;
  }

  return (
    <group>
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
          position: [0, 0, 20], // 调整相机距离更近
          fov: 45 // 减小视野角度使画面更聚焦
        }}
        className="w-full h-full"
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} /> {/* 增加环境光强度 */}
          <pointLight position={[10, 10, 10]} intensity={1.2} /> {/* 增加点光源强度 */}
          <ResponsiveContainer>
            <group position={[0, 8, 0]}> {/* 调整标题位置 */}
              <Html center>
                <div className="text-center space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brightblue via-yellow to-deeppink">
                    能力矩阵
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                    以下展示了我的主要技能和工具掌握程度
                  </p>
                </div>
              </Html>
            </group>
            <ModelsGrid />
          </ResponsiveContainer>

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            maxDistance={30} // 限制最大缩放距离
            minDistance={10} // 限制最小缩放距离
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default AbilitySection;
