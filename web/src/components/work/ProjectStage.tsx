import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import type { Project } from "@/data/projects";
import { useI18n } from "@/i18n/useI18n";

const PINK = "#ff0088";
const BLUE = "#5522ff";
const YELLOW = "#fff000";

type Pose = { pos: [number, number, number]; rot: [number, number, number] };

const layouts: { ring: Pose; tri: Pose; box: Pose }[] = [
  {
    ring: { pos: [-1.35, 0.15, 0.2], rot: [0.4, 0.5, 0.1] },
    tri: { pos: [1.15, -0.35, 0.35], rot: [0.2, -0.4, 0.15] },
    box: { pos: [0.35, 1.05, -0.45], rot: [0.5, 0.7, 0.2] },
  },
  {
    ring: { pos: [1.25, 0.55, 0.1], rot: [0.8, -0.2, 0.4] },
    tri: { pos: [-0.2, -1.05, 0.4], rot: [0.1, 0.6, 0.8] },
    box: { pos: [-1.2, 0.35, -0.2], rot: [0.3, 0.2, 0.6] },
  },
  {
    ring: { pos: [0.15, -0.15, 0.7], rot: [1.1, 0.2, 0.3] },
    tri: { pos: [-1.25, 0.7, -0.1], rot: [0.4, 0.9, -0.2] },
    box: { pos: [1.2, 0.15, -0.35], rot: [0.2, -0.8, 0.5] },
  },
  {
    ring: { pos: [-0.4, 1.05, 0.15], rot: [0.2, 1.1, 0.5] },
    tri: { pos: [1.3, 0.45, 0.2], rot: [-0.3, 0.4, 0.9] },
    box: { pos: [-0.15, -1.05, 0.45], rot: [0.7, 0.3, -0.4] },
  },
];

const dampV3 = (current: THREE.Vector3, target: [number, number, number], lambda: number, dt: number) => {
  current.x = THREE.MathUtils.damp(current.x, target[0], lambda, dt);
  current.y = THREE.MathUtils.damp(current.y, target[1], lambda, dt);
  current.z = THREE.MathUtils.damp(current.z, target[2], lambda, dt);
};

const dampE = (current: THREE.Euler, target: [number, number, number], extra: number, lambda: number, dt: number) => {
  current.x = THREE.MathUtils.damp(current.x, target[0] + extra, lambda, dt);
  current.y = THREE.MathUtils.damp(current.y, target[1] + extra * 1.4, lambda, dt);
  current.z = THREE.MathUtils.damp(current.z, target[2], lambda, dt);
};

const ShapeRig: React.FC<{ layout: number }> = ({ layout }) => {
  const ring = useRef<THREE.Mesh>(null);
  const tri = useRef<THREE.Mesh>(null);
  const box = useRef<THREE.Mesh>(null);
  const spin = useRef(0);
  const pose = layouts[layout % layouts.length];

  useEffect(() => {
    spin.current = Math.PI * 1.15;
  }, [layout]);

  useFrame((state, dt) => {
    spin.current = THREE.MathUtils.damp(spin.current, 0, 2.4, dt);
    const t = state.clock.elapsedTime;
    if (ring.current) {
      dampV3(ring.current.position, pose.ring.pos, 3.2, dt);
      dampE(ring.current.rotation, pose.ring.rot, spin.current, 3.2, dt);
      ring.current.position.y += Math.sin(t * 0.7) * 0.04;
    }
    if (tri.current) {
      dampV3(tri.current.position, pose.tri.pos, 2.6, dt);
      dampE(tri.current.rotation, pose.tri.rot, spin.current * 0.8, 2.6, dt);
    }
    if (box.current) {
      dampV3(box.current.position, pose.box.pos, 2.2, dt);
      dampE(box.current.rotation, pose.box.rot, spin.current * 1.2, 2.2, dt);
    }
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 7.4 + spin.current * 0.35, 2.5, dt);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} />
      <pointLight position={[-3, -1, 3]} color={PINK} intensity={18} distance={14} />
      <pointLight position={[3, 2, 2]} color={BLUE} intensity={14} distance={14} />
      <mesh ref={ring}>
        <torusGeometry args={[1.05, 0.28, 24, 64]} />
        <meshStandardMaterial color={PINK} roughness={0.32} metalness={0.08} />
      </mesh>
      <mesh ref={tri}>
        <coneGeometry args={[1.05, 1.75, 3]} />
        <meshStandardMaterial color={BLUE} roughness={0.38} metalness={0.06} />
      </mesh>
      <mesh ref={box}>
        <boxGeometry args={[1.35, 1.35, 0.38]} />
        <meshStandardMaterial color={YELLOW} roughness={0.42} metalness={0.04} />
      </mesh>
    </>
  );
};

const ProjectStage: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const t = useI18n();
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const safeIndex = projects.length === 0 ? 0 : index % projects.length;
  const current = projects[safeIndex];

  useEffect(() => {
    setIndex(0);
  }, [projects.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => (projects.length ? (value + 1) % projects.length : 0));
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => (projects.length ? (value - 1 + projects.length) % projects.length : 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [projects.length]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    let accumulated = 0;
    let cooling = false;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (cooling || projects.length < 2) return;
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      accumulated += delta;
      if (Math.abs(accumulated) < 80) return;
      const direction = accumulated > 0 ? 1 : -1;
      accumulated = 0;
      cooling = true;
      setIndex((value) => (value + direction + projects.length) % projects.length);
      window.setTimeout(() => {
        cooling = false;
        accumulated = 0;
      }, 650);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [projects.length]);

  const layout = safeIndex;

  if (!current) return null;

  return (
    <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:gap-10">
      <ol className="max-h-[70vh] space-y-1 overflow-y-auto pr-2 lg:max-h-[calc(100svh-12rem)]">
        {projects.map((project, i) => {
          const active = i === safeIndex;
          return (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={active ? "true" : undefined}
                className={`flex w-full items-baseline gap-4 border-l-2 px-4 py-3 text-left transition-colors ${
                  active ? "border-brand-pink text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-lg leading-snug ${active ? "font-semibold" : ""}`}>{project.title}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div ref={stageRef} className="relative min-h-[68vw] overflow-hidden rounded-3xl bg-night lg:min-h-[calc(100svh-12rem)]">
        <Canvas camera={{ position: [0, 0, 7.4], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={["#0d0d10"]} />
          <ShapeRig layout={layout} />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/80 to-transparent p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto max-w-xl"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">{t.work.hint}</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{current.title}</h2>
              <p className="mt-3 line-clamp-3 text-white/75">{current.description}</p>
              <Link href={`/projects/${current.slug}`} className="mt-6 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-night">
                {t.work.enter}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProjectStage;
