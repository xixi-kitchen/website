import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// 注册 GSAP 插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 闪烁背景效果组件
const GlitchyBackground = () => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // 确保在客户端渲染后再显示背景元素
    setInitialized(true);
    return () => setInitialized(false);
  }, []);
  
  if (!initialized) return null;
  
  return (
    <div className="glitchy-background absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-700 " 
         style={{animationDelay: '200ms', animationDuration: '700ms', animationName: 'fadeIn', animationFillMode: 'forwards'}}>
      {/* 粉色圆环元素 - 来自Ellipse.svg */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div 
          key={`circle-${i}`}
          className="absolute"
          style={{
            width: `${Math.random() * 15 + 20}vh`,
            height: `${Math.random() * 15 + 20}vh`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDelay: `${Math.random() * 6 + 0.7}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            animationName: `float-circle-${i % 4}`,
            backgroundImage: 'url(/Ellipse.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 1
          }}
        />
      ))}
      
      {/* 蓝色三角形元素 - 来自Polygon.svg */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div 
          key={`triangle-${i}`}
          className="absolute"
          style={{
            width: `${Math.random() * 15 + 20}vh`,
            height: `${Math.random() * 15 + 20}vh`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 3 + 0.8}s`,
            animationDuration: `${Math.random() * 8 + 12}s`,
            animationName: `float-shape-${i % 4}`,
            backgroundImage: 'url(/Polygon.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 1
          }}
        />
      ))}
      
      {/* 黄色正方形元素 - 来自Rectangle.svg */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div 
          key={`square-${i}`}
          className="absolute"
          style={{
            width: `${Math.random() * 15 + 15}vh`,
            height: `${Math.random() * 15 + 15}vh`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            transform: `rotate(${Math.random() * 45}deg)`,
            animationDelay: `${Math.random() * 4 + 0.9}s`,
            animationDuration: `${Math.random() * 9 + 12}s`,
            animationName: `float-shape-${i % 4}`,
            backgroundImage: 'url(/Rectangle.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 1
          }}
        />
      ))}
    </div>
  );
};

