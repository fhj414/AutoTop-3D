"use client";

import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";

type GroupProps = ThreeElements["group"];

export function LowPolyCar({ color, lightsOn, ...props }: GroupProps & { color: string; lightsOn: boolean }) {
  const dark = useMemo(() => (color.toLowerCase() === "#10131b" ? "#1f2937" : color), [color]);

  return (
    <group {...props}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.6, 0.78, 1.9]} />
        <meshStandardMaterial color={dark} roughness={0.35} metalness={0.5} />
      </mesh>
      <mesh position={[-0.25, 1.05, 0]} castShadow>
        <boxGeometry args={[2.25, 0.78, 1.55]} />
        <meshStandardMaterial color={dark} roughness={0.32} metalness={0.45} />
      </mesh>
      <mesh position={[-0.42, 1.12, 0.81]}>
        <boxGeometry args={[1.25, 0.42, 0.05]} />
        <meshStandardMaterial color="#9BE7FF" transparent opacity={0.62} roughness={0.1} />
      </mesh>
      <mesh position={[-0.42, 1.12, -0.81]}>
        <boxGeometry args={[1.25, 0.42, 0.05]} />
        <meshStandardMaterial color="#9BE7FF" transparent opacity={0.62} roughness={0.1} />
      </mesh>
      <mesh position={[1.8, 0.55, 0.58]}>
        <boxGeometry args={[0.12, 0.24, 0.46]} />
        <meshStandardMaterial color={lightsOn ? "#FFF2A8" : "#D6C68A"} emissive={lightsOn ? "#FFE77A" : "#000000"} emissiveIntensity={lightsOn ? 2.2 : 0} />
      </mesh>
      <mesh position={[1.8, 0.55, -0.58]}>
        <boxGeometry args={[0.12, 0.24, 0.46]} />
        <meshStandardMaterial color={lightsOn ? "#FFF2A8" : "#D6C68A"} emissive={lightsOn ? "#FFE77A" : "#000000"} emissiveIntensity={lightsOn ? 2.2 : 0} />
      </mesh>
      <mesh position={[-2.18, 0.55, 0.58]}>
        <boxGeometry args={[0.12, 0.25, 0.5]} />
        <meshStandardMaterial color="#FF6678" emissive={lightsOn ? "#EF4444" : "#000000"} emissiveIntensity={lightsOn ? 1.6 : 0} />
      </mesh>
      <mesh position={[-2.18, 0.55, -0.58]}>
        <boxGeometry args={[0.12, 0.25, 0.5]} />
        <meshStandardMaterial color="#FF6678" emissive={lightsOn ? "#EF4444" : "#000000"} emissiveIntensity={lightsOn ? 1.6 : 0} />
      </mesh>
      {[
        [-1.45, 0.05, 1],
        [1.35, 0.05, 1],
        [-1.45, 0.05, -1],
        [1.35, 0.05, -1]
      ].map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 32]} />
            <meshStandardMaterial color="#05070D" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.22, 0.22, 0.03, 24]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.7} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {lightsOn && (
        <>
          <pointLight position={[2.45, 0.6, 0.72]} color="#FFE77A" intensity={1.8} distance={4} />
          <pointLight position={[2.45, 0.6, -0.72]} color="#FFE77A" intensity={1.8} distance={4} />
        </>
      )}
    </group>
  );
}
