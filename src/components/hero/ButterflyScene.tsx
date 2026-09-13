"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneProps } from "@/components/hero/types";

const MARK_SRC = "/dent-art-mark.png";

const CAMERA_Z = 3.35;
const CAMERA_FOV = 32;
// Half of the world-space height visible at z=0; the disc plus its drift must stay inside it.
const VIEW_HALF = CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));
const DISC_RADIUS = VIEW_HALF * 0.75;

// The 272px PNG is an opaque square: white badge (centre ≈ 141.5,137, r ≈ 132) on charcoal.
// Sample only the badge so the disc has no dark crescent at its rim.
const BADGE_CENTER_U = 141.5 / 272;
const BADGE_CENTER_V = 1 - 137 / 272;
const BADGE_ZOOM = 1.06;

function prepareMarkTexture(texture: THREE.Texture) {
  const span = 1 / BADGE_ZOOM;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(span, span);
  texture.offset.set(BADGE_CENTER_U - span / 2, BADGE_CENTER_V - span / 2);
  texture.needsUpdate = true;
}

useTexture.preload(MARK_SRC);

function MarkButterfly({ pointerRef, scrollRef }: Omit<HeroSceneProps, "visible" | "awake">) {
  const group = useRef<THREE.Group>(null);
  // R3F resets its clock whenever frameloop flips never -> always, so keep our own phase
  // to avoid a visible snap each time the pointer wakes the scene.
  const elapsed = useRef(0);
  const texture = useTexture(MARK_SRC, prepareMarkTexture);

  useFrame((_, delta) => {
    elapsed.current += Math.min(delta, 0.1);
    const t = elapsed.current;
    const flap = Math.sin(t * 2.6) * 0.16;
    const pointer = pointerRef.current;
    const scroll = scrollRef.current;
    if (!group.current) {
      return;
    }

    const floatX = Math.sin(t * 0.75) * 0.06;
    const floatY = Math.sin(t * 1.15) * 0.06;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      floatX + pointer.x * 0.12,
      0.08,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      floatY - pointer.y * 0.08 - scroll * 0.06,
      0.08,
    );
    group.current.position.z = Math.cos(t * 0.55) * 0.06;
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
    <group ref={group}>
      <mesh>
        <circleGeometry args={[DISC_RADIUS, 64]} />
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
        camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
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
