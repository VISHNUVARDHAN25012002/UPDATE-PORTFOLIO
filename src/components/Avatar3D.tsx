import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, PresentationControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Optimised from src/assets/human figure 3d model.glb (65 MB → ~0.9 MB) with:
// npx @gltf-transform/cli optimize <src> public/models/human.glb --compress meshopt
//   --texture-compress webp --texture-size 1024 --simplify-ratio 0.06 --simplify-error 0.002
const MODEL_URL = `${import.meta.env.BASE_URL}models/human.glb`;
/** Source model is a 0.978-unit-tall half-body bust with its origin at the waist. */
const SCALE = 1.6 / 0.978;
const HEIGHT = 1.6;

interface AvatarProps {
  reducedMotion: boolean;
  onReady?: () => void;
}

function Figure({ reducedMotion, onReady }: AvatarProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL, true, true);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame(({ clock, pointer }, delta) => {
    const g = group.current;
    if (!g || reducedMotion) return;
    const t = clock.elapsedTime;
    const k = 1 - Math.pow(0.02, delta);
    // look toward the pointer with a slow idle sway, plus a gentle breathing float
    g.rotation.y += (pointer.x * 0.5 + Math.sin(t * 0.4) * 0.18 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.06 - g.rotation.x) * k;
    g.position.y = Math.sin(t * 1.1) * 0.025;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={SCALE} position={[0, -HEIGHT / 2, 0]} />
    </group>
  );
}

/** Interactive 3D avatar for the hero — drag to spin, follows the pointer otherwise. */
export default function Avatar3D({ reducedMotion, onReady }: AvatarProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.05, 3.4], fov: 30 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <hemisphereLight args={['#e6fff6', '#05070d', 0.6]} />
      <directionalLight position={[1.5, 2.5, 3]} intensity={2.2} />
      <pointLight position={[-1.8, 0.6, -1.2]} intensity={6} color="#22d3ee" />
      <pointLight position={[1.8, 0.2, -1]} intensity={5} color="#34d399" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 2, 3]} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#34d399" position={[-3, 0, 1]} scale={[1, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#22d3ee" position={[3, 0, 1]} scale={[1, 4, 1]} />
      </Environment>
      <PresentationControls
        global={false}
        cursor
        snap
        speed={1.4}
        polar={[-0.1, 0.1]}
        azimuth={[-Math.PI, Math.PI]}
        enabled={!reducedMotion}
      >
        <Figure reducedMotion={reducedMotion} onReady={onReady} />
      </PresentationControls>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL, true, true);
