import React, { useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import SectionHeader from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { useRouter } from "next/router";

const TWO_PI = Math.PI * 2;

const rolesZh = [
  { title: "体验设计师", skills: ["工业设计", "体验系统", "交互设计"] },
  { title: "产品经理", skills: ["计算机", "工业设计", "数据分析", "人工智能", "体验系统", "交互设计"] },
  { title: "创意设计师", skills: ["工业设计", "计算机", "哲学", "心理学"] },
  { title: "交互设计师", skills: ["交互设计", "工业设计"] },
  { title: "产品负责人", skills: ["工业设计", "交互设计", "体验系统", "心理学", "计算机", "数据分析", "哲学", "人工智能"] },
  { title: "工业设计师", skills: ["色彩材料工艺", "工业设计"] },
];

const rolesEn = [
  { title: "Experience designer", skills: ["Industrial design", "Experience systems", "Interaction"] },
  { title: "Product manager", skills: ["Computing", "Industrial design", "Data", "Intelligence", "Experience systems", "Interaction"] },
  { title: "Creative designer", skills: ["Industrial design", "Computing", "Philosophy", "Psychology"] },
  { title: "Interaction designer", skills: ["Interaction", "Industrial design"] },
  { title: "Product lead", skills: ["Industrial design", "Interaction", "Experience systems", "Psychology", "Computing", "Data", "Philosophy", "Intelligence"] },
  { title: "Industrial designer", skills: ["Color, material, finish", "Industrial design"] },
];

type Vec3 = [number, number, number];

const ringPosition = (baseRadius: number, radiusRange: number, yRange: number, xStretch = 1): Vec3 => {
  const angle = Math.random() * TWO_PI;
  const radius = baseRadius + Math.random() * radiusRange;
  return [Math.cos(angle) * radius * xStretch, (Math.random() - 0.5) * yRange, Math.sin(angle) * radius * 0.5];
};

/** 用 DOM 文字渲染标签，使用页面字体，不需要为 3D 文字额外下载中文字体 */
const Label: React.FC<{ position: Vec3; children: React.ReactNode; className: string }> = ({ position, children, className }) => (
  <Html position={position} center distanceFactor={22} zIndexRange={[20, 0]} pointerEvents="none">
    <span className={`whitespace-nowrap select-none ${className}`}>{children}</span>
  </Html>
);

const RoleGroup: React.FC<{ role: (typeof rolesZh)[number]; position: Vec3 }> = ({ role, position }) => {
  const skillPositions = useMemo(() => role.skills.map(() => ringPosition(2, 1, 3)), [role.skills]);

  return (
    <group position={position}>
      <Label position={[0, 0, 0]} className="text-[28px] font-semibold text-brand-yellow">
        {role.title}
      </Label>
      {role.skills.map((skill, i) => (
        <Float key={skill} speed={2} rotationIntensity={0} floatIntensity={0.6} position={skillPositions[i]}>
          <Label position={[0, 0, 0]} className="text-[15px] text-white/55">
            + {skill}
          </Label>
        </Float>
      ))}
    </group>
  );
};

const CameraRig: React.FC = () => {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 6 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const SceneContent: React.FC<{ roles: typeof rolesZh }> = ({ roles }) => {
  const { size } = useThree();
  const xStretch = size.width / size.height > 1.4 ? 1.45 : 1;
  const groupPositions = useMemo(() => roles.map(() => ringPosition(5, 4, 5, xStretch)), [roles, xStretch]);
  return (
    <>
      <CameraRig />
      {roles.map((role, i) => (
        <RoleGroup key={role.title} role={role} position={groupPositions[i]} />
      ))}
    </>
  );
};

const ProfessionalBg: React.FC = () => {
  const [seed, setSeed] = useState(0);
  const { ref, inView, hasEntered } = useInView<HTMLDivElement>();
  const en = useRouter().locale === "en";
  const roles = en ? rolesEn : rolesZh;

  return (
    <section className="bg-night pt-[clamp(4.5rem,10vw,8rem)] text-white">
      <div className="container-page">
        <SectionHeader
          inverse
          index="03"
          label={en ? "Roles" : "角色"}
          title={en ? "One person, several roles" : "一个人，多重角色"}
          description={en ? "Each role is a few fields put together. Move the pointer to look around." : "每一个角色，都由几门底层学科组合而成。移动鼠标换个角度看看。"}
        />
      </div>

      <div ref={ref} className="relative mt-6 h-[60vh] min-h-[420px] overflow-hidden md:h-[72vh]">
        {hasEntered && (
          <Canvas key={seed} frameloop={inView ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 0, 14], fov: 60 }}>
            <SceneContent roles={roles} />
          </Canvas>
        )}
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition-colors hover:border-white/50 hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M16 10a6 6 0 1 1-1.76-4.24M16 4v3.5h-3.5" />
          </svg>
          {en ? "Shuffle" : "重新排列"}
        </button>
      </div>
    </section>
  );
};

export default ProfessionalBg;
