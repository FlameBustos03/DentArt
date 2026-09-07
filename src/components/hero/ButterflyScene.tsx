"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneProps } from "@/components/hero/types";

const LIME = "#2ECC71";
const LIME_DEEP = "#27AE60";
const INK = "#111111";

function createUpperWing(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.18, 0.22, 0.62, 0.72, 1.12, 0.46);
  shape.bezierCurveTo(1.22, 0.2, 0.78, 0.06, 0.4, -0.02);
  shape.lineTo(0, 0);
  return shape;
}

function createLowerWing(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.02);
  shape.bezierCurveTo(0.28, -0.14, 0.74, -0.2, 0.86, -0.52);
  shape.bezierCurveTo(0.52, -0.68, 0.16, -0.4, 0, -0.06);
  return shape;
}

function WingMesh({
  shape,
  side,
}: {
  shape: THREE.Shape;
  side: 1 | -1;
}) {
  return (
    <mesh scale={[side, 1, 1]} position={[side * 0.04, 0.02, 0]}>
      <shapeGeometry args={[shape, 8]} />
      <meshStandardMaterial
        color={LIME}
        emissive={LIME_DEEP}
        emissiveIntensity={0.42}
        roughness={0.28}
        metalness={0.18}
        transparent
        opacity={0.92}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function LimeButterfly({ pointerRef, scrollRef }: Omit<HeroSceneProps, "visible">) {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const upper = useMemo(() => createUpperWing(), []);
  const lower = useMemo(() => createLowerWing(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flap = Math.sin(t * 7.2) * 0.62;
    if (left.current) {
      left.current.rotation.y = -0.28 + flap;
    }
    if (right.current) {
      right.current.rotation.y = 0.28 - flap;
    }

    const pointer = pointerRef.current;
    const scroll = scrollRef.current;
    if (!group.current) {
      return;
    }

    const floatX = Math.sin(t * 0.75) * 0.14;
    const floatY = Math.sin(t * 1.15) * 0.18;
    const floatZ = Math.cos(t * 0.55) * 0.1;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      0.08 + floatX + pointer.x * 0.35,
      0.07,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      0.12 + floatY - pointer.y * 0.22 - scroll * 0.35,
      0.07,
    );
    group.current.position.z = floatZ;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.55, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.28 + scroll * 0.2,
      0.06,
    );
    group.current.rotation.z = Math.sin(t * 0.85) * 0.08;
  });

  return (
    <group ref={group} scale={1.15}>
      <pointLight color={LIME} intensity={1.15} distance={4.5} position={[0, 0.1, 0.6]} />
      <mesh>
        <capsuleGeometry args={[0.045, 0.46, 4, 8]} />
        <meshStandardMaterial color={INK} roughness={0.38} metalness={0.22} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0.03, 0.4, 0]} rotation={[0.35, 0.2, 0.15]}>
        <cylinderGeometry args={[0.006, 0.006, 0.22, 5]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <mesh position={[-0.03, 0.4, 0]} rotation={[0.35, -0.2, -0.15]}>
        <cylinderGeometry args={[0.006, 0.006, 0.22, 5]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <group ref={left}>
        <WingMesh shape={upper} side={-1} />
        <WingMesh shape={lower} side={-1} />
      </group>
      <group ref={right}>
        <WingMesh shape={upper} side={1} />
        <WingMesh shape={lower} side={1} />
      </group>
    </group>
  );
}

export function ButterflyScene({ pointerRef, scrollRef, visible }: HeroSceneProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 4.4], fov: 38 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <AdaptiveDpr pixelated={false} />
        <ambientLight intensity={0.68} />
        <pointLight position={[2.2, 1.6, 2.8]} intensity={0.85} color="#ffffff" />
        <pointLight position={[-1.8, -0.6, 1.8]} intensity={0.45} color={LIME} />
        <LimeButterfly pointerRef={pointerRef} scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
