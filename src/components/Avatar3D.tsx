import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Optimised from src/assets/human figure 3d model.glb (65 MB → ~0.5 MB, ~49k triangles) with:
// npx @gltf-transform/cli optimize <src> public/models/human.glb --compress meshopt
//   --texture-compress webp --texture-size 1024 --simplify-ratio 0.025 --simplify-error 0.004
const MODEL_URL = `${import.meta.env.BASE_URL}models/human.glb`;
/** Source model is 0.978 units tall (head to hips) with its origin at the bottom. */
const SCALE = 1.6 / 0.978;
const HEIGHT = 1.6;
const TAU = Math.PI * 2;

interface AvatarProps {
  reducedMotion: boolean;
  onReady?: () => void;
}

/**
 * Rotation state shared between DOM pointer handlers and the render loop, so pointer
 * moves never re-render React. Everything is eased frame-rate independently in useFrame.
 */
const motion = {
  lookX: 0, // window-wide pointer, -1..1 (desktop only)
  lookY: 0,
  spin: 0, // extra yaw from dragging, radians
  velocity: 0, // radians / second, for inertia after release
  dragging: false,
  lastX: 0,
  lastT: 0,
};

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      motion.lookX = (e.clientX / window.innerWidth) * 2 - 1;
      motion.lookY = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true },
  );
}

/** Exponential damping that behaves the same at 30, 60 or 120 fps. */
const damp = (current: number, target: number, lambda: number, dt: number) =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

function Figure({ reducedMotion, onReady }: AvatarProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL, true, true);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame(({ clock }, rawDelta) => {
    const g = group.current;
    if (!g || reducedMotion) return;
    // clamp so a dropped frame / tab switch doesn't cause a visible jump
    const dt = Math.min(rawDelta, 1 / 30);
    const t = clock.elapsedTime;

    if (!motion.dragging) {
      // inertia, then settle back to the nearest front-facing angle
      motion.velocity *= Math.exp(-3.5 * dt);
      motion.spin += motion.velocity * dt;
      if (Math.abs(motion.velocity) < 0.6) {
        motion.spin = damp(motion.spin, Math.round(motion.spin / TAU) * TAU, 2.2, dt);
      }
    }

    const yaw = motion.spin + motion.lookX * 0.45 + Math.sin(t * 0.35) * 0.15;
    g.rotation.y = damp(g.rotation.y, yaw, motion.dragging ? 18 : 5, dt);
    g.rotation.x = damp(g.rotation.x, -motion.lookY * 0.05, 4, dt);
    g.position.y = Math.sin(t * 0.9) * 0.02;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={SCALE} position={[0, -HEIGHT / 2, 0]} />
    </group>
  );
}

/** Interactive 3D avatar for the hero — drag to spin, follows the mouse otherwise. */
export default function Avatar3D({ reducedMotion, onReady }: AvatarProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // stop rendering once the hero is scrolled away — frees the GPU for the background scene
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    motion.dragging = true;
    motion.velocity = 0;
    motion.lastX = e.clientX;
    motion.lastT = performance.now();
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!motion.dragging) return;
    const now = performance.now();
    const dx = ((e.clientX - motion.lastX) / e.currentTarget.clientWidth) * Math.PI * 1.6;
    const dt = Math.max((now - motion.lastT) / 1000, 1 / 240);
    motion.spin += dx;
    motion.velocity = THREE.MathUtils.lerp(motion.velocity, dx / dt, 0.5);
    motion.lastX = e.clientX;
    motion.lastT = now;
  };
  const onPointerUp = () => {
    motion.dragging = false;
    // a pause before release means no fling
    if (performance.now() - motion.lastT > 80) motion.velocity = 0;
  };

  return (
    <div
      ref={wrap}
      className="avatar-stage"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Canvas
        camera={{ position: [0, 0.05, 3.4], fov: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : visible ? 'always' : 'never'}
      >
        <hemisphereLight args={['#e6fff6', '#05070d', 0.6]} />
        <directionalLight position={[1.5, 2.5, 3]} intensity={2.2} />
        <pointLight position={[-1.8, 0.6, -1.2]} intensity={6} color="#22d3ee" />
        <pointLight position={[1.8, 0.2, -1]} intensity={5} color="#34d399" />
        <Environment resolution={64}>
          <Lightformer form="rect" intensity={2} position={[0, 2, 3]} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={1.5} color="#34d399" position={[-3, 0, 1]} scale={[1, 4, 1]} />
          <Lightformer form="rect" intensity={1.5} color="#22d3ee" position={[3, 0, 1]} scale={[1, 4, 1]} />
        </Environment>
        <Figure reducedMotion={reducedMotion} onReady={onReady} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL, true, true);
