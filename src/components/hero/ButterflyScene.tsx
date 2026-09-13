"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneProps } from "@/components/hero/types";

const MARK_SRC = "/dent-art-mark.png";

function MarkButterfly({ pointerRef, scrollRef }: Omit<HeroSceneProps, "visible" | "awake">) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture(MARK_SRC, (loaded) => {
    loaded.colorSpace = THREE.SRGBColorSpace;
    loaded.anisotropy = 8;
    loaded.needsUpdate = true;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flap = Math.sin(t * 2.6) * 0.16;
    const pointer = pointerRef.current;
    const scroll = scrollRef.current;
    if (!group.current) {
      return;
    }

    const floatX = Math.sin(t * 0.75) * 0.12;
    const floatY = Math.sin(t * 1.15) * 0.14;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      floatX + pointer.x * 0.28,
      0.08,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      floatY - pointer.y * 0.18 - scroll * 0.22,
      0.08,
    );
    group.current.position.z = Math.cos(t * 0.55) * 0.08;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      0.16 + flap + pointer.x * 0.2,
      0.07,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      0.06 + pointer.y * 0.14 + scroll * 0.1,
      0.07,
    );
    group.current.rotation.z = Math.sin(t * 0.85) * 0.05;
  });

  return (
    <group ref={group} scale={1.58}>
      <mesh>
        <circleGeometry args={[1.05, 64]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function ButterflyScene({ pointerRef, scrollRef, visible, awake }: HeroSceneProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible && awake ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 3.35], fov: 32 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <AdaptiveDpr pixelated={false} />
        <Suspense fallback={null}>
          <MarkButterfly pointerRef={pointerRef} scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
