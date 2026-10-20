import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  reducedMotion: boolean;
}

/** Shared pointer + scroll state, read inside the render loop without re-rendering React. */
const input = { x: 0, y: 0, scroll: 0, hero: 0 };
const scaleTarget = new THREE.Vector3();
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    input.x = (e.clientX / window.innerWidth) * 2 - 1;
    input.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  window.addEventListener(
    'scroll',
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      input.scroll = max > 0 ? window.scrollY / max : 0;
      input.hero = Math.min(window.scrollY / window.innerHeight, 1);
    },
    { passive: true },
  );
}

function CameraRig() {
  useFrame(({ camera }, delta) => {
    const k = 1 - Math.pow(0.001, delta);
    camera.position.x += (input.x * 0.8 - camera.position.x) * k;
    camera.position.y += (input.y * 0.5 - input.scroll * 6 - camera.position.y) * k;
    camera.lookAt(0, -input.scroll * 6, 0);
  });
  return null;
}

/** Glowing liquid core that reacts to the pointer. */
function Core() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // after the hero, drift out to the right edge and follow the camera down
      const g = group.current.position;
      g.x += (2.6 + input.hero * 3.4 - g.x) * 0.06;
      g.y += (0.3 - input.scroll * 6 + input.hero * 1.2 - g.y) * 0.06;
    }
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.12;
      mesh.current.rotation.y += delta * 0.18;
      const target = 1 + Math.abs(input.x) * 0.15;
      mesh.current.scale.lerp(scaleTarget.setScalar(target), 0.05);
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.1;
      wire.current.rotation.z = t * 0.05;
    }
  });
  return (
    <group ref={group} position={[2.6, 0.3, -1.5]}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 24]} />
        <MeshDistortMaterial
          color="#10b981"
          emissive="#064e3b"
          emissiveIntensity={0.35}
          roughness={0.08}
          metalness={0.9}
          clearcoat={1}
          distort={0.42}
          speed={1.6}
        />
      </mesh>
      <mesh ref={wire} scale={2.15}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

const SHAPES = [
  { pos: [-8.6, 2.4, -5], color: '#22d3ee', kind: 'torus' },
  { pos: [-8.2, -3.2, -4.5], color: '#f5e6c8', kind: 'octa' },
  { pos: [8.8, -4.6, -5.5], color: '#34d399', kind: 'knot' },
  { pos: [-8.8, -7.4, -5], color: '#34d399', kind: 'ico' },
  { pos: [8.4, -9.6, -4.5], color: '#22d3ee', kind: 'octa' },
  { pos: [-8.4, -12, -5.5], color: '#f5e6c8', kind: 'torus' },
  { pos: [8.6, -14, -5], color: '#34d399', kind: 'knot' },
] as const;

function FloatingShapes() {
  return (
    <>
      {SHAPES.map((s, i) => (
        <Float key={i} speed={1.2 + i * 0.15} rotationIntensity={1.4} floatIntensity={1.6}>
          <mesh position={[...s.pos]}>
            {s.kind === 'torus' && <torusGeometry args={[0.55, 0.18, 24, 64]} />}
            {s.kind === 'octa' && <octahedronGeometry args={[0.6]} />}
            {s.kind === 'knot' && <torusKnotGeometry args={[0.45, 0.14, 128, 16]} />}
            {s.kind === 'ico' && <icosahedronGeometry args={[0.6]} />}
            <meshStandardMaterial
              color={s.color}
              metalness={0.6}
              roughness={0.25}
              emissive={s.color}
              emissiveIntensity={0.15}
              wireframe={i % 3 === 1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** A slowly turning galaxy of points — gives depth when the camera parallaxes. */
function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 2200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 12;
      const branch = (i % 3) * ((Math.PI * 2) / 3);
      const spin = r * 0.35;
      const jitter = () => (Math.random() - 0.5) * 1.6;
      arr[i * 3] = Math.cos(branch + spin) * r + jitter();
      arr[i * 3 + 1] = jitter() * 0.6 - 6;
      arr[i * 3 + 2] = Math.sin(branch + spin) * r + jitter() - 8;
    }
    return arr;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });
  return (
    <points ref={ref} rotation={[0.5, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#9ff5d6" transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

export default function Scene3D({ reducedMotion }: SceneProps) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <fog attach="fog" args={['#05070d', 9, 26]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[5, 4, 4]} intensity={40} color="#34d399" />
        <pointLight position={[-6, -2, 2]} intensity={30} color="#22d3ee" />
        <pointLight position={[0, -10, 3]} intensity={25} color="#f5e6c8" />
        <Stars radius={60} depth={40} count={2500} factor={3} saturation={0} fade speed={reducedMotion ? 0 : 0.6} />
        <Sparkles count={60} scale={[14, 20, 6]} position={[0, -5, -2]} size={2.2} speed={0.3} color="#a7f3d0" />
        <Core />
        <FloatingShapes />
        <Galaxy />
        {!reducedMotion && <CameraRig />}
      </Canvas>
    </div>
  );
}
