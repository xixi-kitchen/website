import { useEffect, useState, useRef, Suspense } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

// 注册GSAP插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 懒加载组件
const LazyProfessionalBg = dynamic(() => import('../sections/Professionalbg'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-gray-100 dark:bg-amber-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
});

// 3D模型 - 大脑
const Brain = () => {
  const { scene } = useGLTF('/models/model.glb');
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <primitive 
      ref={ref}
      object={scene} 
      scale={1.5} 
      position={[0, 0, 0]} 
    />
  );
};

// 3D模型 - 灯泡（创意）
const Lightbulb = () => {
  const { scene } = useGLTF('/models/model.glb');
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <primitive 
      ref={ref}
      object={scene} 
      scale={1.2} 
      position={[0, 0, 0]} 
    />
  );
};

// 类型定义
interface PhilosophyCardProps {
  title: string;
  description: string;
  color: string;
  delay?: number;
}

// 理念卡片组件
const PhilosophyCard = ({ title, description, color, delay = 0 }: PhilosophyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`bg-white dark:bg-blue-900 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${color}`}
    >
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

// 类型定义
interface SkillTagProps {
  skill: string;
  delay?: number;
}

// 技能标签组件
const SkillTag = ({ skill, delay = 0 }: SkillTagProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium m-1 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {skill}
    </motion.span>
  );
};

// 类型定义
interface ThreeDSceneProps {
  modelComponent: React.ComponentType;
}

// 3D场景组件
const ThreeDScene = ({ modelComponent: ModelComponent }: ThreeDSceneProps) => {
  return (
    <div className="h-[300px] md:h-[400px] w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <ModelComponent />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// 类型定义
interface KnowledgeArea {
  area: string;
  color: string;
  description?: string;
}

interface Philosophy {
  title: string;
  description: string;
  color: string;
}

const About: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 滚动动画效果
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // 理念数据
  const philosophies: Philosophy[] = [
    {
      title: "人性至上",
      description: "在遵循人性的前提下达到最简单的平衡。人性——最本质的冲动，简单——极致的低成本，平衡——价值的最大化。",
      color: "border-l-4 border-deeppink"
    },
    {
      title: "跨领域思维",
      description: "善用跨领域底层逻辑，以多面手视角驱动效率。以复合型思维支撑多维任务，擅长通过掌握学科核心方法论，快速解析模块化问题并实现资源协作。",
      color: "border-l-4 border-yellow"
    },
    {
      title: "设计理念",
      description: "\"一个人就是一个团队，每一个方面都需要懂——最基础的原理和原则\"。通过深入理解用户需求，创造简洁而有力的解决方案。",
      color: "border-l-4 border-brightblue"
    }
  ];
  
  // 知识背景数据
  const knowledgeAreas: KnowledgeArea[] = [
    { area: "哲学", color: "text-deeppink" },
    { area: "心理学", color: "text-deeppink", description: "研究生学习心理学，专业课274分（总分300）" },
    { area: "工业设计", color: "text-yellow", description: "本专业，专业排名第一，获得多项工业设计奖项" },
    { area: "交互设计", color: "text-yellow", description: "完成 google 交互设计专业认证" },
    { area: "用户体验系统", color: "text-yellow", description: "通过 Coursera 用户体验设计专业课程认证" },
    { area: "计算机", color: "text-brightblue", description: "自学编程多年，拥有完全独立编写的个人网站" },
    { area: "数据分析", color: "text-brightblue", description: "自学 Python 及NumPy、Pandas、Matplotlib、Scikit-learn等数据分析库" },
    { area: "人工智能", color: "text-brightblue", description: "自学机器学习数学基础、机器学习算法、神经网络原理等，自行部署有本地化大模型及云端调用各类大模型 API" }
  ];
  
  // 技能数据
  const skills: string[] = [
    "产品管理", "UI/UX设计", "交互设计", "工业设计", "用户研究", 
    "数据分析", "Python", "React", "TypeScript", "Three.js",
    "机器学习", "项目管理", "创意思维", "问题解决", "团队协作"
  ];
  
  // GSAP动画
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    
    // 标题动画
    const titleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-title",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    titleTimeline.from("#about-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    });
    
    // 理念部分动画
    gsap.from("#philosophy-section", {
      scrollTrigger: {
        trigger: "#philosophy-section",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    });
    
    // 知识背景动画
    gsap.from("#knowledge-section", {
      scrollTrigger: {
        trigger: "#knowledge-section",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    });
    
    // 技能部分动画
    gsap.from("#skills-section", {
      scrollTrigger: {
        trigger: "#skills-section",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    });
    
    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);
  
  if (!mounted) return null;
  
  return (
    <>
      <Head>
        <title>关于我 | HUGH·Aix</title>
        <meta name="description" content="了解HUGH·Aix的理念、知识背景和技能" />
      </Head>
      
      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-bg-blue-900">
        {/* 英雄区域 */}
        <motion.div 
          style={{ opacity, scale }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              关于我
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              跨领域思考者，复合型人才，善于将不同学科的知识融会贯通，创造独特价值
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12"
            >
              <svg className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </div>
        </motion.div>
        
        {/* 理念部分 */}
        <section id="philosophy-section" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="about-title" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">我的理念</h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {philosophies.map((philosophy, index) => (
                <PhilosophyCard
                  key={philosophy.title}
                  title={philosophy.title}
                  description={philosophy.description}
                  color={philosophy.color}
                  delay={index * 0.2}
                />
              ))}
            </div>
            
            <div className="mt-20">
              <ThreeDScene modelComponent={Lightbulb} />
            </div>
          </div>
        </section>
        
        {/* 知识背景部分 */}
        <section id="knowledge-section" className="py-20 bg-gray-50 dark:bg-blue-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">知识背景</h2>
              <div className="w-24 h-1 bg-yellow mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ThreeDScene modelComponent={Brain} />
              </div>
              
              <div className="space-y-6">
                {knowledgeAreas.map((item, index) => (
                  <motion.div
                    key={item.area}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4"
                  >
                    <h3 className={`text-xl font-bold ${item.color} flex items-center`}>
                      <span className="w-3 h-3 rounded-full bg-current mr-2"></span>
                      {item.area}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{item.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* 技能部分 */}
        <section id="skills-section" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">技能专长</h2>
              <div className="w-24 h-1 bg-brightblue mx-auto"></div>
            </div>
            
            <div className="text-center mb-12">
              {skills.map((skill, index) => (
                <SkillTag key={skill} skill={skill} delay={index * 0.05} />
              ))}
            </div>
          </div>
        </section>
        
        {/* 职业背景部分 */}
        <section id="professional-bg" className="py-20 bg-gray-50 dark:bg-blue-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">职业背景</h2>
              <div className="w-24 h-1 bg-deeppink mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                我的职业经历涵盖了多个领域，从工业设计到产品管理，从交互设计到用户体验，每一段经历都为我提供了独特的视角和宝贵的经验。
              </p>
            </div>
            
            <LazyProfessionalBg />
          </div>
        </section>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default About;