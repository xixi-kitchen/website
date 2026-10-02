import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Html, Lightformer, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Group, Mesh, MeshPhongMaterial, Object3D, Vector3 } from "three";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import { useInView, useIsCoarsePointer } from "@/hooks/useInView";

type Vec3 = [number, number, number];

const SKILL_MODELS = [
  { name: "HTML", path: "/models/htmlmodel.glb" },
  { name: "CSS", path: "/models/cssmodel.glb" },
  { name: "JavaScript", path: "/models/JSmodel.glb" },
  { name: "Java", path: "/models/javamodel.glb" },
  { name: "Python", path: "/models/Pythonmodel.glb" },
  { name: "Three.js", path: "/models/threemodel.glb" },
  { name: "Unity", path: "/models/unitymodel.glb" },
  { name: "Unreal", path: "/models/unrealmodel.glb" },
  { name: "Rhino", path: "/models/rhinomodel.glb" },
  { name: "C4D", path: "/models/c4dmodel.glb" },
  { name: "Blender", path: "/models/blendermodel.glb" },
  { name: "3DS MAX", path: "/models/3dsmodel.glb" },
  { name: "Keyshot", path: "/models/keyshotmodel.glb" },
  { name: "Sketch", path: "/models/sketchmodel.glb" },
  { name: "Arduino", path: "/models/arduinomodel.glb" },
];

const devSkills = [
  "HTML", "CSS", "JavaScript", "Java", "Python", "Arduino", "Processing", "React", "Next.js", "Three.js",
  "数据分析库", "机器学习算法库", "深度学习算法库",
];

const otherSkills = [
  "Adobe 全家桶",
  "Rhino · C4D · Blender · 3DS MAX · ProE · Solidworks",
  "Figma · Sketch",
  "Keyshot · Unreal Engine · Unity · Cycles · V-Ray · Redshift",
  "表面处理工艺（IMD、水转印、蚀刻等）",
  "生产制造技术（CNC、3D 打印等）",
];

const randomPosition = (): Vec3 => {
  const radius = 20;
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.sqrt(Math.random()) * radius;
  return [Math.cos(angle) * distance, (Math.random() - 0.5) * 20, Math.sin(angle) * distance * 0.5];
};

const prepareScene = (scene: Object3D, material?: MeshPhongMaterial) => {
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      if (material) child.material = material;
      child.matrixAutoUpdate = false;
      child.updateMatrix();
    }
  });
};

const CenterModel: React.FC = () => {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF("/models/Learningabilitymodel.glb");
  const [hovered, setHovered] = useState(false);
  const target = useMemo(() => new Vector3(), []);
  const material = useMemo(
    () => new MeshPhongMaterial({ color: 0xff0088, emissive: 0x2a1060, shininess: 60, flatShading: true }),
    []
  );

  useEffect(() => prepareScene(scene, material), [scene, material]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.08) * (Math.PI / 8);
    ref.current.position.y = 2 + Math.sin(t * 0.5) * 0.2;
    const s = hovered ? 1.3 : 1;
    ref.current.scale.lerp(target.set(s, s, s), delta * 2);
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 2, -5]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

const SkillModel: React.FC<{ path: string; position: Vec3 }> = ({ path, position }) => {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(path);
  const [hovered, setHovered] = useState(false);
  const target = useMemo(() => new Vector3(), []);
  const anim = useMemo(
    () => ({
      speed: 0.1 + Math.random() * 0.2,
      amplitude: Math.PI / 6 + (Math.random() * Math.PI) / 6,
      phase: Math.random() * Math.PI * 2,
      float: 1 + Math.random(),
      direction: Math.random() > 0.5 ? 1 : -1,
    }),
    []
  );

  useEffect(() => prepareScene(scene), [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * anim.speed + anim.phase) * anim.amplitude * anim.direction;
    const s = hovered ? 0.3 : 0.15;
    ref.current.scale.lerp(target.set(s, s, s), delta * 2);
  });

  return (
    <Float speed={anim.float} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive
        ref={ref}
        object={scene}
        position={position}
        scale={0.15}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </Float>
  );
};

const ModelsGrid: React.FC = () => {
  const models = useMemo(() => SKILL_MODELS.map((m) => ({ ...m, position: randomPosition() })), []);
  return (
    <group>
      <CenterModel />
      {models.map((m) => (
        <Suspense key={m.name} fallback={null}>
          <SkillModel path={m.path} position={m.position} />
        </Suspense>
      ))}
    </group>
  );
};

const ResponsiveScale: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { size } = useThree();
  const scale = size.width < 640 ? 0.3 : size.width < 1024 ? 0.4 : 0.6;
  return <group scale={scale}>{children}</group>;
};

/** 用 Lightformer 在场景内生成环境光，替代原来 32MB 的 HDR 贴图 */
const Lighting: React.FC = () => (
  <>
    <Environment resolution={128} frames={1}>
      <Lightformer intensity={2.5} position={[0, 5, -9]} scale={[12, 6, 1]} />
      <Lightformer intensity={1.5} position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[12, 2, 1]} />
      <Lightformer intensity={1.5} position={[6, 1, -1]} rotation-y={-Math.PI / 2} scale={[12, 2, 1]} />
      <Lightformer form="ring" color="#ff0088" intensity={3} position={[8, 6, 8]} scale={3} />
      <Lightformer form="ring" color="#5522ff" intensity={3} position={[-8, -4, 6]} scale={3} />
    </Environment>
    <ambientLight intensity={0.8} />
    <pointLight position={[10, 10, 10]} intensity={1.5} />
    <pointLight position={[0, 0, 10]} intensity={1} />
  </>
);

const LoadingIndicator: React.FC = () => {
  const { progress } = useProgress();
  return (
    <Html center zIndexRange={[20, 0]}>
      <span className="whitespace-nowrap font-mono text-xs tracking-widest text-white/60">
        LOADING {progress.toFixed(0)}%
      </span>
    </Html>
  );
};

const AbilitySection: React.FC = () => {
  const { ref, inView, hasEntered } = useInView<HTMLDivElement>();
  const coarsePointer = useIsCoarsePointer();

  return (
    <section className="bg-night pb-[clamp(4.5rem,10vw,8rem)] text-white">
      <div className="container-page border-t border-white/10 pt-[clamp(4.5rem,10vw,8rem)]">
        <SectionHeader
          inverse
          index="04"
          label="Skills"
          title={
            <>
              技能与<span className="text-brand-yellow">工具箱</span>
            </>
          }
          description="画面中间那句话，是我最想让你记住的。把鼠标悬停在图标上看看——这只是一部分，更多正在探索中。"
        />
      </div>

      <div ref={ref} className="relative mt-6 h-[55vh] min-h-[380px] md:h-[68vh]">
        {hasEntered && (
          <Canvas
            frameloop={inView ? "always" : "never"}
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 25], fov: 40, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <Suspense fallback={<LoadingIndicator />}>
              <Lighting />
              <ResponsiveScale>
                <ModelsGrid />
              </ResponsiveScale>
              {!coarsePointer && (
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 1.8}
                  minAzimuthAngle={-Math.PI / 3}
                  maxAzimuthAngle={Math.PI / 3}
                  enableDamping
                  dampingFactor={0.05}
                />
              )}
            </Suspense>
          </Canvas>
        )}
      </div>

      <div className="container-page mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">开发技能</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {devSkills.map((s) => (
              <Tag key={s} tone="inverse">
                {s}
              </Tag>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">设计与制造</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherSkills.map((s) => (
              <Tag key={s} tone="inverse">
                {s}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AbilitySection;
