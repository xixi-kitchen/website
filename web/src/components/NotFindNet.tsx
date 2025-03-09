import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useState } from "react";

const Model = () => {
  // 使用 useGLTF 来加载模型文件
  const { scene } = useGLTF("/models/model.glb"); // 假设你的模型在 public/models 文件夹中
  return (
    <primitive object={scene} scale={[0.3, 0.3, 0.3]} position={[0, -3, 0]} />
  );
};
export default function NotFindNet() {
  return (
    <div className="w-full h-full">
      <Canvas>
        {/* 添加相机 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        {/* 加载模型 */}
        <Model />

        {/* 添加 OrbitControls 来控制相机 */}
        <OrbitControls
          minPolarAngle={Math.PI / 6} // 最小俯仰角度 (30°)
          maxPolarAngle={Math.PI / 1.5} // 最大俯仰角度 (120°)
          minDistance={8} // 最小缩放距离
          maxDistance={100} // 最大缩放距离
          enableRotate={true} // 启用旋转
          enableZoom={true} // 启用缩放
          enablePan={false} // 禁用平移
        />
      </Canvas>
    </div>
  );
}
