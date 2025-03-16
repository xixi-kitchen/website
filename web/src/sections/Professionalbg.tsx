import { NextPage } from 'next';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, OrbitControls, PerspectiveCamera, Billboard } from '@react-three/drei';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// 响应式配置：根据屏幕宽度返回不同的场景参数
const getResponsiveConfig = (width: number) => ({
  cameraPosition: width < 768 ? 18 : 20,    // 移动端相机位置调近一些
  fov: width < 768 ? 65 : 60,              // 移动端视场角稍微调小一些
  maxDistance: width < 768 ? 25 : 30,      // 移动端最大距离调小
  minDistance: width < 768 ? 12 : 10,      // 移动端最小距离略微调整
});

// 性能优化：预计算常用值，避免重复计算
const TWO_PI = Math.PI * 2;                // 2π
const SKILL_RADIUS_BASE = 2;               // 技能球基础半径
const SKILL_Y_RANGE = 3;                   // 技能球垂直分布范围
const GROUP_RADIUS_BASE = 6;               // 角色组基础半径
const GROUP_RADIUS_RANGE = 3;              // 角色组半径变化范围
const GROUP_Y_RANGE = 6;                   // 角色组垂直分布范围

// 单个技能文字组件：展示具体的技能标签
const SkillText = ({ text, position, color }: { text: string; position: [number, number, number]; color: string }) => {
  // 悬浮动画配置
  const floatConfig = useMemo(() => ({
    speed: 2,                              // 动画速度
    rotationIntensity: 0.8,               // 旋转强度
    floatIntensity: 0.5,                  // 浮动强度
  }), []);

  // 文字样式配置
  const textConfig = useMemo(() => ({
    fontSize: 0.2,
    maxWidth: 2,
    lineHeight: 1,
    letterSpacing: 0.02,
    textAlign: "center" as const,
    anchorX: "center" as const,
    anchorY: "middle" as const,
    font: "https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
  }), []);

  return (
    <Float {...floatConfig} position={position}>
      <Billboard>  {/* Billboard 确保文字始终面向相机 */}
        <Text {...textConfig} color={color}>
          {text}
        </Text>
      </Billboard>
    </Float>
  );
};

