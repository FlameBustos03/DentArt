"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneProps } from "@/components/hero/types";

const LIME = "#2ECC71";
const LIME_DEEP = "#27AE60";
const LIME_EDGE = "#32CD32";
const INK = "#111111";

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.045,
  bevelEnabled: true,
  bevelThickness: 0.014,
  bevelSize: 0.012,
  bevelSegments: 1,
  curveSegments: 8,
};

function createUpperWing(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.16, 0.28, 0.58, 0.82, 1.18, 0.5);
  shape.bezierCurveTo(1.28, 0.22, 0.8, 0.08, 0.38, -0.02);
  shape.lineTo(0, 0);
  return shape;
}

function createLowerWing(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.02);
  shape.bezierCurveTo(0.3, -0.16, 0.78, -0.22, 0.92, -0.58);
  shape.bezierCurveTo(0.5, -0.74, 0.14, -0.42, 0, -0.08);
  return shape;
}

function WingMesh({
  shape,
  side,
  color,
}: {
  shape: THREE.Shape;
  side: 1 | -1;
  color: string;
}) {
  return (
    <mesh
      scale={[side, 1, 1]}
      position={[side * 0.05, 0.02, -0.02]}
      rotation={[side * 0.12, 0, side * 0.08]}
    >
      <extrudeGeometry args={[shape, EXTRUDE]} />
      <meshStandardMaterial
        color={color}
        emissive={LIME_DEEP}
        emissiveIntensity={0.55}
        roughness={0.22}
        metalness={0.28}
        transparent
        opacity={0.94}
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
    const flap = 0.55 + Math.sin(t * 6.4) * 0.7;
    if (left.current) {
      left.current.rotation.y = -flap;
    }
    if (right.current) {
      right.current.rotation.y = flap;
    }

    const pointer = pointerRef.current;
    const scroll = scrollRef.current;
    if (!group.current) {
      return;
    }

    const floatX = Math.sin(t * 0.75) * 0.16;
    const floatY = Math.sin(t * 1.15) * 0.2;
    const floatZ = Math.cos(t * 0.55) * 0.14;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      floatX + pointer.x * 0.42,
      0.08,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      floatY - pointer.y * 0.26 - scroll * 0.32,
      0.08,
    );
    group.current.position.z = floatZ;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      0.72 + pointer.x * 0.55,
      0.07,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      0.28 + pointer.y * 0.3 + scroll * 0.18,
      0.07,
    );
    group.current.rotation.z = Math.sin(t * 0.85) * 0.1;
  });

  return (
    <group ref={group} scale={1.42} rotation={[0.28, 0.72, 0.06]}>
      <pointLight color={LIME} intensity={1.6} distance={5} position={[0.2, 0.15, 0.8]} />
      <mesh>
        <capsuleGeometry args={[0.05, 0.5, 4, 8]} />
        <meshStandardMaterial color={INK} roughness={0.32} metalness={0.28} />
      </mesh>
      <mesh position={[0, 0.3, 0.02]}>
        <sphereGeometry args={[0.062, 10, 10]} />
        <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.035, 0.44, 0.02]} rotation={[0.4, 0.25, 0.18]}>
        <cylinderGeometry args={[0.006, 0.006, 0.24, 5]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <mesh position={[-0.035, 0.44, 0.02]} rotation={[0.4, -0.25, -0.18]}>
        <cylinderGeometry args={[0.006, 0.006, 0.24, 5]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <group ref={left}>
        <WingMesh shape={upper} side={-1} color={LIME} />
        <WingMesh shape={lower} side={-1} color={LIME_EDGE} />
      </group>
      <group ref={right}>
        <WingMesh shape={upper} side={1} color={LIME} />
        <WingMesh shape={lower} side={1} color={LIME_EDGE} />
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
        camera={{ position: [1.55, 0.7, 3.7], fov: 34 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <AdaptiveDpr pixelated={false} />
        <ambientLight intensity={0.55} />
        <pointLight position={[2.4, 1.8, 2.6]} intensity={1.15} color="#ffffff" />
        <pointLight position={[-1.6, -0.4, 1.6]} intensity={0.7} color={LIME} />
        <LimeButterfly pointerRef={pointerRef} scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
