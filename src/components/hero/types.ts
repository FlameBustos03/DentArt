import type { MutableRefObject } from "react";

export interface PointerNorm {
  x: number;
  y: number;
}

export interface HeroSceneProps {
  pointerRef: MutableRefObject<PointerNorm>;
  scrollRef: MutableRefObject<number>;
  visible: boolean;
  awake: boolean;
}