// 角色组件（包含标题和技能）
const RoleGroup = ({ role, position }: { role: typeof roles[0]; position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const skillPositions = useMemo(() => {
    return role.skills.map(() => {
      const angle = Math.random() * TWO_PI;
      const radius = SKILL_RADIUS_BASE + Math.random();
      const y = (Math.random() - 0.5) * SKILL_Y_RANGE;
      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, [role.skills]);

  const titleConfig = useMemo(() => ({
    fontSize: 0.4,
    maxWidth: 4,
    lineHeight: 1,
    letterSpacing: 0.05,
    textAlign: "center" as const,
    anchorX: "center" as const,
    anchorY: "middle" as const,
    font: "https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
  }), []);

  return (
    <group position={position} ref={groupRef}>
      <Billboard>
        <Text {...titleConfig} color="#FFD700">
          {role.title}
        </Text>
      </Billboard>

      {role.skills.map((skill, index) => (
        <SkillText
          key={skill}
          text={`+${skill}`}
          position={skillPositions[index]}
          color="#A0A0A0"
        />
      ))}
    </group>
  );
};

const Scene = () => {
  const mouseRef = useRef([0, 0]);
  
  useFrame((state) => {
    mouseRef.current[0] += (state.mouse.x * 20 - mouseRef.current[0]) * 0.02;
    mouseRef.current[1] += (state.mouse.y * 20 - mouseRef.current[1]) * 0.02;
    
    state.camera.position.x += (mouseRef.current[0] - state.camera.position.x) * 0.05;
    state.camera.position.y += (mouseRef.current[1] - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

const roles = [
  {
    title: "用户体验设计师",
    skills: ["工业设计", "用户体验系统", "交互设计"],
  },
  {
    title: "产品经理",
    skills: ["计算机", "工业设计", "数据分析", "人工智能", "用户体验系统", "交互设计"],
  },
  {
    title: "创意设计师",
    skills: ["工业设计", "计算机", "哲学", "心理学"],
  },
  {
    title: "交互设计师",
    skills: ["交互设计", "工业设计"],
  },
  {
    title: "产品leader",
    skills: ["工业设计", "交互设计", "用户体验系统", "心理学", "计算机", "数据分析", "哲学", "人工智能"],
  },
  {
    title: "工业设计师",
    skills: ["CMF", "工业设计"],
  },
];

// 响应式相机组件：根据屏幕尺寸调整相机参数
const ResponsiveCamera = () => {
  const { size } = useThree();  // 获取当前 Three.js 场景尺寸
  const config = getResponsiveConfig(size.width);
  
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, config.cameraPosition]}
      fov={config.fov}
    />
  );
};

// 响应式控制器组件：根据屏幕尺寸调整控制参数
const ResponsiveControls = () => {
  const { size } = useThree();
  const config = getResponsiveConfig(size.width);
  
  return (
    <OrbitControls
      enableZoom={false}      // 禁用缩放
      enablePan={false}       // 禁用平移
      enableRotate={false}    // 禁用旋转
      maxDistance={config.maxDistance}
      minDistance={config.minDistance}
    />
  );
};

// 场景内容组件：整合所有 3D 元素
const SceneContent = () => {
  // 使用 useMemo 缓存计算结果，避免每次渲染重新计算位置
  const groupPositions = useMemo(() => {
    // 为每个角色生成一个随机的三维空间位置
    return roles.map(() => {
      // 在 0 到 2π 之间生成随机角度，确保角色在圆形区域内均匀分布
      const angle = Math.random() * TWO_PI;
      
      // 计算距离中心点的半径：
      // GROUP_RADIUS_BASE(6) 是基础半径
      // + Math.random() * GROUP_RADIUS_RANGE(3) 添加 0-3 的随机偏移
      // 这样可以让角色分布在半径 6-9 的环形区域内
      const radius = GROUP_RADIUS_BASE + Math.random() * GROUP_RADIUS_RANGE;
      
      // 计算 Y 轴位置：
      // Math.random() - 0.5 生成 -0.5 到 0.5 的随机数
      // * GROUP_Y_RANGE(6) 将范围扩大到 -3 到 3
      // 这样可以让角色在垂直方向上有高低起伏
      const y = (Math.random() - 0.5) * GROUP_Y_RANGE;
      
      // 返回最终的三维坐标：
      return [
        Math.cos(angle) * radius,  // X 坐标：使用余弦函数计算水平位置
        y,                         // Y 坐标：直接使用计算好的高度值
        Math.sin(angle) * radius,  // Z 坐标：使用正弦函数计算深度位置
      ] as [number, number, number];  // 类型断言确保返回类型为三维坐标
    });
  }, []);  // 依赖数组为空，表示这些位置只在组件首次渲染时计算一次

  return (
    <>
      <ResponsiveCamera />
      <ResponsiveControls />
      <Scene />
      
      {/* 场景光源 */}
      <ambientLight intensity={2} />                           {/* 环境光 */}
      <pointLight position={[10, 10, 10]} intensity={1} />    {/* 主点光源 */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} />{/* 辅助点光源 */}
      
      {/* 渲染所有角色组 */}
      {roles.map((role, index) => (
        <RoleGroup
          key={role.title}
          role={role}
          position={groupPositions[index]}
        />
      ))}
    </>
  );
};

// 主组件：专业背景展示
const ProfessionalBg: NextPage = () => {
  const [key, setKey] = useState(0);  // 用于强制重新渲染场景的状态

  // 处理窗口大小变化
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      // 清除之前的定时器，防止频繁刷新
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // 设置防抖定时器，300ms 后重新渲染场景
      timeoutId = setTimeout(() => {
        setKey(prev => prev + 1);
      }, 300);
    };

    // 添加窗口大小变化监听
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    // 组件卸载时清理事件监听和定时器
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-[400px]  md:h-[60vh] lg:h-screen bg-zinc-dark dark:bg-black h-auto md:h-screenn">
      {/* Three.js 画布 */}
      <Canvas
        key={key}  // key 变化会触发画布重新渲染
        className="w-full h-full"
        dpr={[1, 2]}  // 设备像素比范围
        performance={{ min: 0.5 }}  // 性能配置
      >
        <SceneContent />
      </Canvas>
      
      {/* 刷新按钮：重新渲染场景 */}
      <button 
        onClick={() => setKey(prev => prev + 1)}
        className="absolute bottom-4 right-4 px-6 py-3 bg-yellow-base dark:bg-yellow-dark text-white rounded-full 
                   shadow-lg hover:bg-yellow-dark dark:hover:bg-yellow-base transition-all duration-300 ease-in-out
                   transform hover:scale-105 active:scale-95
                   flex items-center gap-2"
      >
        {/* 旋转的刷新图标 */}
      
        刷新场景
      </button>
    </div>
  );
};

export default ProfessionalBg;