const About: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // 页面加载淡入效果
  useEffect(() => {
    // 设置初始状态
    document.body.style.overflow = 'hidden';
    
    // 延迟显示内容，给页面元素预加载时间
    const timer = setTimeout(() => {
      setPageLoaded(true);
      document.body.style.overflow = '';
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);
  
  // 滚动动画设置
  useEffect(() => {
    // 确保组件已挂载且DOM可用
    if (!mounted) {
      setMounted(true);
      return;
    }
    
    // 防止页面刷新时动画突兀
    gsap.set('.content-section', { opacity: 0, y: 30 });
    gsap.set('.divider', { scaleX: 0, opacity: 0 });
    gsap.set('.scattered-text', { opacity: 0 });
    
    // 标题字母动画 - 只在初始加载时执行一次
    const heroLetters = document.querySelectorAll('.hero-letter');
    gsap.set(heroLetters, { y: 300, opacity: 0 });
    
    // 等DOM完全准备好并且页面已加载
    const animationInitializer = setTimeout(() => {
      gsap.to(heroLetters, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5
      });
      
      // 滚动进度条
      gsap.to('progress', {
        value: 100,
        ease: 'none',
        scrollTrigger: { 
          trigger: containerRef.current,
          scrub: 0.3,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress.toFixed(2);
            document.documentElement.style.setProperty('--scroll', progress);
          }
        }
      });
      
      // 散布文字动画 - 使用scrub代替toggleActions，减少闪烁
      const scatteredTexts = document.querySelectorAll('.scattered-text');
      scatteredTexts.forEach((el, i) => {
        gsap.fromTo(el, 
          { 
            opacity: 0,
            x: i % 2 === 0 ? -100 : 100,
            y: 50
          }, 
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.scattered-section',
              start: 'top 80%',
              end: 'center 30%',
              scrub: 1, // 使用scrub实现平滑过渡
            }
          }
        );
      });
      
      // 内容区域的滚动效果 - 使用markers创建更平滑的动画
      const contentSections = document.querySelectorAll('.content-section');
      
      contentSections.forEach((section, index) => {
        // 创建一个时间轴，便于控制动画序列
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1, // 平滑过渡，减少闪烁
            toggleActions: 'play none none reverse',
          }
        });
        
        // 添加整个部分的淡入淡出
        tl.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
        
        // 为偶数和奇数部分添加不同的横向移动效果
        if (index % 2 === 1) {
          gsap.fromTo(
            section,
            { xPercent: -3 },
            {
              xPercent: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top center',
                scrub: 1.5, // 更慢的过渡，减少抖动
              }
            }
          );
        } else {
          gsap.fromTo(
            section,
            { xPercent: 3 },
            {
              xPercent: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top center',
                scrub: 1.5, // 更慢的过渡，减少抖动
              }
            }
          );
        }
        
        // 单独为标题添加渐显效果
        const title = section.querySelector('h2');
        gsap.fromTo(
          title,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );
      });
      
      // 分隔线使用scrub实现平滑过渡
      const dividers = document.querySelectorAll('.divider');
      dividers.forEach((divider) => {
        gsap.to(divider, {
          scaleX: 1,
          opacity: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: divider,
            start: 'top 95%',
            end: 'top 70%',
            scrub: 1, // 平滑过渡，减少闪烁
          }
        });
      });
      
      // 背景元素动画 - 移除所有透明度变化
      gsap.to('.glitchy-background div', {
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2
        }
      });
    }, 100);
    
    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      clearTimeout(animationInitializer);
    };
  }, [mounted]);
  
  return (
    <>
      <Head>
        <title>关于我 | HUGH·Aix</title>
        <meta name="description" content="探索我的设计之路，从工业设计到用户体验，从心理学到哲学的思考历程" />
      </Head>
      <div className={`page-transition ${pageLoaded ? 'loaded' : ''}`}>
      <div className="relative w-full min-h-screen  overflow-hidden">
        {/* 渐变背景光效 */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-brand-blue/60 via-brand-yellow/60 to-brand-pink/60 opacity-70 dark:opacity-25"></div>

        
          <progress max="100" value="0" className="fixed top-0 left-0 right-0 h-[3px] w-full appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-deeppink z-50">
            <div className="progress-bar"></div>
          </progress>
          
          <GlitchyBackground />
          
          {/* 英雄区域 */}
          <section className="hero-section relative min-h-screen flex flex-col justify-center pt-20">
            <div className="container mx-auto px-4 z-10">
              <div className="hero-title">
                <h1 className="text-9xl md:text-[15rem] font-extrabold leading-none tracking-tighter overflow-hidden text-ink">
                  {'关于我'.split('').map((letter, index) => (
                    <span key={index} className="hero-letter inline-block">{letter}</span>
                  ))}
                </h1>
              </div>
            </div>

            <div className="absolute bottom-20 left-0 w-full">
              <div className="container mx-auto px-4">
                <p className="text-2xl md:text-4xl text-ink/80 max-w-md fade-in ">
                  ———— 我的设计之路
                </p>
              </div>
            </div>
          </section>

          {/* 散布文字介绍区域 */}
          <section className="scattered-section relative py-32 min-h-[70vh]">
            <div className="container mx-auto">
              <div className="scattered-text absolute left-[5%] top-20 text-4xl md:text-6xl font-bold text-deeppink">
                设计
              </div>
              <div className="scattered-text absolute right-[10%] top-40 text-3xl md:text-5xl font-bold text-ink">
                思考
              </div>
              <div className="scattered-text absolute left-[20%] top-80 text-5xl md:text-7xl font-bold text-brightblue">
                探索
              </div>
              <div className="scattered-text absolute right-[25%] top-96 text-2xl md:text-4xl font-bold text-ink">
                跨领域
              </div>
              <div className="scattered-text absolute left-[30%] top-[400px] text-4xl md:text-6xl font-bold"><span className="bg-brand-yellow px-2 text-[#121214]">创新</span>
              </div>
              <div className="scattered-text absolute right-[15%] top-[300px] text-2xl md:text-3xl font-bold text-deeppink">
                知行合一
              </div>
              <div className="scattered-text absolute left-[8%] top-[360px] text-2xl md:text-4xl font-bold text-brightblue">
                人性至上
              </div>
              <div className="scattered-text absolute right-[28%] top-[200px] text-xl md:text-2xl font-bold"><span className="bg-brand-yellow px-2 text-[#121214]">辩证唯物</span>
              </div>
              <div className="scattered-text absolute left-[40%] top-[250px] text-xl md:text-3xl font-bold text-ink">
                心理学
              </div>
              <div className="scattered-text absolute right-[5%] top-[460px] text-2xl md:text-3xl font-bold text-brightblue">
                勇敢真诚
              </div>
            </div>
          </section>

          {/* 内容区域 */}
          <div className="container mx-auto px-4 py-16">
            {/* 第一部分 */}
            <section className="content-section mb-40">
              <h2 className="text-6xl md:text-8xl font-bold mb-20 leading-none">
                <span className="block">从探索</span>
                <span className="block text-deeppink">开始</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    一切都要从大学开始说起。
                    我毕业于上海海事大学，本科专业是工业设计。在这里，我打开了设计的大门，素质教育让我养成了设计思维、设计方法，也塑造了我的设计素养。但我很快发现，单靠学校的教育是不够的。
                  </p>
                </div>
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    幸运的是，我自小养成的学习习惯和对世界的好奇，让我在大学期间对各种领域都充满探索精神。我研究设计原理、表现手法、计算机、代码编程、Arduino、嵌入式系统、网页开发、摄影、剪辑、特效动画、建模、程序化建模…… 
                  </p>
                  <p className="text-xl text-deeppink font-bold leading-relaxed">
                    这一切积累，让我在毕业时荣获&ldquo;上海市优秀大学生&rdquo;称号，这是我人生中的一个重要里程碑。
                  </p>
                </div>
              </div>
            </section>

            <div className="divider h-px bg-gradient-to-r from-transparent via-deeppink to-transparent my-40"></div>

            {/* 第二部分 */}
            <section className="content-section mb-40">
              <h2 className="text-6xl md:text-8xl font-bold mb-20 leading-none">
                <span className="block">从学习到</span>
                <span className="block text-brightblue">思考</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    但当我回头审视自己所学的一切，我突然意识到一个问题——
                    我学了很多技能，但我好像缺少了自己的设计理念，没有真正属于自己的思想。
                  </p>
                </div>
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    从大二开始，我尝试在设计中使用符号、色彩来强化我的理念和品牌，但始终觉得不够深入，似乎缺少了一个更核心的支撑点。
                  </p>
                  <p className="text-xl text-ink/80 leading-relaxed">
                    直到大三，我接触了心理学。
                    心理学的神秘感、对人性的探索，填补了我对设计理念的需求，它让我理解了设计心理学、同理心、用户体验的更深层次内容。
                  </p>
                </div>
              </div>
            </section>

            <div className="divider h-px bg-gradient-to-r from-transparent via-brightblue to-transparent my-40"></div>

            {/* 第三部分 */}
            <section className="content-section mb-40">
              <h2 className="text-6xl md:text-8xl font-bold mb-20 leading-none">
                <span className="block">从心理学到</span>
                <span className="block"><span className="bg-brand-yellow px-3 text-[#121214]">哲学</span></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    所幸，考研的经历让我接触到了马克思主义辩证唯物法。
                    这次的启发像是一扇通往新世界的大门——它成功地将我过往所有的知识串联在了一起。
                  </p>
                </div>
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">从那时起，我开始涉猎哲学：</p>
                  <ul className="space-y-6 text-xl text-ink/80">
                    <li className="flex items-start">
                      <span className="text-ink mr-4 text-3xl">•</span>
                      <span>我学习王阳明心学，理解&ldquo;知行合一&rdquo;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-ink mr-4 text-3xl">•</span>
                      <span>我研究逻辑学，探索理性思维</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-ink mr-4 text-3xl">•</span>
                      <span>我阅读中国古典哲学，感悟东方智慧</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-ink mr-4 text-3xl">•</span>
                      <span>我钻研《资本论》，理解社会结构与发展</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="divider h-px bg-gradient-to-r from-transparent via-ink/40 to-transparent my-40"></div>

            {/* 第四部分 */}
            <section className="content-section mb-40">
              <h2 className="text-6xl md:text-8xl font-bold mb-20 leading-none">
                <span className="block">从探索到</span>
                <span className="block text-deeppink">实践</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    一路走来，我不断突破自我——
                    从工业设计，跨越到用户体验设计，再到产品经理、软件产品总监，我成功用职业生涯去推动世界的改变。
                  </p>
                </div>
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    于是，我决定打造自己的个人网站，让它成为我的作品、我的思想、我的信仰的载体。
                  </p>
                  <ul className="space-y-6 text-xl text-ink/80">
                    <li className="flex items-start">
                      <span className="text-deeppink mr-4 text-3xl">•</span>
                      <span>2021年，我首次尝试，但由于技术能力尚未成熟，最终只完成了设计，无法落地</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-deeppink mr-4 text-3xl">•</span>
                      <span>2023年，我再次挑战，勉强实现了第一个版本，但并不完美</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-deeppink mr-4 text-3xl">•</span>
                      <span>2025年，经过不断学习，我已经深入掌握计算机技术、前端开发、交互动画、AI 技术，终于独立完成了「设计+开发+部署」的全过程</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="divider h-px bg-gradient-to-r from-transparent via-deeppink to-transparent my-40"></div>

            {/* 第五部分 */}
            <section className="content-section mb-40">
              <h2 className="text-6xl md:text-8xl font-bold mb-20 leading-none">
                <span className="block">未来</span>
                <span className="block text-brightblue">的路</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    未来，我会继续深入研究心理学、哲学、人工智能，并推动「设计以人为本」的理念，不断挑战边界。
                  </p>
                </div>
                <div>
                  <p className="text-xl text-ink/80 mb-8 leading-relaxed">
                    &ldquo;设计&rdquo;从来不止于产品，而是对世界的理解、对人性的探索、对系统的优化、对体验的提升。
                    我希望能用设计的力量，让世界变得更好。
                  </p>
                  <p className="text-3xl text-brightblue font-bold leading-relaxed">
                    未来，我想要改变世界——
                    <br />从我自己开始！ 🚀
                  </p>
                </div>
              </div>
            </section>

            <div className="divider h-px bg-gradient-to-r from-transparent via-brightblue to-transparent my-40"></div>

            {/* 结语 */}
            <section className="content-section text-center mb-40">
              <h2 className="text-2xl md:text-4xl font-bold mb-20 leading-none">
                <span className="block">🌟</span>
                <span className="mt-3 block"><span className="bg-brand-yellow px-2 text-[#121214]">结语</span></span>
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-ink/80 mb-12 leading-relaxed">
                  这一段旅程，不是终点，而是新的起点。
                  我期待与你一起探索更多可能性！
                </p>
                <p className="text-4xl md:text-6xl text-ink font-bold leading-relaxed">
                  &ldquo;勇敢
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;且真诚&rdquo;
                </p>
                <p className="text-2xl text-ink/80 mt-4">
                  这不仅是我的信念，也是我的设计哲学。
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .glitchy-background div {
          animation: float 10s infinite ease-in-out;
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        .page-transition {
          opacity: 0;
          transition: opacity 600ms ease-in-out;
        }
        
        .page-transition.loaded {
          opacity: 1;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 20px) scale(1.1);
          }
        }
        
        @keyframes float-circle-0 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 40px) scale(0.9);
          }
        }
        
        @keyframes float-circle-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-50px, -30px) scale(1.15);
          }
          66% {
            transform: translate(35px, 25px) scale(0.85);
          }
        }
        
        @keyframes float-circle-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(25px, 45px) scale(1.05) rotate(30deg);
          }
        }
        
        @keyframes float-circle-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(-35px, -30px) scale(1.15) rotate(-45deg);
          }
        }
        
        @keyframes float-shape-0 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(50px, -30px) rotate(15deg);
          }
          75% {
            transform: translate(-20px, 40px) rotate(-15deg);
          }
        }
        
        @keyframes float-shape-1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-40px, -50px) rotate(-20deg);
          }
          66% {
            transform: translate(60px, 30px) rotate(40deg);
          }
        }
        
        @keyframes float-shape-2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(30px, 60px) rotate(30deg) scale(1.2);
          }
        }
        
        @keyframes float-shape-3 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-60px, -40px) rotate(-45deg) scale(0.8);
          }
        }
        
        :root {
          --scroll: 0;
        }
        
        /* 进度条样式 */
        progress {
          border: none;
        }
        
        progress::-webkit-progress-bar {
          background-color: transparent;
        }
        
        progress::-webkit-progress-value {
          background: linear-gradient(to right, #ff0088, #5522ff);
        }
        
        /* 平滑滚动 */
        html {
          scroll-behavior: smooth;
        }
        
        /* 提高渲染性能 */
        .content-section, .divider, .scattered-text {
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        /* 预加载隐藏 */
        .content-section {
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default About;