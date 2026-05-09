"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, PerspectiveCamera, Sky, useGLTF } from "@react-three/drei";
import { RotateCcw, Sun, Zap } from "lucide-react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Car } from "@/types/car";
import { LoadingCar } from "@/components/LoadingCar";
import { LowPolyCar } from "@/components/LowPolyCar";

class ModelErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function PerformanceTuner() {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    gl.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.35 : 1.9));
  }, [gl]);
  return null;
}

function CarModel({ url, color, lightsOn }: { url: string; color: string; lightsOn: boolean }) {
  const gltf = useGLTF(url);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  useEffect(() => {
    scene.traverse((object) => {
      if ("isMesh" in object && object.isMesh && "material" in object) {
        const mesh = object as THREE.Mesh;
        if (Array.isArray(mesh.material)) return;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene, color]);

  return (
    <group scale={1.5}>
      <primitive object={scene} />
      {lightsOn && <pointLight position={[2.4, 0.6, 0]} color="#FFE77A" intensity={1.5} distance={4} />}
    </group>
  );
}

export function CarViewer({ car }: { car: Car }) {
  const [selectedColor, setSelectedColor] = useState(car.colors[0]?.value ?? "#CBD5E1");
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightsOn, setLightsOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const shouldLoadModel = !car.modelUrl.endsWith("car-placeholder.glb");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, [car.id]);

  return (
    <div className="glass relative overflow-hidden rounded-[2rem]">
      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
        <button
          onClick={() => setAutoRotate((value) => !value)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
            autoRotate ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-slate-200 hover:bg-white/15"
          }`}
        >
          <Zap size={16} />
          自动旋转
        </button>
        <button
          onClick={() => setLightsOn((value) => !value)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
            lightsOn ? "bg-violet-300 text-slate-950" : "bg-white/10 text-slate-200 hover:bg-white/15"
          }`}
        >
          <Sun size={16} />
          灯光
        </button>
        <button onClick={() => controlsRef.current?.reset()} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/15">
          <RotateCcw size={16} />
          重置视角
        </button>
      </div>
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2 rounded-full border border-white/10 bg-slate-950/70 p-2 backdrop-blur-xl">
        {car.colors.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelectedColor(item.value)}
            className={`h-9 w-9 rounded-full border-2 transition ${selectedColor === item.value ? "border-white scale-110" : "border-white/20"}`}
            style={{ backgroundColor: item.value }}
            title={item.name}
            aria-label={item.name}
          />
        ))}
      </div>
      <div className="h-[460px] md:h-[620px]">
        <Canvas shadows camera={{ position: [5.2, 3.2, 5.6], fov: 42 }}>
          <PerformanceTuner />
          <color attach="background" args={["#070B16"]} />
          <PerspectiveCamera makeDefault position={[5.2, 3.2, 5.6]} fov={42} />
          <ambientLight intensity={0.72} />
          <hemisphereLight args={["#BCEBFF", "#0B1022", 0.55]} />
          <directionalLight position={[3, 5, 4]} intensity={2.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <spotLight position={[-4, 4, -2]} intensity={1.2} angle={0.55} penumbra={0.8} color="#8B5CF6" />
          <Suspense fallback={<LowPolyCar color={selectedColor} lightsOn={lightsOn} category={car.category} specs={car.specs} />}>
            {shouldLoadModel ? (
              <ModelErrorBoundary fallback={<LowPolyCar color={selectedColor} lightsOn={lightsOn} category={car.category} specs={car.specs} />}>
                <CarModel url={car.modelUrl} color={selectedColor} lightsOn={lightsOn} />
              </ModelErrorBoundary>
            ) : (
              <LowPolyCar color={selectedColor} lightsOn={lightsOn} category={car.category} specs={car.specs} />
            )}
          </Suspense>
          <ContactShadows position={[0, -0.43, 0]} opacity={0.55} scale={8} blur={2.6} far={4} />
          {/* Avoid external HDR fetch (can be blocked in some networks). */}
          <Sky distance={450000} sunPosition={[1, 0.25, 0.5]} inclination={0.2} azimuth={0.25} />
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
            autoRotate={autoRotate}
            autoRotateSpeed={1.2}
            minDistance={3.5}
            maxDistance={9}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>
      </div>
      {loading && <LoadingCar />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent" />
    </div>
  );
}
