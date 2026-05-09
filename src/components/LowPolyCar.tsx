"use client";

import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import type { CarCategory, CarSpecs } from "@/types/car";

type GroupProps = ThreeElements["group"];

type LowPolyCarProps = GroupProps & {
  color: string;
  lightsOn: boolean;
  category?: CarCategory;
  specs?: CarSpecs;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toBaseScale(specs?: CarSpecs) {
  if (!specs) return { x: 1, y: 1, z: 1 };

  // Normalize around a typical C-segment sedan.
  const x = clamp(specs.length / 4750, 0.82, 1.22);
  const z = clamp(specs.width / 1850, 0.82, 1.22);
  const y = clamp(specs.height / 1550, 0.78, 1.28);
  return { x, y, z };
}

export function LowPolyCar({ color, lightsOn, category = "Sedan", specs, ...props }: LowPolyCarProps) {
  const dark = useMemo(() => (color.toLowerCase() === "#10131b" ? "#1f2937" : color), [color]);
  const baseScale = useMemo(() => toBaseScale(specs), [specs]);

  const shape = useMemo(() => {
    if (category === "SUV") {
      return {
        body: { size: [4.7, 0.92, 2.05] as const, pos: [0, 0.52, 0] as const },
        cabin: { size: [2.45, 0.95, 1.72] as const, pos: [-0.22, 1.22, 0] as const },
        wheel: { radius: 0.46, width: 0.32, z: 1.05 }
      };
    }

    if (category === "MPV") {
      return {
        body: { size: [4.9, 1.02, 2.06] as const, pos: [0, 0.54, 0] as const },
        cabin: { size: [3.05, 1.05, 1.86] as const, pos: [-0.2, 1.32, 0] as const },
        wheel: { radius: 0.44, width: 0.32, z: 1.06 }
      };
    }

    // Sedan
    return {
      body: { size: [4.8, 0.78, 1.95] as const, pos: [0, 0.45, 0] as const },
      cabin: { size: [2.35, 0.74, 1.58] as const, pos: [-0.28, 1.03, 0] as const },
      wheel: { radius: 0.42, width: 0.28, z: 1.0 }
    };
  }, [category]);

  return (
    <group {...props} scale={[baseScale.x, baseScale.y, baseScale.z]}>
      <mesh position={shape.body.pos} castShadow receiveShadow>
        <boxGeometry args={shape.body.size} />
        <meshStandardMaterial color={dark} roughness={0.35} metalness={0.5} />
      </mesh>
      <mesh position={shape.cabin.pos} castShadow>
        <boxGeometry args={shape.cabin.size} />
        <meshStandardMaterial color={dark} roughness={0.32} metalness={0.45} />
      </mesh>
      <mesh position={[-0.42, category === "SUV" ? 1.32 : category === "MPV" ? 1.42 : 1.1, 0.82]}>
        <boxGeometry args={[category === "MPV" ? 1.65 : 1.25, category === "MPV" ? 0.5 : 0.42, 0.05]} />
        <meshStandardMaterial color="#9BE7FF" transparent opacity={0.62} roughness={0.1} />
      </mesh>
      <mesh position={[-0.42, category === "SUV" ? 1.32 : category === "MPV" ? 1.42 : 1.1, -0.82]}>
        <boxGeometry args={[category === "MPV" ? 1.65 : 1.25, category === "MPV" ? 0.5 : 0.42, 0.05]} />
        <meshStandardMaterial color="#9BE7FF" transparent opacity={0.62} roughness={0.1} />
      </mesh>
      <mesh position={[1.85, category === "SUV" ? 0.64 : category === "MPV" ? 0.7 : 0.55, 0.62]}>
        <boxGeometry args={[0.12, 0.24, 0.46]} />
        <meshStandardMaterial color={lightsOn ? "#FFF2A8" : "#D6C68A"} emissive={lightsOn ? "#FFE77A" : "#000000"} emissiveIntensity={lightsOn ? 2.2 : 0} />
      </mesh>
      <mesh position={[1.85, category === "SUV" ? 0.64 : category === "MPV" ? 0.7 : 0.55, -0.62]}>
        <boxGeometry args={[0.12, 0.24, 0.46]} />
        <meshStandardMaterial color={lightsOn ? "#FFF2A8" : "#D6C68A"} emissive={lightsOn ? "#FFE77A" : "#000000"} emissiveIntensity={lightsOn ? 2.2 : 0} />
      </mesh>
      <mesh position={[-2.25, category === "SUV" ? 0.64 : category === "MPV" ? 0.7 : 0.55, 0.62]}>
        <boxGeometry args={[0.12, 0.25, 0.5]} />
        <meshStandardMaterial color="#FF6678" emissive={lightsOn ? "#EF4444" : "#000000"} emissiveIntensity={lightsOn ? 1.6 : 0} />
      </mesh>
      <mesh position={[-2.25, category === "SUV" ? 0.64 : category === "MPV" ? 0.7 : 0.55, -0.62]}>
        <boxGeometry args={[0.12, 0.25, 0.5]} />
        <meshStandardMaterial color="#FF6678" emissive={lightsOn ? "#EF4444" : "#000000"} emissiveIntensity={lightsOn ? 1.6 : 0} />
      </mesh>
      {[
        [-1.55, 0.05, shape.wheel.z],
        [1.45, 0.05, shape.wheel.z],
        [-1.55, 0.05, -shape.wheel.z],
        [1.45, 0.05, -shape.wheel.z]
      ].map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[shape.wheel.radius, shape.wheel.radius, shape.wheel.width, 32]} />
            <meshStandardMaterial color="#05070D" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, shape.wheel.width / 2.2]}>
            <cylinderGeometry args={[shape.wheel.radius * 0.52, shape.wheel.radius * 0.52, 0.03, 24]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.7} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {lightsOn && (
        <>
          <pointLight position={[2.55, category === "SUV" ? 0.8 : 0.62, 0.72]} color="#FFE77A" intensity={1.8} distance={4} />
          <pointLight position={[2.55, category === "SUV" ? 0.8 : 0.62, -0.72]} color="#FFE77A" intensity={1.8} distance={4} />
        </>
      )}
    </group>
  );
}
